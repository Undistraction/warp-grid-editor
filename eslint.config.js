import js from '@eslint/js'
import playwright from 'eslint-plugin-playwright'
import globals from 'globals'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default [
  js.configs.recommended,
  {
    name: 'demo/all',
    languageOptions: {
      sourceType: `module`,
      globals: {
        ...globals.browser,
      },
    },
    files: [`**/*.js`],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
    // plugins: { tailwind },
  },
  // Rules for only test files
  {
    name: 'demo/tests',
    files: ['tests/**.js'],
    ...playwright.configs['flat/recommended'],
  },
]
