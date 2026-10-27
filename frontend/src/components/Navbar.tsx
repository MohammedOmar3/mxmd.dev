import { Link } from 'react-router-dom';

const SECTIONS = [
  { hash: '#journal', label: 'Journal' },
  { hash: '#experience', label: 'Experience' },
  { hash: '#projects', label: 'Projects' },
  { hash: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-rule">
      <div className="frame flex items-center justify-between h-16">
        <Link to="/" className="font-mono text-sm font-medium text-ink no-underline hover:text-neon-ink">
          mxmd<span className="text-neon-ink">.</span>dev
        </Link>

        <nav aria-label="Sections" className="flex items-center gap-5 sm:gap-7">
          {SECTIONS.map(({ hash, label }, i) => (
            <Link
              key={hash}
              to={{ pathname: '/', hash }}
              className={`text-sm text-ink-2 no-underline hover:text-ink ${i >= 2 ? 'hidden sm:inline' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
