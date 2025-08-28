export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  components: string[];
  instructions: { step: number; description: string; imageUrl?: string }[];
  comments: Comment[];
  upvotes: number;
  downvotes: number;
  aiHint: string;
};

export type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price: string;
  aiHint: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  applyUrl: string;
};

export type Tutorial = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  project: string; // Project ID
};

export type Book = {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tutorials: Tutorial[];
};

export type Collection = {
    id: string;
    title: string;
    description: string;
    books: Book[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  author: string;
  date: string;
  slug: string;
  category: string;
  aiHint: string;
};
