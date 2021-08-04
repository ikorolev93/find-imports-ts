import * as sinon from 'sinon';
import * as ci from './collectImports';
import * as ts from 'typescript';
import { expect, use as chaiUse } from 'chai';
import sinonChai from 'sinon-chai';
import { findImports, findImportsSync } from './findImports';
chaiUse(sinonChai);

afterEach(() => {
  sinon.restore();
});

const EMPTY_SET = new Set();
describe('findImportsSync()', () => {
  it('opens a file and passes it to collectImports()', () => {
    const fake = sinon.fake.returns(EMPTY_SET);
    sinon.replace(ci, 'collectImports', fake);
    expect(findImportsSync(__filename)).to.be.equal(EMPTY_SET);
    expect(fake).to.have.been.calledOnce;
    const srcFile = fake.firstCall.args[0] as ts.SourceFile;
    expect(srcFile).to.have.property('kind', ts.SyntaxKind.SourceFile);
    expect(srcFile.fileName).to.be.equal(__filename);
  });
});

describe('findImports()', () => {
  it('opens a file and passes it to collectImports()', async () => {
    const fake = sinon.fake.returns(EMPTY_SET);
    sinon.replace(ci, 'collectImports', fake);
    expect(await findImports(__filename)).to.be.equal(EMPTY_SET);
    expect(fake).to.have.been.calledOnce;
    const srcFile = fake.firstCall.args[0] as ts.SourceFile;
    expect(srcFile).to.have.property('kind', ts.SyntaxKind.SourceFile);
    expect(srcFile.fileName).to.be.equal(__filename);
  });
});
