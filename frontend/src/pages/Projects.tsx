import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { Footer } from '../components/Footer';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <main className="flex-1 px-6 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto pt-8 pb-6">
          <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase border border-gray-300 inline-block px-2 py-1">
            INDEX / WORKS / {new Date().getFullYear()}
          </p>
        </div>

        {/* Header */}
        <div className="max-w-5xl mx-auto mb-10">
          <h1 className="font-sans text-5xl sm:text-6xl font-black text-black tracking-tight leading-none mb-4">
            Selected Works.
          </h1>
          <p className="text-sm text-gray-500 font-sans max-w-lg leading-relaxed">
            Exploring the intersection of high-performance engineering and
            architectural user interfaces. A collection of experimental builds
            and technical modules.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
