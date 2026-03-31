import type { Project } from '../types';

const STATUS_LABELS: Record<Project['status'], string> = {
  Stable: 'STABLE',
  Beta: 'BETA',
  Archived: 'ARCHIVED',
};

const STATUS_STYLES: Record<Project['status'], string> = {
  Stable: 'border border-gray-400 text-gray-600',
  Beta: 'border border-yellow-500 text-yellow-600',
  Archived: 'border border-gray-300 text-gray-400 line-through',
};

interface ProjectCardProps {
  project: Project;
  /** Link label override, e.g. "VIEW CODE" or "CASE STUDY" */
  linkLabel?: string;
  /** Compact horizontal layout, used on the Home page */
  compact?: boolean;
}

export function ProjectCard({ project, linkLabel = 'VIEW CODE', compact = false }: ProjectCardProps) {
  if (compact) {
    return (
      <div className="border border-gray-200 p-5 bg-white hover:border-gray-400 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-mono text-sm font-bold tracking-wider text-black uppercase mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 font-sans leading-relaxed mb-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] border border-gray-300 text-gray-500 px-1.5 py-0.5 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2">
            <span className={`font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider ${STATUS_STYLES[project.status]}`}>
              {STATUS_LABELS[project.status]}
            </span>
            {project.gitHubUrl && (
              <a
                href={project.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
              >
                {linkLabel} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 bg-white hover:border-gray-400 transition-colors group">
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
            {project.title}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-sans text-base font-bold text-black leading-tight">
            {project.title}
          </h3>
          <span className={`shrink-0 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider ${STATUS_STYLES[project.status]}`}>
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] border border-gray-300 text-gray-500 px-1.5 py-0.5 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 font-sans leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex gap-4">
          {project.gitHubUrl && (
            <a
              href={project.gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-gray-500 hover:text-black uppercase tracking-widest transition-colors"
            >
              SOURCE ↗
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-gray-500 hover:text-black uppercase tracking-widest transition-colors"
            >
              LIVE DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
