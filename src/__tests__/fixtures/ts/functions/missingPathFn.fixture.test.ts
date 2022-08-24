import type { AWS } from '@serverless/typescript';

import type { FnProperties } from '~/plugin';

export const missingPathFn: NonNullable<AWS['functions']>[string] &
  FnProperties = { dirName: __dirname };
