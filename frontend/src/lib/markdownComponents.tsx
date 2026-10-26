import type { Components } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('cs', csharp);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('rs', rust);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('dockerfile', docker);
SyntaxHighlighter.registerLanguage('go', go);

// The code block runs on the ink band; its token colours come from the theme too.
const codeTheme = {
  ...oneDark,
  'pre[class*="language-"]': { ...oneDark['pre[class*="language-"]'], background: 'var(--color-night)' },
  'code[class*="language-"]': { ...oneDark['code[class*="language-"]'], background: 'none', fontFamily: 'var(--font-mono)' },
};

export const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className ?? '');
    const isInline = !match;
    if (isInline) {
      return (
        <code
          className="font-mono text-[0.85em] bg-surface border border-rule rounded px-1.5 py-0.5 text-ink"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <figure className="my-8 mx-0 bg-night rounded-xl overflow-hidden">
        <figcaption className="font-mono text-xs text-night-muted px-4 py-2 border-b border-night-rule flex items-center justify-between">
          <span>{match[1]}</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-neon" />
        </figcaption>
        <SyntaxHighlighter
          style={codeTheme}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: 0,
            padding: '1.25rem 1rem',
            fontSize: '0.85rem',
            lineHeight: '1.7',
          }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </figure>
    );
  },
  h1: ({ children }) => (
    <h2 className="text-3xl mt-14 mb-4">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl mt-10 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-ink-2 text-[1.0625rem] leading-[1.75] mb-6">
      {children}
    </p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 mx-0 pl-5 border-l-2 border-neon text-ink-2">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-4 pl-6 list-disc marker:text-neon-ink space-y-2 text-ink-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 pl-6 list-decimal marker:text-neon-ink font-normal space-y-2 text-ink-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-[1.75] pl-1">{children}</li>
  ),
  hr: () => <hr className="my-12 border-0 border-t border-rule" />,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link text-ink"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  img: ({ src, alt }) => (
    <span className="block my-8">
      <img src={src} alt={alt ?? ''} className="w-full rounded-xl border border-rule" />
    </span>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto border border-rule rounded-xl bg-surface">
      <table className="w-full text-base border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="font-mono text-xs font-medium text-left text-muted px-4 py-2.5 border-b border-rule">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-ink-2 border-b border-rule">
      {children}
    </td>
  ),
};
