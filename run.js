import fs from 'fs';
import path from 'path';

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

const replacements = [
  { regex: /bg-white(?!\/)(?!\s*dark:)/g, replace: 'bg-white dark:bg-gray-950' },
  { regex: /bg-white\/([a-zA-Z0-9_]+)(?!\s*dark:)/g, replace: 'bg-white/$1 dark:bg-gray-950/$1' },
  { regex: /bg-gray-50(?!\/)(?!\s*dark:)/g, replace: 'bg-gray-50 dark:bg-gray-900' },
  { regex: /bg-gray-100(?!\/)(?!\s*dark:)/g, replace: 'bg-gray-100 dark:bg-gray-800' },
  { regex: /bg-gray-200(?!\/)(?!\s*dark:)/g, replace: 'bg-gray-200 dark:bg-gray-700' },
  { regex: /bg-gray-800(?!\/)(?!\s*dark:)/g, replace: 'bg-gray-800 dark:bg-gray-200' },
  { regex: /bg-gray-900(?!\/)(?!\s*dark:)/g, replace: 'bg-gray-900 dark:bg-gray-100' },
  { regex: /text-gray-900(?!\s*dark:)/g, replace: 'text-gray-900 dark:text-gray-100' },
  { regex: /text-gray-800(?!\s*dark:)/g, replace: 'text-gray-800 dark:text-gray-200' },
  { regex: /text-gray-700(?!\s*dark:)/g, replace: 'text-gray-700 dark:text-gray-300' },
  { regex: /text-gray-600(?!\s*dark:)/g, replace: 'text-gray-600 dark:text-gray-400' },
  { regex: /text-gray-500(?!\s*dark:)/g, replace: 'text-gray-500 dark:text-gray-400' },
  { regex: /text-gray-400(?!\s*dark:)/g, replace: 'text-gray-400 dark:text-gray-500' },
  { regex: /border-gray-100(?!\/)(?!\s*dark:)/g, replace: 'border-gray-100 dark:border-gray-800' },
  { regex: /border-gray-200(?!\/)(?!\s*dark:)/g, replace: 'border-gray-200 dark:border-gray-800' },
  { regex: /border-gray-200\/([a-zA-Z0-9_]+)(?!\s*dark:)/g, replace: 'border-gray-200/$1 dark:border-gray-800/$1' },
  { regex: /border-gray-300(?!\/)(?!\s*dark:)/g, replace: 'border-gray-300 dark:border-gray-700' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  const classNameRegex = /(className=)(["'`])(.*?)\2/g;
  
  content = content.replace(classNameRegex, (match, prefix, quote, classes) => {
    let updated = classes;
    for (const { regex, replace } of replacements) {
      updated = updated.replace(regex, replace);
    }
    return prefix + quote + updated + quote;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

walkDir('./src', processFile);
