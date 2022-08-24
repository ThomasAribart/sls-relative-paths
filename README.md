# ✨ DRYer Serverless configuration

When defining a Serverless Framework configuration file in TS or JS, it's common to import functions configurations from the same folders as their handlers.

It helps keeping the config file light, even when the number of functions grows:

```typescript
// serverless.ts(|js)
import { myFunction } from 'functions/myFunction/config.ts(|js)';
import { anotherFunction } from 'functions/anotherFunction/config.ts(|js)';

module.exports = {
  service: 'my-service',
  functions: {
    myFunction,
    anotherFunction,
    ...
  },
  ...
};
```

However, those handlers paths **still need to be provided**:

```typescript
// functions/myFunction/handler.ts(|js)
export const main = ... // function code

// functions/myFunction/config.ts(|js)
export const myFunction = {
  // 👇 Still needed
  handler: 'functions/myFunction/handler.main', // Wait... but that's where I am 😭
  ...
};
```

This is a code duplication that can annoy developers, and frequently cause bugs (typically when moving code around or copy/pasting functions).

That's when `sls-relative-paths` comes to the rescue 💪

## Sls-relative-paths

The `sls-relative-paths` plugin allows you to define your handlers paths **relatively** to their configurations:

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

In TS, you can assign this type to your functions configurations:

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

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>
