import type { AWS } from '@serverless/typescript';

import type { CustomProperties } from '~/plugin';

export const validFn: NonNullable<AWS['functions']>[string] & CustomProperties =
  {
    dirName: __dirname,
    handler: './foo.bar',
  };