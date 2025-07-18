import { defineConfig } from 'eslint/config';

export default defineConfig({
  globals: {
    process: 'readonly',
    __dirname: 'readonly', // Adicionando __dirname como variável global
  },
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['react', 'react-hooks'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
    },
  ],
});
