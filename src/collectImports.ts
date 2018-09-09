import * as ts from 'typescript';

export function collectImports(src: ts.SourceFile) {
  const imports = new Set<string>();
  const walk = (node: ts.Node) => {
    if (ts.isImportDeclaration(node)) {
      // ES2015 import
      const moduleSpecifier = node.moduleSpecifier as ts.StringLiteral;
      imports.add(moduleSpecifier.text);
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      // Dynamic import()
      const moduleSpecifier = node.arguments[0];
      if (ts.isStringLiteral(moduleSpecifier)) {
        imports.add(moduleSpecifier.text);
      } else {
        console.warn('import() with expressions is not supported');
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(src);
  return imports;
}
