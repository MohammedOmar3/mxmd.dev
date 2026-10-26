import type { GitHubRepo } from '../types';

function formatUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });
}

/** One repository as a compact row in the GitHub list. */
export function GitHubRepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <li className="group">
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="grid gap-x-6 gap-y-1 py-4 border-b border-rule no-underline sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] items-baseline hover:bg-surface transition-colors px-2 -mx-2 rounded-md"
      >
        <span className="font-mono text-sm font-medium text-ink group-hover:text-neon-ink">{repo.name}</span>
        <span className="text-sm text-ink-2">
          {repo.description ?? <span className="text-muted">No description yet.</span>}
        </span>
        <span className="font-mono text-xs text-muted whitespace-nowrap">
          {repo.language && <>{repo.language}<span className="mx-2 text-rule-2">/</span></>}
          {formatUpdated(repo.updatedAt)}
        </span>
      </a>
    </li>
  );
}
