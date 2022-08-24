import type { AWS } from '@serverless/typescript';

export const missingDirNameFn: NonNullable<AWS['functions']>[string] = {
  handler: './foo.bar',
};
