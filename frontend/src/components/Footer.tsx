export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="frame flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
        <p className="font-mono">© {new Date().getFullYear()} mxmd.dev</p>
        <ul className="flex gap-6 list-none m-0 p-0">
          <li>
            <a href="https://github.com/MohammedOmar3" target="_blank" rel="noopener noreferrer" className="link">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/mohammed-omar3/" target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
