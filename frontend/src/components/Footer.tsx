export function Footer() {
  return (
    <footer className="mt-auto pt-(--section-gap-s)">
      <div className="frame">
        <div className="opens grid gap-(--gap-columns) sm:grid-cols-[minmax(0,1fr)_auto] items-end pb-(--space-2xl)">
          <p className="font-display font-extrabold text-ink text-display-s leading-none [font-variation-settings:'wdth'_75,'opsz'_96]">
            mxmd.dev
          </p>
          <ul className="label flex flex-wrap gap-6 list-none m-0 p-0">
            <li>
              <a
                href="https://github.com/MohammedOmar3"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mohammed-omar3/"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li className="text-muted">© {new Date().getFullYear()} Mohammed Omar</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
