<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

# Sls-relative-paths

When defining a Serverless Framework configuration file in TS or JS rather than YAML or JSON (which I highly recommend), it's quite common to import functions configurations from folders that are close to their handlers, as it helps keeping the configuration file light, even when the number of functions in the service grows.

```typescript
// serverless.ts(|js)
import { myFunction } from 'functions/myFunction/config.ts|js';
import { anotherFunction } from 'functions/anotherFunction/config.ts|js';

module.exports = {
  service: 'my-service',
  functions: {
    myFunction,
    anotherFunction,
    ...
  },
  // ...
};
```

Meanwhile, the functions configurations are still required to explicitely specify the paths of their handlers relative to the configuration file.

```typescript
// functions/myFunction/handler.ts(|js)
export const main = ... // function code

// functions/myFunction/config.ts(|js)
export const myFunction = {
  handler: 'functions/myFunction/handler.main', // Wait... but that's where I am 😭
  ...
};
```

This is a code duplication that can annoy developers, and frequently cause bugs (typically when moving code around or copy/pasting functions).

That's when `sls-relative-paths` comes to the rescue 💪 It allows you to define your handlers paths **relatively** to their configurations:

```typescript
// serverless.ts(|js)
import { myFunction } from 'functions/myFunction/config.ts';

module.exports = {
  service: 'my-service',
  plugins: ['sls-relative-paths'], // 👈 add plugin
  functions: {
    myFunction,
    ...
  },
  ...
};

// functions/myFunction/config.ts(|js)
export const myFunction = {
  dirName: __dirname, // 👈 dirname is required to re-construct the complete path
  handler: './handler.main', // 🎉 relative path will work!
  ...
};
```

## Installation

```bash
# npm
npm install --save-dev sls-relative-paths

# yarn
yarn add --dev sls-relative-paths
```

## Other exports

### `CustomProperties` type

In TS, you can use this type to type your function configuration.

```typescript
import type { CustomProperties } from 'sls-relative-path';
import type { AWS } from '@serverless/typescript';

type FnConfig = NonNullable<AWS['functions']>[string] & CustomProperties;

// functions/myFunction/config.ts(|js)
export const myFunction: FnConfig = {
  dirName: undefined, // ❌ dirName is required
  handler: './handler.main',
  ...
};
```
