import React from 'react';
import CodeBlock from './CodeBlock';

/**
 * Parses and formats inline markdown tokens like `code`, **bold**, and [links](url).
 * Supports nested inline formatting (e.g. `code` inside **bold**).
 */
function parseInlineMarkdown(text) {
  if (!text) return null;

  const regex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Check for inline link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const isExternal = url.startsWith('http') || url.startsWith('//');
      return (
        <a
          key={index}
          href={url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-(--amethyst) hover:text-(--chrysler-blue) dark:hover:text-purple-300 font-medium underline underline-offset-2 transition-colors"
        >
          {label}
        </a>
      );
    }

    // Check for inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-(--chrysler-blue) dark:text-purple-300 font-mono text-sm border border-purple-200/60 dark:border-purple-800/50 font-medium tracking-tight"
        >
          {code}
        </code>
      );
    }

    // Check for bold text: **text** (handles nested inline code)
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-gray-900 dark:text-gray-100">
          {parseInlineMarkdown(inner)}
        </strong>
      );
    }

    return part;
  });
}

/**
 * Renders a block of text that may contain paragraphs, blockquotes, lists, and code blocks
 */
export default function BlogContentRenderer({ content }) {
  if (!content) return null;

  // Split content by code blocks: ```lang\n...```
  const parts = content.split(/(```[a-z0-9_-]*\n[\s\S]*?```)/gi);

  return (
    <div className="space-y-4">
      {parts.map((part, pIdx) => {
        const trimmed = part.trim();
        if (!trimmed) return null;

        // Check if this part is a code block
        if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
          const match = trimmed.match(/^```([a-z0-9_-]*)\n([\s\S]*?)```$/i);
          const lang = match ? match[1] || 'text' : 'text';
          const code = match ? match[2] : trimmed.slice(3, -3);

          return <CodeBlock key={pIdx} code={code} language={lang} />;
        }

        // Regular text block: split into paragraphs by double newlines
        const paragraphs = part.split(/\n\n+/);

        return (
          <React.Fragment key={pIdx}>
            {paragraphs.map((p, paraIdx) => {
              const paraTrimmed = p.trim();
              if (!paraTrimmed) return null;

              const lines = paraTrimmed.split('\n');

              // Check if entire paragraph is an ordered list (1. 2. 3.)
              const isNumberedList = lines.every((line) => /^\d+\.\s+/.test(line.trim()));
              if (isNumberedList) {
                return (
                  <ol key={paraIdx} className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300 my-4">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="leading-relaxed">
                        {parseInlineMarkdown(line.replace(/^\d+\.\s+/, ''))}
                      </li>
                    ))}
                  </ol>
                );
              }

              // Check if entire paragraph is an unordered list (- or *)
              const isBulletList = lines.every((line) => /^[-*]\s+/.test(line.trim()));
              if (isBulletList) {
                return (
                  <ul key={paraIdx} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 my-4">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="leading-relaxed">
                        {parseInlineMarkdown(line.replace(/^[-*]\s+/, ''))}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Check if blockquote (> quote)
              const isBlockquote = lines.every((line) => /^>\s*/.test(line.trim()));
              if (isBlockquote) {
                return (
                  <blockquote key={paraIdx} className="border-l-4 border-(--amethyst) pl-4 py-1 italic text-gray-700 dark:text-gray-300 my-4 bg-purple-50/30 dark:bg-purple-950/20 rounded-r-lg">
                    {lines.map((line, lIdx) => (
                      <p key={lIdx} className="leading-relaxed">
                        {parseInlineMarkdown(line.replace(/^>\s*/, ''))}
                      </p>
                    ))}
                  </blockquote>
                );
              }

              // Standard Paragraph
              return (
                <p key={paraIdx} className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  {parseInlineMarkdown(paraTrimmed)}
                </p>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
