import type { BlogListResponse, BlogPostFull, HealthStatus, Project } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProjects: () => fetcher<Project[]>('/api/projects'),
  getBlogPosts: (page = 1, pageSize = 10) =>
    fetcher<BlogListResponse>(`/api/blog?page=${page}&pageSize=${pageSize}`),
  getBlogPost: (slug: string) => fetcher<BlogPostFull>(`/api/blog/${slug}`),
  getHealth: () => fetcher<HealthStatus>('/health'),
};
