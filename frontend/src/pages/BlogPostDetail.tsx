import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('cs', csharp);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('rs', rust);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('dockerfile', docker);
SyntaxHighlighter.registerLanguage('go', go);
import { api } from '../lib/api';
import type { BlogPostFull } from '../types';
import { Footer } from '../components/Footer';

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
          ← THE SOURCE CODE
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Code blocks
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className ?? '');
                const isInline = !match;
                if (isInline) {
                  return (
                    <code
                      className="font-mono text-sm bg-gray-100 text-[#2acc0f] px-1.5 py-0.5 rounded-sm border border-gray-200"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <div className="my-6 -mx-6 sm:mx-0 sm:rounded-sm overflow-hidden border border-gray-800">
                    <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                      <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                        {match[1]}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    </div>
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        background: '#0a0a0a',
                        padding: '1.25rem 1rem',
                        fontSize: '0.8rem',
                        lineHeight: '1.7',
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                );
              },
              // Headings
              h1: ({ children }) => (
                <h1 className="font-sans text-2xl font-black text-black mt-12 mb-4 leading-tight tracking-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-sans text-xl font-bold text-black mt-10 mb-3 leading-tight tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-sans text-base font-bold text-black mt-8 mb-2 uppercase tracking-wide">
                  {children}
                </h3>
              ),
              // Paragraphs
              p: ({ children }) => (
                <p className="font-sans text-sm text-gray-600 leading-7 mb-5">
                  {children}
                </p>
              ),
              // Blockquote
              blockquote: ({ children }) => (
                <blockquote className="my-6 pl-4 border-l-2 border-[#39FF14]">
                  <div className="font-sans text-sm text-gray-500 italic leading-7">
                    {children}
                  </div>
                </blockquote>
              ),
              // Lists
              ul: ({ children }) => (
                <ul className="my-4 space-y-2 pl-5 list-none">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 space-y-2 pl-5 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="font-sans text-sm text-gray-600 leading-7 flex gap-2">
                  <span className="text-[#39FF14] font-bold shrink-0 mt-0.5">›</span>
                  <span>{children}</span>
                </li>
              ),
              // Horizontal rule
              hr: () => <div className="my-10 h-px bg-gray-200" />,
              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline underline-offset-2 decoration-[#39FF14] decoration-2 hover:text-gray-600 transition-colors"
                >
                  {children}
                </a>
              ),
              // Strong / Em
              strong: ({ children }) => (
                <strong className="font-bold text-black">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-500">{children}</em>
              ),
              // Tables
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto border border-gray-200">
                  <table className="w-full text-sm font-mono">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="text-left px-4 py-2 bg-black text-[10px] text-gray-300 uppercase tracking-widest font-medium border-b border-gray-800">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-2 text-xs text-gray-600 border-b border-gray-100">
                  {children}
                </td>
              ),
            }}
          >
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
