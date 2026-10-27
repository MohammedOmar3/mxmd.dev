import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../lib/api';
import type { BlogPostFull } from '../types';
import { markdownComponents } from '../lib/markdownComponents';

const JOURNAL = { pathname: '/', hash: '#journal' };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api.getBlogPost(slug)
      .then(setPost)
      .catch((err: Error) => {
        if (err.message.includes('404')) setNotFound(true);
        else console.error(err);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="frame flex-1 pt-14 sm:pt-20 pb-24">
        <div aria-busy="true" className="max-w-[46rem] space-y-4">
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-16 w-3/4" />
          <div className="skeleton h-4 w-48" />
          <div className="pt-12 space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-4" />)}
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="frame flex-1 pt-14 sm:pt-20 pb-24">
        <div className="max-w-[46rem]">
          <h1 className="text-3xl sm:text-4xl mb-6">Post not found</h1>
          <button type="button" onClick={() => navigate(JOURNAL)} className="btn btn-ghost">
            Back to the journal
          </button>
        </div>
      </main>
    );
  }

  const minutes = readingTime(post.content);

  return (
    <main className="frame flex-1 pt-14 sm:pt-20 pb-24">
      <article className="max-w-[46rem]">
        <p className="text-sm mb-10">
          <Link to={JOURNAL} className="link text-ink-2">Journal</Link>
        </p>


        <header className="mb-10">
          <h1 className="text-3xl sm:text-5xl mb-5">
            {post.title}
          </h1>

          <p className="font-mono text-xs text-muted flex flex-wrap gap-x-5 gap-y-1">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{minutes} min read</span>
            {post.tags.map((tag) => <span key={tag} className="text-neon-ink">#{tag}</span>)}
          </p>
        </header>

        <div className="border-t border-rule pt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </div>

        <p className="text-sm mt-16 pt-6 border-t border-rule">
          <Link to={JOURNAL} className="link text-ink">All posts</Link>
        </p>
      </article>
    </main>
  );
}
