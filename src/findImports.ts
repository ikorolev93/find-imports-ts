import * as fs from "fs";
import * as ts from 'typescript';
import { collectImports } from './collectImports';

export function findImports(file: string) {
  const content = fs.readFileSync(file, { encoding: 'utf-8' });
  const srcFile = ts.createSourceFile(file, content, ts.ScriptTarget.ESNext);
  return collectImports(srcFile);
}
