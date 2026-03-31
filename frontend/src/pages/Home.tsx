import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { BlogPost, Project } from '../types';
import { BlogPostRow } from '../components/BlogPostRow';
import { ProjectCard } from '../components/ProjectCard';

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
        <div className="w-40 h-40 shrink-0 bg-black rounded-2xl flex items-center justify-center shadow-lg">
          <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
        </div>

        <div>
          <div className="inline-block font-mono text-[10px] tracking-widest bg-[#39FF14] text-black px-2 py-1 mb-4">
            STATUS: AVAILABLE
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl font-black text-black leading-none tracking-tight mb-4">
            Software Engineer<br />& Architect
          </h1>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            I build elegant systems with precision and logic.<br />
            Focused on performance-driven architecture and<br />
            minimalist digital interfaces.
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
