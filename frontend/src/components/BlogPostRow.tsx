import type { BlogPost } from '../types';

interface BlogPostRowProps {
  post: BlogPost;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

export function BlogPostRow({ post }: BlogPostRowProps) {
  return (
    <div className="py-6 border-b border-gray-200 group flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors px-1">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[10px] text-gray-400 tracking-widest">
            {formatDate(post.publishedAt)}
          </span>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] border border-[#39FF14] text-[#2acc0f] px-1.5 py-0.5 uppercase tracking-wider"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>

        <h3 className="font-sans text-lg font-bold text-black group-hover:text-gray-700 transition-colors leading-snug mb-1">
          {post.title}
        </h3>

        <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-xl">
          {post.excerpt}
        </p>
      </div>

      <span className="shrink-0 text-gray-300 group-hover:text-gray-600 text-xl font-light transition-colors">
        +
      </span>
    </div>
  );
}
