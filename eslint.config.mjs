import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

// prettier requirement
const prettier = {
  config: eslintConfigPrettier,
  plugin: eslintPluginPrettier,
};

export default defineConfig([
  prettier.config,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: prettier.plugin },
    extends: ['js/recommended'],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
]);
