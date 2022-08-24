const defaultPresets = [
  ['@babel/preset-typescript', { allowNamespaces: true }],
];

module.exports = {
  env: {
    cjs: {
      presets: [['@babel/preset-env', { modules: 'cjs' }], ...defaultPresets],
    },
    esm: {
      presets: [['@babel/preset-env', { modules: false }], ...defaultPresets],
    },
  },
  ignore: [
    /.*\/(.*\.|)test\.tsx?/,
    /.*\/(.*\.|)test\.d\.tsx?/,
    /node_modules/,
    /dist/,
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx'],
        alias: { '~': './src' },
      },
    ],
    '@babel/plugin-transform-runtime',
  ],
};
