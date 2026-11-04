import fs from 'fs';
import path from 'path';

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

const results = [];

walkDir('./src', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.html')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('import ') || trimmed.startsWith('export ') || trimmed.includes('from "') || trimmed.includes("from '")) return;
    if (trimmed.includes('http://') || trimmed.includes('https://') || trimmed.includes('href=') || trimmed.includes('to="') || trimmed.includes('path:') || trimmed.includes('path =') || trimmed.includes('className=')) return;
    
    // Look for JSX text
    const jsxMatch = trimmed.match(/>([^<]+)</);
    if (jsxMatch) {
      const text = jsxMatch[1].trim();
      if ((text.includes('//') || text.match(/\b\d+\s*\/\s*\d+\b/) || text.match(/[A-Za-z0-9]\s*\/\s*[A-Za-z0-9]/)) && !text.includes('</')) {
        results.push({ file: filePath, line: idx + 1, text, fullLine: trimmed });
      }
    }

    // Look for string literals in data / labels
    const strMatch = trimmed.match(/"([^"]+)"|'([^']+)'|`([^`]+)`/);
    if (strMatch) {
      const text = (strMatch[1] || strMatch[2] || strMatch[3]).trim();
      if (!text.includes('var(') && !text.includes('http') && !text.includes('inset') && !text.includes('calc')) {
        if (text.includes('//') || text.match(/\b\d+\s*\/\s*\d+\b/) || text.match(/[A-Za-z0-9]\s*\/\s*[A-Za-z0-9]/)) {
          results.push({ file: filePath, line: idx + 1, text, fullLine: trimmed });
        }
      }
    }
  });
});

console.log(JSON.stringify(results, null, 2));

