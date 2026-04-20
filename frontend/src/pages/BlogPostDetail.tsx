import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { api } from '../lib/api';
import type { BlogPostFull } from '../types';
import { Footer } from '../components/Footer';
import { markdownComponents } from '../lib/markdownComponents';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
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
      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 w-32" />
          <div className="h-10 bg-gray-200 w-3/4" />
          <div className="h-4 bg-gray-200 w-48" />
          <div className="mt-12 space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-gray-100" />)}
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
        <p className="font-mono text-sm text-gray-400">Post not found.</p>
        <button onClick={() => navigate('/blog')} className="mt-4 font-mono text-xs text-[#39FF14] uppercase tracking-widest hover:underline">
          ← Back to blog
        </button>
      </main>
    );
  }

  const minutes = readingTime(post.content);

  return (
    <>
      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full pb-20">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-block font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest mb-10 transition-colors"
        >
          ← MY JOURNAL
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] border border-[#39FF14] text-[#2acc0f] px-1.5 py-0.5 uppercase tracking-wider"
              >
                [{tag}]
              </span>
            ))}
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl font-black text-black leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-gray-300">·</span>
            <span>{minutes} MIN READ</span>
          </div>
        </header>

        <div className="w-full h-px bg-gray-200 mb-10" />

        {/* Markdown content */}
        <article className="prose-mxmd">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            to="/blog"
            className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
          >
            ← ALL POSTS
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
