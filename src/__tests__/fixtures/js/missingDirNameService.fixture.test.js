const {
  missingDirNameFn,
} = require('./functions/missingDirNameFn.fixture.test');

const missingDirNameService = {
  service: 'app',
  configValidationMode: 'error',
  plugins: ['../../../index.ts'],
  provider: {
    name: 'aws',
  },
  functions: {
    missingDirNameFn,
  },
};

module.exports = missingDirNameService;
