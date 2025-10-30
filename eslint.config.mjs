import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactNative from 'eslint-plugin-react-native'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import neostandard from 'neostandard'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['*.jsx', '*.tsx'],
    plugins: {
      react,
      'react-native': reactNative,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
    },
  },
  ...neostandard({}),
  {
    rules: {
      eqeqeq: ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: {
        __DEV__: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    ignores: ['dist/*', 'scripts/**/*.js'],
  },
]
