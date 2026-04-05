import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
      <NavLink
        to="/"
        className="font-mono text-sm font-semibold tracking-tight text-black hover:text-gray-600 transition-colors"
      >
        mxmd.dev
      </NavLink>

      <nav className="flex items-center gap-8">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-mono text-xs font-medium tracking-widest uppercase transition-colors ${
              isActive
                ? 'text-black underline underline-offset-4 decoration-[#39FF14] decoration-2'
                : 'text-gray-500 hover:text-black'
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `font-mono text-xs font-medium tracking-widest uppercase transition-colors ${
              isActive
                ? 'text-black underline underline-offset-4 decoration-[#39FF14] decoration-2'
                : 'text-gray-500 hover:text-black'
            }`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `font-mono text-xs font-medium tracking-widest uppercase transition-colors ${
              isActive
                ? 'text-black underline underline-offset-4 decoration-[#39FF14] decoration-2'
                : 'text-gray-500 hover:text-black'
            }`
          }
        >
          Blog
        </NavLink>
      </nav>
    </header>
  );
}
