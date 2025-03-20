import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    env: {
      es2024: true,
      node: true,
    },
    rules: {
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'import/no-unresolved': 'off',
    },
  },
  pluginJs.configs.recommended,
];
