import js from '@eslint/js';
import prettierPlugin from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  {
    rules: {
      semi: ['warn', 'always'],
      'no-unused-vars': 'error',
      camelcase: 'error',
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
];
