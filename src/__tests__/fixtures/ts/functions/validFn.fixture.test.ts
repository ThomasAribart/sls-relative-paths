import type { AWS } from '@serverless/typescript';

import type { FnProperties } from '~/plugin';

export const validFn: NonNullable<AWS['functions']>[string] & FnProperties = {
  dirName: __dirname,
  handler: './foo.bar',
};
