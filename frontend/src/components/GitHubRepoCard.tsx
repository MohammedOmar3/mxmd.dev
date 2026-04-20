import type { GitHubRepo } from '../types';

const LANG_COLORS: Record<string, string> = {
  'C#': 'border-purple-300 text-purple-600',
  TypeScript: 'border-blue-300 text-blue-600',
  JavaScript: 'border-yellow-300 text-yellow-600',
  Python: 'border-green-300 text-green-600',
  Go: 'border-cyan-300 text-cyan-600',
  Rust: 'border-orange-300 text-orange-600',
  HTML: 'border-red-300 text-red-500',
  CSS: 'border-pink-300 text-pink-600',
};

const DEFAULT_LANG_STYLE = 'border-gray-300 text-gray-500';

export function GitHubRepoCard({ repo, compact = false }: { repo: GitHubRepo; compact?: boolean }) {
  const langStyle = repo.language ? (LANG_COLORS[repo.language] ?? DEFAULT_LANG_STYLE) : DEFAULT_LANG_STYLE;

  if (compact) {
    return (
      <div className="border border-gray-200 bg-white hover:border-gray-400 transition-colors p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-mono text-sm font-bold tracking-wider text-black uppercase mb-2">
              {repo.name}
            </h3>
            {repo.description ? (
              <p className="text-xs text-gray-500 font-sans leading-relaxed mb-3">{repo.description}</p>
            ) : (
              <p className="text-xs text-gray-300 font-sans italic mb-3">No description.</p>
            )}
            {repo.language && (
              <span className={`font-mono text-[10px] border px-1.5 py-0.5 uppercase tracking-wider ${langStyle}`}>
                {repo.language}
              </span>
            )}
          </div>
          <div className="shrink-0 flex flex-col items-end gap-2">
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">
              {new Date(repo.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
            </span>
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
            >
              SOURCE ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-white hover:border-gray-400 transition-colors p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-bold text-black tracking-wide leading-snug">
          {repo.name}
        </h3>
        {repo.language && (
          <span className={`shrink-0 font-mono text-[10px] border px-2 py-0.5 uppercase tracking-wider ${langStyle}`}>
            {repo.language}
          </span>
        )}
      </div>

      {repo.description ? (
        <p className="text-xs text-gray-500 font-sans leading-relaxed flex-1">
          {repo.description}
        </p>
      ) : (
        <p className="text-xs text-gray-300 font-sans italic flex-1">No description.</p>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">
          {new Date(repo.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
        </span>
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-gray-500 hover:text-black uppercase tracking-widest transition-colors"
        >
          SOURCE ↗
        </a>
      </div>
    </div>
  );
}
