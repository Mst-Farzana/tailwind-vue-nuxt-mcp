// eslint.config.js
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/ban-types': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(selectItem|selectSubItem|db|event)$',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
