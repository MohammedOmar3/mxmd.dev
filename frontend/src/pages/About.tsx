import { Footer } from '../components/Footer';

const SKILLS = [
  'C#', '.NET', 'Azure', 'SQL',
  'React', 'TypeScript', 'REST APIs', 'Entity Framework',
  'PostgreSQL', 'Docker', 'Git',
];

const CURRENT_ROLE = { company: 'Edenred UAE', title: 'Software Engineer', since: 'May 2025' };

export function About() {
  return (
    <>
      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full pb-20">

        {/* Identity */}
        <section className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <img
                src="/avatar.jpg"
                alt="Mohammed Omar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement | null)!.style.display = 'flex';
                }}
              />
              <span className="font-mono text-lg font-bold text-gray-400 hidden">MO</span>
            </div>
            <div>
              <h1 className="font-mono text-2xl font-bold tracking-tight text-black">Mohammed Omar</h1>
              <p className="font-mono text-xs text-gray-400 tracking-widest uppercase mt-1">Software Engineer</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Software engineer with a deep passion for learning and building. I care about clean code,
            well-designed systems, and shipping things that work. Currently focused on backend development
            with .NET and cloud infrastructure on Azure.
          </p>
        </section>

        {/* Current Role */}
        <section className="mb-12">
          <p className="font-mono text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">
            01 // CURRENT ROLE
          </p>
          <div className="border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm font-semibold text-black">{CURRENT_ROLE.company}</p>
                <p className="font-mono text-xs text-gray-500 mt-1">{CURRENT_ROLE.title}</p>
                <p className="font-mono text-xs text-gray-400 mt-1">Since {CURRENT_ROLE.since}</p>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#39FF14] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] inline-block" />
                ACTIVE
              </span>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <p className="font-mono text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">
            02 // SKILLS
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs px-3 py-1.5 border border-gray-200 text-gray-700 hover:border-black hover:text-black transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <p className="font-mono text-xs font-medium tracking-widest uppercase text-gray-400 mb-4">
            03 // CONTACT
          </p>
          <div className="border border-gray-200 divide-y divide-gray-200">
            <a
              href="https://github.com/MohammedOmar3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">GitHub</span>
              <span className="font-mono text-xs text-gray-400 group-hover:text-black transition-colors">
                MohammedOmar3 ↗
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-omar3/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">LinkedIn</span>
              <span className="font-mono text-xs text-gray-400 group-hover:text-black transition-colors">
                mohammed-omar3 ↗
              </span>
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
