import sys, tempfile, unittest, json, base64, os
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'backend'))
import server as s

class LearningTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();s.DATA=Path(self.tmp.name);s.DB=s.DATA/'learning.db'
        os.environ['OWNER_PASSWORD']='owner-password-123';os.environ['OWNER_EMAIL']='owner@test.com';s.initialize()
        self.owner=self.login('owner@test.com','owner-password-123')
        for name,role in [('teacher','teacher'),('other','teacher'),('student','student')]:
            self.call('/api/users',{'name':name,'email':name+'@test.com','password':name+'-password-123','role':role})
        self.teacher=self.login('teacher@test.com','teacher-password-123');self.other=self.login('other@test.com','other-password-123');self.student=self.login('student@test.com','student-password-123')
        self.call('/api/assign',{'teacher_id':2,'topic_id':1})
    def tearDown(self):self.tmp.cleanup()
    def login(self,email,password):return s.api('POST','/api/login',{'email':email,'password':password},ip=email)['token']
    def call(self,path,data=None,token=None):return s.api('GET' if data is None else 'POST',path,data or {},token or self.owner)
    def denied(self,path,data,token,status=403):
        with self.assertRaises(s.Problem) as e:self.call(path,data,token)
        self.assertEqual(e.exception.status,status)
    def test_student_cannot_manage_accounts(self):self.denied('/api/users',{},self.student)
    def test_teacher_cannot_publish_or_assign(self):
        self.denied('/api/review',{'kind':'question','id':1,'status':'published'},self.teacher)
        self.denied('/api/assign',{'teacher_id':3,'topic_id':1},self.teacher)
    def test_teacher_topic_boundaries(self):
        self.denied('/api/teacher-solution',{'question_id':2,'body':'Answer'},self.teacher)
        r=self.call('/api/teacher-solution',{'question_id':1,'body':'x = 5','mode':'full'},self.teacher)
        sols=s.api('GET','/api/solutions',{'question_id':1,'cms':True},self.teacher)
        self.assertEqual(next(x for x in sols if x['id']==r['id'])['status'],'pending')
        public=s.api('GET','/api/solutions',{'question_id':1},self.student)
        self.assertNotIn(r['id'],[x['id'] for x in public])
    def test_solution_review_visible(self):
        r=self.call('/api/teacher-solution',{'question_id':1,'body':'Teacher explanation'},self.teacher)
        self.call('/api/review',{'kind':'solution','id':r['id'],'status':'reviewed'})
        self.assertIn(r['id'],[x['id'] for x in s.api('GET','/api/solutions',{'question_id':1},self.student)])
    def test_question_task_grants_single_question(self):
        self.call('/api/task',{'teacher_id':3,'question_id':2})
        self.call('/api/teacher-solution',{'question_id':2,'body':'Factorise'},self.other)
        self.denied('/api/teacher-solution',{'question_id':1,'body':'No'},self.other)
    def test_teacher_question_always_pending(self):
        r=self.call('/api/questions',{'topic_id':1,'body':'New question','options':[],'source':'Original','status':'published'},self.teacher)
        with s.database() as c:self.assertEqual(c.execute('SELECT status FROM questions WHERE id=?',(r['id'],)).fetchone()[0],'pending')
    def test_student_answers_hidden(self):
        catalog=self.call('/api/catalog',token=self.student)
        self.assertNotIn('answer_index',catalog['questions'][0])
        with self.assertRaises(s.Problem):s.api('GET','/api/catalog',{'cms':1},self.student)
    def test_usage_stats_are_scoped(self):
        owner_usage=self.call('/api/usage',token=self.owner)
        self.assertEqual(owner_usage['role'],'owner')
        self.assertEqual(owner_usage['summary']['students'],1)
        teacher_usage=self.call('/api/usage',token=self.teacher)
        self.assertEqual(teacher_usage['role'],'teacher')
        self.assertEqual(teacher_usage['summary']['assigned_topics'],1)
        self.denied('/api/usage',None,self.student)
    def test_version_invalidates_saved_answers(self):
        self.call('/api/questions',{'id':1,'topic_id':1,'body':'Solve 3x + 5 = 23','options':[],'source':'Original','status':'published'})
        self.assertEqual(s.api('GET','/api/solutions',{'question_id':1},self.student),[])
        with s.database() as c:self.assertEqual(c.execute('SELECT COUNT(*) FROM solutions WHERE question_id=1').fetchone()[0],1)
    def test_ai_cached_by_mode_and_version(self):
        with patch.object(s,'ai_solution',return_value='Use subtraction.') as provider:
            a=self.call('/api/solve',{'question_id':1,'mode':'hint'},self.student)
            b=self.call('/api/solve',{'question_id':1,'mode':'hint'},self.student)
            self.assertEqual(a['id'],b['id']);self.assertEqual(provider.call_count,1);self.assertEqual(a['status'],'ai')
    def test_reviewed_solution_avoids_ai_cost(self):
        with patch.object(s,'ai_solution') as provider:
            self.call('/api/solve',{'question_id':1,'mode':'full'},self.student);provider.assert_not_called()
    def test_video_url_validation(self):
        self.assertEqual(s.video_url('https://youtu.be/dQw4w9WgXcQ'),'https://www.youtube.com/embed/dQw4w9WgXcQ')
        for url in ['javascript:alert(1)','https://evil.com/watch?v=dQw4w9WgXcQ','https://youtube.com.evil.com/watch?v=dQw4w9WgXcQ']:
            with self.assertRaises(s.Problem):s.video_url(url)
    def test_post_scope_and_review(self):
        self.denied('/api/posts',{'topic_id':5,'title':'No','body':'No'},self.teacher)
        r=self.call('/api/posts',{'topic_id':1,'title':'Equations','body':'Subtract first','video':'https://youtu.be/dQw4w9WgXcQ','publish':True},self.teacher)
        self.assertFalse(self.call('/api/catalog',token=self.student)['posts'])
        self.call('/api/review',{'kind':'post','id':r['id'],'status':'published'})
        self.assertEqual(len(self.call('/api/catalog',token=self.student)['posts']),1)
    def test_attempt_and_progress(self):
        self.assertEqual(self.call('/api/attempt',{'question_id':1,'response':'1'},self.student)['correct'],1)
        self.assertEqual(self.call('/api/progress',token=self.student)[0]['correct'],1)
    def test_disable_revokes_session(self):
        self.call('/api/user-access',{'user_id':2,'active':False})
        self.denied('/api/catalog',None,self.teacher,401)
    def test_revoke_assignment(self):
        self.call('/api/assign',{'teacher_id':2,'topic_id':1,'remove':True})
        self.denied('/api/teacher-solution',{'question_id':1,'body':'No'},self.teacher)
    def test_upload_scope_and_format(self):
        raw=base64.b64encode(b'\x00\x00\x00\x18ftypisom0000').decode()
        self.denied('/api/upload',{'topic_id':5,'data':raw},self.teacher)
        r=self.call('/api/upload',{'topic_id':1,'data':raw},self.teacher)
        self.assertTrue((s.DATA/'media'/r['url'].split('/')[-1]).exists())

    def test_pdf_resource_requires_rights_reference_and_publishes_with_lesson(self):
        raw=base64.b64encode(b'%PDF-1.7\nrevision pack').decode()
        uploaded=self.call('/api/upload',{'topic_id':1,'kind':'pdf','data':raw},self.teacher)
        self.denied('/api/posts',{'topic_id':1,'title':'Pack','body':'Practice pack','pdf':uploaded['url']},self.teacher,400)
        post=self.call('/api/posts',{'topic_id':1,'title':'Pack','body':'Practice pack','pdf':uploaded['url'],'pdf_source':'Original pack; owned by McPerry','publish':True},self.teacher)
        self.call('/api/review',{'kind':'post','id':post['id'],'status':'published'})
        lesson=next(p for p in self.call('/api/catalog',token=self.student)['posts'] if p['id']==post['id'])
        self.assertEqual(lesson['pdf'],uploaded['url'])
        self.assertEqual(lesson['author_name'],'teacher')

    def test_wallet_is_owner_recorded_and_teacher_scoped(self):
        entry=self.call('/api/wallet-entry',{'teacher_id':2,'period':'2026-10','amount_minor':1250,'currency':'GHS','eligible_views':500,'participation_units':3,'share_percent':25,'source':'YouTube Studio October statement','description':'Linear equations lesson allocation'})
        wallet=self.call('/api/wallet',token=self.teacher)
        self.assertEqual(wallet['entries'][0]['id'],entry['id'])
        self.assertEqual(wallet['entries'][0]['amount_minor'],1250)
        self.denied('/api/wallet',None,self.student)
        self.denied('/api/wallet-entry',{'teacher_id':2,'period':'2026-10','amount_minor':1,'source':'x','description':'x'},self.teacher)
    def test_logout(self):
        self.call('/api/logout',{},self.student);self.denied('/api/catalog',None,self.student,401)
    def test_login_limit_survives_failure(self):
        for i in range(15):
            with self.assertRaises(s.Problem):s.api('POST','/api/login',{'email':'no@test.com','password':'wrong'},ip='bad-ip')
        with self.assertRaises(s.Problem) as e:s.api('POST','/api/login',{'email':'no@test.com','password':'wrong'},ip='bad-ip')
        self.assertEqual(e.exception.status,429)

if __name__=='__main__':unittest.main()

