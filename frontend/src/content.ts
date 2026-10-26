// Site copy, taken from Mohammed's CV. Edit here, not in the components.

export const PROFILE = {
  name: 'Mohammed Omar',
  role: 'Software Engineer',
  location: 'Dubai, UAE',
  availability: 'Open to relocation',
  email: 'o.mohammed3@hotmail.com',
  github: 'https://github.com/MohammedOmar3',
  linkedin: 'https://www.linkedin.com/in/mohammed-omar3/',
  intro:
    'I build event-driven .NET systems that move money reliably: settlement pipelines, transaction processing and the tooling that keeps them honest.',
};

export const HIGHLIGHTS = [
  { value: '570+', label: 'settlement files processed with zero data defects' },
  { value: '~1s', label: 'peak-hour transaction delay, down from 10–15 hours' },
  { value: '20 min', label: 'failed-file recovery, down from 2+ hours of manual work' },
  { value: '16', label: 'repositories on the shared CI template I built' },
];

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
    team: 'Cards & Transactions',
    location: 'Dubai, UAE',
    start: 'May 2025',
    end: 'Present',
    points: [
      'Rebuilt the card-settlement pipeline as a cloud .NET service with checkpoint-based, idempotent recovery and a one-click reprocessing dashboard.',
      'Designed an event-driven transaction pipeline on the Cosmos DB change feed that now powers five transaction policies, including fees and fraud monitoring.',
      'Led the move of a 100-agent support console from .NET 4.5 Web Forms to .NET 10 through an RFC and proof of concept, shipped with sub-60-second rollback.',
      'Built a reconciliation stress-test harness that caught silent write failures before production and unlocked a release cutting peak delay to about a second.',
    ],
  },
  {
    company: 'Symology',
    title: 'Software Developer',
    location: 'Dunstable, UK',
    start: 'Jan 2023',
    end: 'May 2025',
    points: [
      'Developed features for asset management software in ASP.NET, backed by thorough unit tests.',
      'Worked in agile sprints on performance, new features and bug fixes, and reviewed peers’ code to catch issues early.',
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
