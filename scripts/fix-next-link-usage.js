import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(new URL(import.meta.url).pathname, '../apps/frontend/src');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Regex to find <Link href="..."><a>...</a></Link> and replace with <Link href="...">...</Link>
  // This is a simple regex and may need improvements for complex cases.
  const regex = /<Link([^>]*)>\s*<a([^>]*)>(.*?)<\/a>\s*<\/Link>/gs;

  content = content.replace(regex, (match, linkAttrs, aAttrs, innerText) => {
    // Merge className from <a> to <Link> if present
    const classNameMatch = aAttrs.match(/className=["']([^"']*)["']/);
    let newLinkAttrs = linkAttrs;
    if (classNameMatch) {
      const className = classNameMatch[1];
      if (newLinkAttrs.includes('className=')) {
        // Append classes if className already exists on Link
        newLinkAttrs = newLinkAttrs.replace(/className=["']([^"']*)["']/, (m, existingClasses) => {
          return `className="${existingClasses} ${className}"`;
        });
      } else {
        newLinkAttrs += ` className="${className}"`;
      }
    }
    return `<Link${newLinkAttrs}>${innerText}</Link>`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed deprecated Link usage in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      fixFile(fullPath);
    }
  }
}

walkDir(rootDir);
console.log('Completed fixing deprecated Next.js Link usage.');
