import type { AWS } from '@serverless/typescript';

import type { FnProperties } from '~/plugin';

export const otherValidFn: NonNullable<AWS['functions']>[string] &
  FnProperties = {
  dirName: __dirname,
  handler: './foo.baz',
};
