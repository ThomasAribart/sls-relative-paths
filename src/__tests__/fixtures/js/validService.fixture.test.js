const {
  otherValidFn,
} = require('./functions/otherValidFn/otherValidFn.fixture.test');
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
    otherValidFn,
  },
};

module.exports = validService;
