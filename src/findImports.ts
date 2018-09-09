import * as fs from 'fs';
import * as ts from 'typescript';
import { collectImports } from './collectImports';

export function findImportsSync(file: string): Set<string> {
  const content = fs.readFileSync(file, { encoding: 'utf-8' });
  const srcFile = ts.createSourceFile(file, content, ts.ScriptTarget.ESNext);
  return collectImports(srcFile);
}

export function findImports(file: string): Promise<Set<string>> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const srcFile = ts.createSourceFile(file, data, ts.ScriptTarget.ESNext);
        resolve(collectImports(srcFile));
      }
    });
  });
}
