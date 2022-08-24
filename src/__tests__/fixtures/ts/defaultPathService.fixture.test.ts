import type { AWS } from '@serverless/typescript';

import type { ServiceProperties } from '~/plugin';

import { missingPathFn } from './functions/missingPathFn.fixture.test';
import { validFn } from './functions/validFn.fixture.test';

const validService: AWS & ServiceProperties = {
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
    default: 'wiz.biz',
  },
};

module.exports = validService;
