const { missingPathFn } = require('./functions/missingPathFn.fixture.test');
const { validFn } = require('./functions/validFn.fixture.test');

const validService = {
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
