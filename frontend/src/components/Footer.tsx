export function Footer() {
  return (
    <footer className="mt-auto px-6 py-8 border-t border-gray-200 flex items-center justify-between">
      <div>
        <p className="font-mono text-xs text-gray-500 mb-0.5">mxmd.dev</p>
        <p className="font-mono text-[10px] text-gray-400">
          © {new Date().getFullYear()} MXMD.DEV
        </p>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/mxmd-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest underline underline-offset-2 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/mxmd-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-gray-400 hover:text-black uppercase tracking-widest underline underline-offset-2 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
