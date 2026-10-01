import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const failures = [];
for (const file of ['src/components/AppShell.tsx','src/App.tsx','src/styles.css']) {
  if (!existsSync(resolve(root, file))) failures.push(`Missing: ${file}`);
}
const shell = readFileSync(resolve(root,'src/components/AppShell.tsx'),'utf8');
for (const marker of ['<header','<main','<footer']) {
  if (!shell.includes(marker)) failures.push(`Missing shell marker: ${marker}`);
}
const app = readFileSync(resolve(root,'src/App.tsx'),'utf8');
for (const marker of ['Tennisturnier Neindorf','Ein Tag für alle.','React + TypeScript + Vite','PHP + PDO + MariaDB']) {
  if (!app.includes(marker)) failures.push(`Missing app marker: ${marker}`);
}
console.log(JSON.stringify({test:'TT-DEV-0003-C002-R001',status:failures.length?'error':'ok',failures},null,2));
process.exit(failures.length ? 1 : 0);
