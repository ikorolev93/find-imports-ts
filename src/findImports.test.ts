import * as sinon from 'sinon';
import * as ci from './collectImports';
import * as ts from 'typescript';
import { expect, use as chaiUse } from 'chai';
import sinonChai from 'sinon-chai';
import { findImports } from './findImports';
chaiUse(sinonChai);

afterEach(() => {
  sinon.restore();
});

describe('findImports()', () => {
  it('opens a file and passes it to collectImports()', () => {
    const fake = sinon.fake.returns(new Set());
    sinon.replace(ci, 'collectImports', fake);
    expect(findImports(__filename)).to.be.deep.equal(new Set());
    expect(fake).to.have.been.calledOnce;
    const srcFile = fake.firstCall.args[0] as ts.SourceFile;
    expect(srcFile).to.have.property('kind', ts.SyntaxKind.SourceFile);
    expect(srcFile.fileName).to.be.equal(__filename);
  });
});
