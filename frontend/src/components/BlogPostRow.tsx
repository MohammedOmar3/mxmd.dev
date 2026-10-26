import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogPostRowProps {
  post: BlogPost;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** One post as a row in the Journal index. */
export function BlogPostRow({ post }: BlogPostRowProps) {
  return (
    <li className="grid gap-x-(--gap-columns) gap-y-2 py-6 border-b border-rule sm:grid-cols-[minmax(0,2fr)_minmax(0,10fr)] items-baseline">
      <p className="label text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </p>

      <div className="min-w-0">
        <h3 className="text-title sm:text-3xl leading-none mb-3">
          <Link to={`/blog/${post.slug}`} className="link no-underline hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-base text-ink-2 max-w-[72ch]">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <p className="label text-muted mt-2">
            <span className="visually-hidden">Tagged </span>
            {post.tags.join(', ')}
          </p>
        )}
      </div>
    </li>
  );
}
