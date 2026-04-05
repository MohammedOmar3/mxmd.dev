export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: 'Stable' | 'Beta' | 'Archived';
  gitHubUrl?: string;
  liveDemoUrl?: string;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
}

export interface BlogPostFull extends BlogPost {
  content: string;
}

export interface BlogListResponse {
  total: number;
  page: number;
  pageSize: number;
  posts: BlogPost[];
}

export interface HealthStatus {
  status: string;
  version: string;
  uptimeMs: number;
  timestamp: string;
}
