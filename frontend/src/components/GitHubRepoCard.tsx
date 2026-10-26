import type { GitHubRepo } from '../types';

function formatUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });
}

/** One repository as a row in the Work index. */
export function GitHubRepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <li className="grid gap-x-(--gap-columns) gap-y-2 py-6 border-b border-rule sm:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(0,2fr)] items-baseline">
      <h3 className="text-title sm:text-2xl leading-none">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link no-underline hover:underline"
        >
          {repo.name}
        </a>
      </h3>

      <p className="text-base text-ink-2">
        {repo.description ?? <span className="text-muted">No description yet.</span>}
      </p>

      <p className="label text-muted sm:text-right">
        {repo.language && <span className="text-ink-2">{repo.language}</span>}
        {repo.language && <br className="hidden sm:inline" />}
        <span className={repo.language ? 'ml-3 sm:ml-0' : ''}>
          <span className="visually-hidden">Updated </span>
          {formatUpdated(repo.updatedAt)}
        </span>
      </p>
    </li>
  );
}
