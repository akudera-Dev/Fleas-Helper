// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt({
  files: ['**/*.ts', '**/*.vue', '**/*.js', '**/*.mjs'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}).append(eslintConfigPrettier);
