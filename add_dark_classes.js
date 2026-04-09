const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.jsx')) {
      callback(dirPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const replacements = [
    // bg colors
    { regex: /(?<!dark:)bg-white(?!\/)/g, replace: 'bg-white dark:bg-gray-900' },
    { regex: /(?<!dark:)bg-white\/(\w+)/g, replace: 'bg-white/$1 dark:bg-gray-900/$1' },
    { regex: /(?<!dark:)bg-gray-50(?!\/)/g, replace: 'bg-gray-50 dark:bg-gray-800' },
    { regex: /(?<!dark:)bg-gray-100(?!\/)/g, replace: 'bg-gray-100 dark:bg-gray-800' },
    { regex: /(?<!dark:)bg-gray-200(?!\/)/g, replace: 'bg-gray-200 dark:bg-gray-700' },
    { regex: /(?<!dark:)bg-gray-300(?!\/)/g, replace: 'bg-gray-300 dark:bg-gray-600' },
    { regex: /(?<!dark:)bg-gray-800(?!\/)/g, replace: 'bg-gray-800 dark:bg-gray-100' },
    { regex: /(?<!dark:)bg-gray-900(?!\/)/g, replace: 'bg-gray-900 dark:bg-gray-50' },

    // text colors
    { regex: /(?<!dark:)text-gray-900/g, replace: 'text-gray-900 dark:text-gray-100' },
    { regex: /(?<!dark:)text-gray-800/g, replace: 'text-gray-800 dark:text-gray-200' },
    { regex: /(?<!dark:)text-gray-700/g, replace: 'text-gray-700 dark:text-gray-300' },
    { regex: /(?<!dark:)text-gray-600/g, replace: 'text-gray-600 dark:text-gray-400' },
    { regex: /(?<!dark:)text-gray-500/g, replace: 'text-gray-500 dark:text-gray-400' },
    { regex: /(?<!dark:)text-gray-400/g, replace: 'text-gray-400 dark:text-gray-500' },

    // border colors
    { regex: /(?<!dark:)border-gray-100/g, replace: 'border-gray-100 dark:border-gray-800' },
    { regex: /(?<!dark:)border-gray-200(?!\/)/g, replace: 'border-gray-200 dark:border-gray-700' },
    { regex: /(?<!dark:)border-gray-200\/(\w+)/g, replace: 'border-gray-200/$1 dark:border-gray-700/$1' },
    { regex: /(?<!dark:)border-gray-300/g, replace: 'border-gray-300 dark:border-gray-600' },

    // Note: Do not touch text-white directly because it might be on a brand colored background
  ];

  let original = content;
  for (const { regex, replace } of replacements) {
    // Only apply inside className="" or class=""
    content = content.replace(/className=(["`])(.*?)\1/g, (match, quote, classes) => {
      // replace within the matched classes string
      let updated = classes;
      for (const r of Object.values(replacements)) {
        updated = updated.replace(r.regex, r.replace);
      }
      // fix any double insertions, e.g. "bg-white dark:bg-gray-900 dark:bg-gray-900" 
      updated = updated.replace(/dark:\S+\s+dark:\S+/g, (m) => Array.from(new Set(m.split(/\s+/))).join(' '));
      return `className=${quote}${updated}${quote}`;
    });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir('./src', processFile);
