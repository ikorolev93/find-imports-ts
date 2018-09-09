# find-imports-ts

A tool to get all imports in your code. Inspired by [find-imports](https://npmjs.com/package/find-imports), powered by TypeScript.

## Usage

### CLI

```bash
$ npx find-imports-ts src/*.ts
./collectImports
typescript
fs
sinon
chai
sinon-chai
```

### API

```js
const { findImports, findImportsSync } = require('find-imports-ts');
findImports('index.ts'); // Promise<Set<string>>
findImportsSync('index.ts'); // Set<string>, uses fs.*Sync API
```
