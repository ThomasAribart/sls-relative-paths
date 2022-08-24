const { missingPathFn } = require('./functions/missingPathFn.fixture.test');

const invalidPropsService = {
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
