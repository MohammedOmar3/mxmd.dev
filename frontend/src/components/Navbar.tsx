import { Link } from 'react-router-dom';

const SECTIONS = [
  { hash: '#about', label: 'About' },
  { hash: '#work', label: 'Work' },
  { hash: '#journal', label: 'Journal' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-(--z-sticky-nav) bg-paper border-b border-rule">
      <div className="frame flex items-center justify-between min-h-16">
        <Link
          to="/"
          className="label text-base text-ink no-underline hover:text-ink-2"
        >
          mxmd.dev
        </Link>

        <nav aria-label="Sections" className="flex items-center gap-6 sm:gap-8">
          {SECTIONS.map(({ hash, label }) => (
            <Link
              key={hash}
              to={{ pathname: '/', hash }}
              className="label link text-ink-2 no-underline hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
