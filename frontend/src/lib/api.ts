import type { AdminBlogPostPayload, BlogListResponse, BlogPostFull, HealthStatus, Project } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

async function adminFetch<T>(method: string, path: string, apiKey: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getProjects: () => fetcher<Project[]>('/api/projects'),
  getBlogPosts: (page = 1, pageSize = 10) =>
    fetcher<BlogListResponse>(`/api/blog?page=${page}&pageSize=${pageSize}`),
  getBlogPost: (slug: string) => fetcher<BlogPostFull>(`/api/blog/${slug}`),
  getHealth: () => fetcher<HealthStatus>('/health'),

  adminCreatePost: (payload: AdminBlogPostPayload, apiKey: string) =>
    adminFetch<BlogPostFull>('POST', '/api/admin/blog', apiKey, payload),
  adminUpdatePost: (id: number, payload: AdminBlogPostPayload, apiKey: string) =>
    adminFetch<BlogPostFull>('PUT', `/api/admin/blog/${id}`, apiKey, payload),
  adminDeletePost: (id: number, apiKey: string) =>
    adminFetch<void>('DELETE', `/api/admin/blog/${id}`, apiKey),
};
