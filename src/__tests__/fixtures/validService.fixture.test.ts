import type { AWS } from '@serverless/typescript';

import { otherValidFn } from './functions/otherValidFn/otherValidFn.fixture.test';
import { validFn } from './functions/validFn.fixture.test';

const validService: AWS = {
  service: 'app',
  configValidationMode: 'error',
  plugins: ['../../index.ts'],
  provider: {
    name: 'aws',
  },
  functions: {
    validFn,
    otherValidFn,
  },
};

module.exports = validService;
