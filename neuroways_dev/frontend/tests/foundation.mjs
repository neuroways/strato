import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const failures = [];
const required = [
  'package.json','index.html','tsconfig.json','tsconfig.app.json',
  'tsconfig.node.json','vite.config.ts','src/main.tsx','src/App.tsx','src/styles.css'
];
for (const file of required) if (!existsSync(resolve(root, file))) failures.push(`Missing: ${file}`);

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
if (!pkg.dependencies?.react) failures.push('React dependency missing');
if (!pkg.dependencies?.['react-dom']) failures.push('React DOM dependency missing');
if (!pkg.devDependencies?.vite) failures.push('Vite dependency missing');
if (!pkg.devDependencies?.typescript) failures.push('TypeScript dependency missing');

console.log(JSON.stringify({
  test: 'TT-DEV-0003-C001',
  status: failures.length === 0 ? 'ok' : 'error',
  failures
}, null, 2));
process.exit(failures.length ? 1 : 0);
