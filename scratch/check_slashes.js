const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

const textSlashRegexes = [
  /\b[A-Za-z0-9]+\s*\/\/\s*[A-Za-z0-9]+\b/, // word // word
  /\b[A-Za-z0-9]+\s*\/\s*[A-Za-z0-9]+\b/,   // word / word
  />[^<]*\/\/[^<]*</,                      // JSX text containing //
  />[^<]*\s+\/\s+[^<]*</,                  // JSX text containing space / space
];

const results = [];

walkDir('./src', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.html')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Skip import/export lines and comments
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('import ') || trimmed.startsWith('export ') || trimmed.includes('from "') || trimmed.includes("from '")) return;
    if (trimmed.includes('http://') || trimmed.includes('https://') || trimmed.includes('href=') || trimmed.includes('to="') || trimmed.includes('path:') || trimmed.includes('path =')) return;
    
    // Check if line has user-visible / or //
    // Look for JSX text or quoted strings
    const stringMatches = line.match(/"([^"]*)"|'([^']*)'|`([^`]*)`/g);
    if (stringMatches) {
      stringMatches.forEach(str => {
        // filter out className, svg paths, ids, urls
        if (str.includes('/') && !str.includes('flex/') && !str.includes('border/') && !str.includes('bg/') && !str.includes('text/') && !str.includes('inset/') && !str.includes('opacity/') && !str.includes('http') && !str.includes('aspect-') && !str.includes('px/') && !str.includes('py/') && !str.includes('gap-') && !str.includes('w-') && !str.includes('h-') && !str.includes('m-') && !str.includes('p-')) {
          if (str.match(/\b\d+\s*\/\s*\d+\b/) || str.match(/[a-zA-Z]\s*\/\s*[a-zA-Z]/) || str.includes('//')) {
            results.push({ file: filePath, line: idx + 1, text: str.trim(), fullLine: trimmed });
          }
        }
      });
    }

    // Check raw JSX text
    const jsxMatch = line.match(/>([^<]+)</);
    if (jsxMatch) {
      const text = jsxMatch[1].trim();
      if ((text.includes('/') || text.includes('//')) && !text.includes('</')) {
        results.push({ file: filePath, line: idx + 1, text, fullLine: trimmed });
      }
    }
  });
});

console.log(JSON.stringify(results.slice(0, 40), null, 2));

