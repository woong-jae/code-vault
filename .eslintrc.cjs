/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['**/*.@(spec|test).@(js|ts)?(x)'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest-dom/recommended'],
      env: {
        'jest/globals': true,
        node: true,
      },
    },
  ],
};
