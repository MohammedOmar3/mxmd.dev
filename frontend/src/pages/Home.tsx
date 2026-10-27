import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import type { BlogPost, GitHubRepo } from '../types';
import { BlogPostRow } from '../components/BlogPostRow';
import { GitHubRepoCard } from '../components/GitHubRepoCard';
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS } from '../content';

const POSTS_PAGE_SIZE = 4;
const MORE_REPOS = 6;

function Avatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="size-20 sm:size-24 shrink-0 rounded-xl overflow-hidden bg-ink ring-1 ring-rule">
      {failed ? (
        <span className="size-full flex items-center justify-center font-mono text-xl font-medium text-neon">MO</span>
      ) : (
        <img
          src="/avatar.jpg"
          alt={PROFILE.name}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pt-20 sm:pt-28">
      <h2 id={`${id}-title`} className="section-title mb-8">{title}</h2>
      {children}
    </section>
  );
}

export function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsPage, setPostsPage] = useState(1);
  const [postsTotal, setPostsTotal] = useState(0);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (!initialLoad.current) return;
    initialLoad.current = false;

    api.getGitHubRepos()
      .then(setRepos)
      .catch(() => setReposError(true))
      .finally(() => setReposLoading(false));

    api.getBlogPosts(1, POSTS_PAGE_SIZE)
      .then((data) => {
        setPosts(data.posts);
        setPostsTotal(data.total);
      })
      .catch(() => setPostsError(true))
      .finally(() => setPostsLoading(false));
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = postsPage + 1;
      const data = await api.getBlogPosts(nextPage, POSTS_PAGE_SIZE);
      setPosts((prev) => [...prev, ...data.posts]);
      setPostsPage(nextPage);
      setPostsTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const repoFor = (name?: string) =>
    name ? repos.find((r) => r.name.toLowerCase() === name.toLowerCase()) : undefined;
  const featured = new Set(PROJECTS.map((p) => p.repo?.toLowerCase()));
  const moreRepos = repos.filter((r) => !featured.has(r.name.toLowerCase())).slice(0, MORE_REPOS);
  const hasMorePosts = posts.length < postsTotal;

  return (
    <main className="frame flex-1 pb-24">
      {/* Hero */}
      <section aria-label="Introduction" className="pt-14 sm:pt-20">
        <div className="flex items-center gap-5">
          <Avatar />
          <div className="min-w-0">
            <h1 className="text-4xl sm:text-6xl">{PROFILE.name}</h1>
            <p className="font-mono text-sm text-muted mt-2">
              {PROFILE.role} <span className="text-rule-2">/</span> {EXPERIENCE[0].company}
            </p>
          </div>
        </div>


        <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
          <span>{PROFILE.location}</span>
          <span className="flex items-center gap-2 text-ink">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-neon ring-2 ring-neon/30" />
            {PROFILE.availability}
          </span>
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">Email me</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">LinkedIn</a>
        </div>
      </section>


      {/* Journal */}
      <Section id="journal" title="Journal">
        {postsLoading ? (
          <ul aria-busy="true" className="list-none m-0 p-0 space-y-2">
            {[1, 2, 3].map((i) => <li key={i} className="skeleton h-20" />)}
          </ul>
        ) : postsError ? (
          <p className="text-sm text-muted">The journal didn’t load. Try again in a moment.</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-muted">No posts yet.</p>
        ) : (
          <ul className="list-none m-0 p-0 border-t border-rule">
            {posts.map((post) => <BlogPostRow key={post.id} post={post} />)}
          </ul>
        )}

        {!postsLoading && hasMorePosts && (
          <div className="mt-8">
            <button type="button" onClick={loadMore} disabled={loadingMore} aria-busy={loadingMore} className="btn btn-ghost">
              {loadingMore ? 'Loading…' : 'Load more posts'}
            </button>
          </div>
        )}
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <ol className="list-none m-0 p-0 border-t border-rule">
          {EXPERIENCE.map((role) => (
            <li key={role.company} className="grid gap-x-8 gap-y-3 py-8 border-b border-rule md:grid-cols-[11rem_minmax(0,1fr)]">
              <p className="font-mono text-xs text-muted pt-1.5">
                {role.start} – {role.end}
              </p>
              <div className="min-w-0">
                <h3 className="text-xl">
                  {role.title} <span className="text-muted font-normal">at</span> {role.company}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {role.location}
                </p>
              </div>
            </li>
          ))}
          <li className="grid gap-x-8 gap-y-3 py-8 border-b border-rule md:grid-cols-[11rem_minmax(0,1fr)]">
            <p className="font-mono text-xs text-muted pt-1.5">{EDUCATION.year}</p>
            <div className="min-w-0">
              <h3 className="text-xl">
                {EDUCATION.degree} <span className="text-muted font-normal">at</span> {EDUCATION.school}
              </h3>
            </div>
          </li>
        </ol>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => {
            const repo = repoFor(project.repo);
            return (
              <article key={project.name} className="flex flex-col rounded-2xl border border-rule bg-surface p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl">{project.name}</h3>
                  {repo && (
                    <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="link font-mono text-xs text-ink-2">
                      Source
                    </a>
                  )}
                </div>
                <p className="mt-3 text-ink-2 flex-1">{project.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 list-none p-0 m-0">
                  {project.stack.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </article>
            );
          })}
        </div>

        <h3 className="mt-14 mb-2 text-base font-medium text-ink-2 tracking-normal">More on GitHub</h3>
        {reposLoading ? (
          <ul aria-busy="true" className="list-none m-0 p-0 space-y-2">
            {[1, 2, 3].map((i) => <li key={i} className="skeleton h-12" />)}
          </ul>
        ) : reposError ? (
          <p className="text-sm text-muted">
            The repositories didn’t load. They’re all on{' '}
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link text-ink">GitHub</a>.
          </p>
        ) : (
          <>
            <ul className="list-none m-0 p-0 border-t border-rule">
              {moreRepos.map((repo) => <GitHubRepoCard key={repo.name} repo={repo} />)}
            </ul>
            <p className="mt-5 text-sm">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
                All repositories on GitHub
              </a>
            </p>
          </>
        )}
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <dl className="m-0 border-t border-rule">
          {SKILLS.map(({ group, items }) => (
            <div key={group} className="grid gap-x-8 gap-y-2 py-5 border-b border-rule md:grid-cols-[11rem_minmax(0,1fr)]">
              <dt className="font-mono text-xs text-muted pt-1">{group}</dt>
              <dd className="m-0 flex flex-wrap gap-1.5">
                {items.map((item) => <span key={item} className="chip">{item}</span>)}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className="mt-20 sm:mt-28 rounded-2xl bg-night p-8 sm:p-12">
        <h2 id="contact-title" className="text-3xl sm:text-4xl text-paper">Let’s talk.</h2>
        <p className="mt-3 text-night-muted max-w-[48ch]">
          Based in {PROFILE.location} and {PROFILE.availability.toLowerCase()}. The quickest way to reach me is email.
        </p>
        <p className="mt-8">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-lg sm:text-2xl text-neon underline decoration-neon/40 decoration-2 underline-offset-[6px] hover:decoration-neon break-all"
          >
            {PROFILE.email}
          </a>
        </p>
        <p className="mt-6 flex gap-6 text-sm">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-night-rule underline-offset-4 hover:decoration-neon">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-night-rule underline-offset-4 hover:decoration-neon">LinkedIn</a>
        </p>
      </section>
    </main>
  );
}
