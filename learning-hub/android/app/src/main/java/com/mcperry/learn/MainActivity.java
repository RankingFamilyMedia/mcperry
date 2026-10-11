package com.mcperry.learn;
import android.app.*;
import android.os.Bundle;
import android.content.*;
import android.content.res.Configuration;
import android.net.Uri;
import android.util.Rational;
import android.webkit.*;
import android.widget.*;
import android.view.*;

public class MainActivity extends Activity {
    private WebView web;
    private String origin;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        web=new WebView(this); setContentView(web);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(false);
        web.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        web.getSettings().setMediaPlaybackRequiresUserGesture(true);
        web.addJavascriptInterface(new PipBridge(), "AndroidPlayer");
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient(){
            @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r) {
                if(!r.isForMainFrame()) return false;
                Uri u=r.getUrl();
                if(origin!=null && sameOrigin(u,Uri.parse(origin))) return false;
                if("https".equals(u.getScheme())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW,u)); } catch(Exception e) { }
                }
                return true;
            }
        });
        origin=getPreferences(MODE_PRIVATE).getString("server",null);
        if(origin==null) configure(); else web.loadUrl(origin+"/");
        web.setOnLongClickListener(v->{new AlertDialog.Builder(this).setTitle("Learning Hub").setItems(new String[]{"Change server"},(d,n)->configure()).show();return true;});
    }
    private boolean sameOrigin(Uri a,Uri b) {
        return String.valueOf(a.getScheme()).equals(b.getScheme()) && String.valueOf(a.getHost()).equals(b.getHost()) && a.getPort()==b.getPort();
    }
    private void configure() {
        EditText input=new EditText(this); input.setSingleLine();input.setHint("https://learn.yourdomain.com");
        new AlertDialog.Builder(this).setTitle("Learning Hub server").setMessage("Enter the HTTPS address provided by your school or administrator.").setView(input).setPositiveButton("Connect",(d,n)->{
            String s=input.getText().toString().trim().replaceAll("/+$","");Uri u=Uri.parse(s);
            if(!"https".equals(u.getScheme()) || u.getHost()==null || u.getUserInfo()!=null || u.getQuery()!=null || u.getFragment()!=null || (u.getPath()!=null && !u.getPath().isEmpty())) {
                Toast.makeText(this,"Enter a valid HTTPS server origin",Toast.LENGTH_LONG).show();configure();return;
            }
            origin=s;getPreferences(MODE_PRIVATE).edit().putString("server",s).apply();web.loadUrl(s+"/");
        }).setNegativeButton("Cancel",(d,n)->{}).show();
    }
    class PipBridge {
        @JavascriptInterface public void enterPip() {
            runOnUiThread(()->{
                try { enterPictureInPictureMode(new PictureInPictureParams.Builder().setAspectRatio(new Rational(16,9)).build()); }
                catch(Exception e) { web.evaluateJavascript("window.exitPip && window.exitPip()",null); Toast.makeText(MainActivity.this,"Picture-in-picture unavailable",Toast.LENGTH_SHORT).show(); }
            });
        }
    }
    @Override public void onPictureInPictureModeChanged(boolean pip,Configuration config) {
        super.onPictureInPictureModeChanged(pip,config);
        if(!pip)web.evaluateJavascript("window.exitPip && window.exitPip()",null);
    }
    @Override public void onBackPressed() { if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
    @Override public void onDestroy() {web.destroy();super.onDestroy();}
}

