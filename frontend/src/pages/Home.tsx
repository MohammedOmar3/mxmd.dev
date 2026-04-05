import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { BlogPost, Project } from '../types';
import { BlogPostRow } from '../components/BlogPostRow';
import { ProjectCard } from '../components/ProjectCard';

const SC = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
const SOURCE = 'mohammed';
const MID    = 'maxamed.'; // same length, collapses to "mxmd" by dropping indices 1,3,5,7
const rnd = () => SC[Math.floor(Math.random() * SC.length)];

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

  return (
    <h1
      className="font-sans text-4xl sm:text-5xl font-black text-black leading-none tracking-tight mb-4 cursor-default select-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {chars.filter(c => c !== null).join('')} omar
    </h1>
  );
}

export function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getProjects(), api.getBlogPosts(1, 3)])
      .then(([projectData, blogData]) => {
        setProjects(projectData.slice(0, 3));
        setPosts(blogData.posts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full pb-16">
      {/* Hero */}
      <section className="flex flex-col sm:flex-row items-start gap-8 mb-20">
        <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden bg-black shadow-lg">
          <img
            src="/avatar.jpg"
            alt="mohammed omar"
            className="w-full h-full object-cover"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = 'none';
              el.parentElement!.classList.add('flex', 'items-center', 'justify-center');
              el.parentElement!.innerHTML = '<span class="font-mono text-white text-2xl font-bold">MO</span>';
            }}
          />
        </div>

        <div>
          <div className="inline-block font-mono text-[10px] tracking-widest bg-[#39FF14] text-black px-2 py-1 mb-4">
            STATUS: AVAILABLE
          </div>
          <ScrambleName />
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            Software Engineer with a deep passion for learning and building.
          </p>
        </div>
      </section>

      {/* Recent Work */}
      <section className="mb-16">
        <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase mb-6">
          01 // RECENT WORK
        </p>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        )}

        <div className="mt-6 text-right">
          <Link
            to="/projects"
            className="font-mono text-xs text-[#39FF14] hover:underline underline-offset-4 uppercase tracking-widest font-semibold"
          >
            VIEW ALL PROJECTS →
          </Link>
        </div>
      </section>

      {/* Recent Thoughts */}
      <section className="mb-16">
        <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase mb-2">
          02 // RECENT THOUGHTS
        </p>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <BlogPostRow key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-6 text-right">
          <Link
            to="/blog"
            className="font-mono text-xs text-[#39FF14] hover:underline underline-offset-4 uppercase tracking-widest font-semibold"
          >
            READ MORE →
          </Link>
        </div>
      </section>
    </main>
  );
}
