import type { AWS } from '@serverless/typescript';

import { missingDirNameFn } from './functions/missingDirNameFn.fixture.test';

const missingDirNameService: AWS = {
  service: 'app',
  configValidationMode: 'error',
  plugins: ['../../index.ts'],
  provider: {
    name: 'aws',
  },
  functions: {
    missingDirNameFn,
  },
};

module.exports = missingDirNameService;
