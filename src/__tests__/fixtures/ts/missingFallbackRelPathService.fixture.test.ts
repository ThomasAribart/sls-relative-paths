import type { AWS } from '@serverless/typescript';

import type { ServiceProperties } from '~/plugin';

import { missingPathFn } from './functions/missingPathFn.fixture.test';

const invalidPropsService: AWS & ServiceProperties = {
  service: 'app',
  configValidationMode: 'error',
  plugins: ['../../../index.ts'],
  provider: {
    name: 'aws',
  },
  functions: {
    missingPathFn,
  },
};

module.exports = invalidPropsService;
