import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import type { BlogPost, GitHubRepo } from '../types';
import { BlogPostRow } from '../components/BlogPostRow';
import { GitHubRepoCard } from '../components/GitHubRepoCard';

const SC = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
const SOURCE = 'mohammed';
const MID    = 'maxamed.'; // same length, collapses to "mxmd" by dropping indices 1,3,5,7
const rnd = () => SC[Math.floor(Math.random() * SC.length)];

const SKILLS = [
  'C#', '.NET', 'Azure', 'SQL',
  'React', 'TypeScript', 'REST APIs', 'Entity Framework',
  'PostgreSQL', 'Docker', 'Git',
];

const CURRENT_ROLE = { company: 'Edenred UAE', title: 'Software Engineer', since: 'May 2025' };

const POSTS_PAGE_SIZE = 4;

function ScrambleName() {
  const [chars, setChars] = useState<(string | null)[]>([...SOURCE]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearT = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  const onEnter = () => {
    clearT();
    // Phase 1: scramble SOURCE → MID, locking left to right
    let locked = 0;
    setChars([...SOURCE].map(() => rnd()));
    timer.current = setInterval(() => {
      locked++;
      const next: (string | null)[] = [...MID].map((ch, i) => i < locked ? ch : rnd());
      setChars(next);
      if (locked >= 8) {
        clearT();
        // Phase 2: collapse indices 7,5,3,1 (right→left) to shrink to "mxmd"
        const dropping = [7, 5, 3, 1];
        let step = 0;
        const state: (string | null)[] = [...MID] as (string | null)[];
        timer.current = setInterval(() => {
          state[dropping[step]] = null;
          step++;
          setChars([...state]);
          if (step >= dropping.length) clearT();
        }, 80);
      }
    }, 50);
  };

  const onLeave = () => {
    clearT();
    // Jump to collapsed state: keep only m,x,m,d (indices 0,2,4,6)
    const state: (string | null)[] = [MID[0], null, MID[2], null, MID[4], null, MID[6], null];
    setChars([...state]);
    // Phase 1: expand indices 1,3,5,7 back (left→right) to restore "maxamed."
    const adding = [1, 3, 5, 7];
    let step = 0;
    timer.current = setInterval(() => {
      state[adding[step]] = MID[adding[step]];
      step++;
      setChars([...state]);
      if (step >= adding.length) {
        clearT();
        // Phase 2: scramble MID → SOURCE, locking right to left
        let locked = 0;
        const srcArr = [...SOURCE];
        timer.current = setInterval(() => {
          locked++;
          setChars(srcArr.map((ch, i) => i >= 8 - locked ? ch : rnd()));
          if (locked >= 8) {
            clearT();
            setChars([...SOURCE]);
          }
        }, 50);
      }
    }, 80);
  };

  useEffect(() => () => clearT(), []);

  // The scramble swaps glyphs; it never moves anything, so it plays under reduced motion too.
  return (
    <h1
      aria-label="mohammed omar"
      className="max-w-none text-[clamp(4rem,9vw+1rem,10rem)] leading-[0.88] cursor-default select-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span aria-hidden="true">{chars.filter(c => c !== null).join('')}</span>
      <br aria-hidden="true" />
      <span aria-hidden="true">omar</span>
    </h1>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="photo aspect-[4/5] w-full bg-paper-2 overflow-hidden">
      {failed ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-display font-extrabold text-ink text-display">MO</span>
        </div>
      ) : (
        <img
          src="/avatar.jpg"
          alt="Mohammed Omar"
          className="w-full h-full object-cover [filter:saturate(0.9)_contrast(1.04)]"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function SectionHead({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={`${id}-title`} className="mb-(--space-xl)">
      {title}
    </h2>
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

  const hasMorePosts = posts.length < postsTotal;

  return (
    <main className="frame flex-1">
      {/* Hero */}
      <section
        aria-label="Introduction"
        className="flex flex-col md:flex-row md:items-end gap-(--gap-columns) md:gap-(--space-3xl) pt-(--space-2xl) pb-(--space-2xl)"
      >
        <div className="flex flex-col gap-(--space-lg) min-w-0">
          <ScrambleName />
          <p className="standfirst max-w-[30ch]">
            Software Engineer with a deep passion for learning and building.
          </p>
          <div className="label flex flex-wrap gap-3">
            <a
              href="https://github.com/MohammedOmar3"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-omar3/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="w-full max-w-[26rem] md:max-w-none md:w-[min(42%,30rem)] md:shrink-0">
          <Portrait />
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="opens mt-(--space-xl)">
        <SectionHead id="about" title="About" />
        <div className="grid gap-(--gap-columns) md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <p className="statement">
            I care about clean code, well-designed systems, and shipping things that work.
            Currently focused on backend development with .NET and cloud infrastructure on Azure.
          </p>

          <dl className="m-0 grid gap-(--space-lg) content-start">
            <div className="border-t border-rule pt-3">
              <dt className="label text-muted">Now</dt>
              <dd className="m-0 mt-1 text-ink">
                {CURRENT_ROLE.title} at {CURRENT_ROLE.company}, since {CURRENT_ROLE.since}
              </dd>
            </div>
            <div className="border-t border-rule pt-3">
              <dt className="label text-muted">Works with</dt>
              <dd className="m-0 mt-1 text-ink">{SKILLS.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Work */}
      <section id="work" aria-labelledby="work-title" className="opens mt-(--section-gap-s)">
        <SectionHead id="work" title="Work" />
        {reposLoading ? (
          <ul aria-busy="true" className="list-none m-0 p-0 border-t border-rule">
            {[1, 2, 3].map((i) => (
              <li key={i} className="skeleton h-20 border-b border-rule" />
            ))}
          </ul>
        ) : reposError ? (
          <p className="label text-muted border-t border-rule pt-6">
            The repositories didn’t load. GitHub has them all at{' '}
            <a href="https://github.com/MohammedOmar3" className="link text-ink" target="_blank" rel="noopener noreferrer">
              MohammedOmar3
            </a>.
          </p>
        ) : (
          <ul className="list-none m-0 p-0 border-t border-rule">
            {repos.map((repo) => (
              <GitHubRepoCard key={repo.name} repo={repo} />
            ))}
          </ul>
        )}
      </section>

      {/* Journal */}
      <section id="journal" aria-labelledby="journal-title" className="opens mt-(--section-gap-s)">
        <SectionHead id="journal" title="Journal" />
        {postsLoading ? (
          <ul aria-busy="true" className="list-none m-0 p-0 border-t border-rule">
            {[1, 2, 3].map((i) => (
              <li key={i} className="skeleton h-24 border-b border-rule" />
            ))}
          </ul>
        ) : postsError ? (
          <p className="label text-muted border-t border-rule pt-6">The journal didn’t load. Try again in a moment.</p>
        ) : posts.length === 0 ? (
          <p className="label text-muted border-t border-rule pt-6">No posts yet.</p>
        ) : (
          <ul className="list-none m-0 p-0 border-t border-rule">
            {posts.map((post) => (
              <BlogPostRow key={post.id} post={post} />
            ))}
          </ul>
        )}

        {!postsLoading && hasMorePosts && (
          <div className="label mt-(--space-xl)">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              aria-busy={loadingMore}
              className="btn btn--secondary"
            >
              {loadingMore ? 'Loading posts' : 'Load more posts'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
