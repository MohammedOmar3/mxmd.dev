// Site copy, taken from Mohammed's CV. Edit here, not in the components.

export const PROFILE = {
  name: 'Mohammed Omar',
  role: 'Software Engineer',
  location: 'Dubai, UAE',
  availability: 'Open to relocation',
  email: 'o.mohammed3@hotmail.com',
  github: 'https://github.com/MohammedOmar3',
  linkedin: 'https://www.linkedin.com/in/mohammed-omar3/',
};

export interface Role {
  company: string;
  title: string;
  team?: string;
  location: string;
  start: string;
  end: string;
  points: string[];
}

export const EXPERIENCE: Role[] = [
  {
    company: 'Edenred',
    title: 'Software Engineer',
    location: 'Dubai, UAE',
    start: 'May 2025',
    end: 'Present',
    points: [
      'Rebuilt a scheduled batch-file pipeline as a cloud .NET service with checkpoint-based, idempotent recovery and a one-click reprocessing dashboard.',
      'Built a file processor with failure-isolated handlers, per-handler checkpoints and transactional-outbox publishing.',
      'Designed an event-driven pipeline on the Cosmos DB change feed with a retrying worker, an audit trail and feature-flag rollback.',
      'Migrated a .NET 4.5 Web Forms application to .NET 10 through an RFC and proof of concept that reused the existing layers, with sub-60-second rollback.',
      'Wrote a reconciliation-based stress-test harness that caught silent write failures in a high-volume ingestion path before release.',
      'Created a shared Azure DevOps CI template with a SonarQube quality gate and automatic PR reports, adopted by 16 repositories.',
    ],
  },
  {
    company: 'Symology',
    title: 'Software Developer',
    location: 'Dunstable, UK',
    start: 'Jan 2023',
    end: 'May 2025',
    points: [
      'Built features in ASP.NET with thorough unit-test coverage.',
      'Worked on performance optimisation, new features and bug fixes in agile sprints, and reviewed pull requests.',
    ],
  },
];

export const EDUCATION = {
  school: 'Aston University',
  degree: 'BSc Computer Science',
  year: '2023',
  award: '2nd place, company data hackathon (2025): built the backend APIs for a wallet app in two days.',
};

export interface Project {
  name: string;
  stack: string[];
  summary: string;
  /** Matched against GitHub repo names to find a source link. */
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Tilawah',
    stack: ['Go', 'WebSockets', 'Next.js', 'Cloudflare'],
    summary:
      'Listeners around the world hear the same audio in sync: NTP-style clock sync over WebSockets, drift correction and privacy-preserving presence, designed for 5K concurrent users at under $10 a month.',
    repo: 'tilawah',
  },
  {
    name: 'dockn',
    stack: ['Rust', 'Axum', 'PostgreSQL', 'React', 'TypeScript'],
    summary:
      'A full-stack productivity app with Argon2id hashing, rotating JWT refresh tokens, per-IP rate limiting and versioned SQL migrations, deployed on Railway and Vercel.',
    repo: 'dockn',
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C#', 'SQL', 'TypeScript', 'Go', 'Rust', 'Python'] },
  { group: 'Backend & data', items: ['.NET / ASP.NET Core', 'MassTransit', 'Azure Service Bus', 'Cosmos DB', 'SQL Server', 'PostgreSQL'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { group: 'Cloud & tooling', items: ['Azure', 'Azure DevOps CI/CD', 'SonarQube', 'Docker'] },
  { group: 'Practices', items: ['Event-driven architecture', 'Idempotent processing', 'Transactional outbox', 'Observability', 'Incident response'] },
];
