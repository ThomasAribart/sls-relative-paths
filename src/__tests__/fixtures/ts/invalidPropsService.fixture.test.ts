import type { AWS } from '@serverless/typescript';

import type { ServiceProperties } from '~/plugin';

import { missingPathFn } from './functions/missingPathFn.fixture.test';
import { validFn } from './functions/validFn.fixture.test';

const invalidPropsService: AWS & ServiceProperties = {
  service: 'app',
  configValidationMode: 'error',
  plugins: ['../../../index.ts'],
  provider: {
    name: 'aws',
  },
  functions: {
    validFn,
    missingPathFn,
  },
  relativePaths: {
    // @ts-expect-error default should be a string
    default: ['foo', 'bar'],
  },
};

module.exports = invalidPropsService;
