declare module 'react-syntax-highlighter/dist/esm/prism-light' {
  const SyntaxHighlighter: any;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const styles: Record<string, any>;
  export = styles;
  export const oneDark: any;
  export const vscDarkPlus: any;
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/*' {
  const language: any;
  export default language;
}
