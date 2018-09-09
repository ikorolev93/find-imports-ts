import * as sinon from 'sinon';
import { collectImports } from './collectImports';
import * as ts from 'typescript';
import { expect, use as chaiUse } from 'chai';
import sinonChai from 'sinon-chai';
chaiUse(sinonChai);

const createSrc = (content: TemplateStringsArray) =>
  ts.createSourceFile('index.ts', content[0], ts.ScriptTarget.ESNext);
const setOf = <T>(...args: T[]): Set<T> => new Set(args);

describe('collectImports()', () => {
  it('should return a Set', () => {
    const src = createSrc``;
    expect(collectImports(src)).to.be.an.instanceOf(Set);
  });

  it('should parse default import', () => {
    const src = createSrc`import foo from "bar";`;
    expect(collectImports(src)).to.deep.equal(setOf('bar'));
  });

  it('should parse namespace import', () => {
    const src = createSrc`import * as foo from "bar";`;
    expect(collectImports(src)).to.deep.equal(setOf('bar'));
  });

  it('should parse named imports', () => {
    const src = createSrc`
  import {} from "bar1";
  import {foo} from "bar2";
  import {zzz, qqq} from "bar3";
  `;
    expect(collectImports(src)).to.deep.equal(setOf('bar1', 'bar2', 'bar3'));
  });

  it('should parse side-effect-only import', () => {
    const src = createSrc`import "@babel/polyfill";`;
    expect(collectImports(src)).to.deep.equal(setOf('@babel/polyfill'));
  });

  it('should parse dynamic import wtesth string ltesteral', () => {
    const src = createSrc`const foo = import("bar");`;
    expect(collectImports(src)).to.deep.equal(setOf('bar'));
  });

  it('should give a warning while parsing dynamic import expression', () => {
    const src = createSrc`const foo = import(bar);`;
    const fake = sinon.fake();
    sinon.replace(console, 'warn', fake);
    expect(collectImports(src)).to.deep.equal(setOf());
    expect(fake).to.have.been.calledOnce;
    sinon.restore();
  });
});
