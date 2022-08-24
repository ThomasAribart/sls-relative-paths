const { missingPathFn } = require('./functions/missingPathFn.fixture.test');
const { validFn } = require('./functions/validFn.fixture.test');

const invalidPropsService = {
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
