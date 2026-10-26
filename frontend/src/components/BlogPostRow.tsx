import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogPostRowProps {
  post: BlogPost;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

/** One post as a row in the Journal list. */
export function BlogPostRow({ post }: BlogPostRowProps) {
  return (
    <li className="group">
      <Link
        to={`/blog/${post.slug}`}
        className="grid gap-x-8 gap-y-2 py-6 border-b border-rule no-underline sm:grid-cols-[8rem_minmax(0,1fr)] hover:bg-surface transition-colors px-2 -mx-2 rounded-md"
      >
        <time dateTime={post.publishedAt} className="font-mono text-xs text-muted pt-1">
          {formatDate(post.publishedAt)}
        </time>
        <span className="min-w-0">
          <span className="block text-lg font-semibold tracking-tight text-ink group-hover:underline decoration-neon decoration-2 underline-offset-4">
            {post.title}
          </span>
          <span className="block text-sm text-ink-2 mt-1 max-w-[65ch]">{post.excerpt}</span>
          {post.tags.length > 0 && (
            <span className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}
