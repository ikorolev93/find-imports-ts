import { collectImports } from './collectImports';
import * as ts from 'typescript';
import * as fs from 'fs';

const files = process.argv.slice(2);
const allImports = new Set<string>();
for (const file of files) {
  const content = fs.readFileSync(file, { encoding: 'utf-8' });
  const srcFile = ts.createSourceFile(file, content, ts.ScriptTarget.ESNext);
  for (const imp of collectImports(srcFile)) {
    if (!allImports.has(imp)) {
      allImports.add(imp);
      process.stdout.write(imp + '\n');
    }
  }
}
