import { useState, useMemo } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-swift.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-yaml.js';

export default function CodeBlock({ code, language = 'text' }) {
  const [copied, setCopied] = useState(false);

  const cleanLang = (language || 'text').toLowerCase();

  const highlightedHtml = useMemo(() => {
    const rawCode = code ? code.trim() : '';
    if (!rawCode) return '';

    // Map common aliases
    const langMap = {
      js: 'javascript',
      py: 'python',
      sh: 'bash',
      shell: 'bash',
      zsh: 'bash',
      html: 'markup',
      xml: 'markup',
      svg: 'markup',
      yml: 'yaml'
    };

    const targetLang = langMap[cleanLang] || cleanLang;
    const grammar = Prism.languages[targetLang] || Prism.languages.markup || Prism.languages.text;

    if (grammar) {
      try {
        return Prism.highlight(rawCode, grammar, targetLang);
      } catch (err) {
        console.warn('Prism highlight failed:', err);
      }
    }
    return null;
  }, [code, cleanLang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code ? code.trim() : '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="code-block my-6 rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 bg-[#0d1117] shadow-xl text-left font-mono">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-gray-800 select-none">
        <div className="flex items-center gap-2">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/50"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/50"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/50"></span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Terminal size={13} className="text-purple-400" />
            {cleanLang === 'markup' ? 'HTML' : cleanLang}
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-750 border border-gray-700/80 transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Copy code to clipboard"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 md:p-5 overflow-x-auto text-sm font-mono leading-relaxed text-[#e6edf3]">
        <pre className={`m-0 p-0 font-mono whitespace-pre selection:bg-purple-500/30 language-${cleanLang}`}>
          {highlightedHtml ? (
            <code
              className={`language-${cleanLang}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <code className={`language-${cleanLang}`}>{code ? code.trim() : ''}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
