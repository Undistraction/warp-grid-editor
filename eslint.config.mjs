import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import vitestPlugin from '@vitest/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import playwrightPlugin from 'eslint-plugin-playwright'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import reactPlugin from 'eslint-plugin-react'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat[`jsx-runtime`],
  ...tailwindPlugin.configs[`flat/recommended`],
  eslintPluginPrettierRecommended,
  // Global ignores
  {
    ignores: [`coverage/*`, `node_modules/*`, `dist/*`, `docs/*`],
  },
  // Default config
  {
    files: [`**/*.{ts,tsx,mjs,cjs,js}`],
    linterOptions: {
      reportUnusedDisableDirectives: `error`,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: 2020,
      sourceType: `module`,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      react: reactPlugin,
    },
    rules: {
      // Generic
      quotes: [
        `error`,
        `backtick`,
        { avoidEscape: true, allowTemplateLiterals: true },
      ],

      // Recommended to disable on TypeScript projects. See:
      // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': `off`,

      // Unused imports

      'unused-imports/no-unused-imports': `error`,
      'unused-imports/no-unused-vars': [
        `error`,
        {
          vars: `all`,
          varsIgnorePattern: `^_`,
          args: `after-used`,
          argsIgnorePattern: `^_`,
        },
      ],

      // Tailwind

      'tailwindcss/no-custom-classname': [
        `error`,
        {
          // Allow these custom classnames
          whitelist: [`corner-handle`, `shape-handle`, `control-point-handle`],
        },
      ],

      // React

      // Don't allow arrow functions for components because their name cannot be
      // inferred.
      'react/function-component-definition': [
        `error`,
        {
          namedComponents: `function-declaration`,
          unnamedComponents: `arrow-function`,
        },
      ],

      // Allow object and array as proptypes
      'react/forbid-prop-types': [
        `error`,
        {
          forbid: [`any`],
        },
      ],

      // Configure file extensions that will be treated as containing jsx
      'react/jsx-filename-extension': [1, { extensions: [`.ts`, `.tsx`] }],

      // Allow full fragment syntax as it's more readable
      'react/jsx-fragments': `off`,

      // We don't use prop-types with TypeScript
      'react/prop-types': `off`,

      // We don't need to add an import for React with TypeScript
      'react/react-in-jsx-scope': `off`,
    },
  },
  // Unit test config
  {
    files: [`tests/unit/**/*.unit.test.js`, `tests/unit/setup.js`],
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      'vitest/consistent-test-filename': [
        `error`,
        {
          pattern: `.*\\.unit\\.test\\.[tj]s?$`,
        },
      ],
      'vitest/consistent-test-it': [
        `error`,
        {
          fn: `it`,
        },
      ],
      'vitest/expect-expect': `error`,
      'vitest/no-commented-out-tests': `warn`,
      'vitest/no-disabled-tests': `warn`,
      'vitest/no-duplicate-hooks': `error`,
      'vitest/no-focused-tests': `warn`,
      'vitest/no-identical-title': `error`,
      'vitest/no-standalone-expect': `error`,
      'vitest/no-test-return-statement': `error`,
      'vitest/prefer-called-with': `error`,
      'vitest/prefer-comparison-matcher': `error`,
      'vitest/prefer-each': `error`,
      'vitest/prefer-equality-matcher': `error`,
      'vitest/prefer-hooks-in-order': `error`,
      'vitest/prefer-hooks-on-top': `error`,
      'vitest/prefer-lowercase-title': `error`,
      'vitest/prefer-mock-promise-shorthand': `error`,
      'vitest/prefer-spy-on': `error`,
      'vitest/prefer-to-be-object': `error`,
      'vitest/prefer-to-be': `error`,
      'vitest/prefer-to-contain': `error`,
      'vitest/prefer-to-have-length': `error`,
      'vitest/require-to-throw-message': `error`,
      'vitest/valid-describe-callback': `error`,
      'vitest/valid-expect': `error`,
      'vitest/valid-title': `error`,
    },
  },
  // E2E config
  {
    ...playwrightPlugin.configs[`flat/recommended`],
    files: [`tests/ui/**/*.spec.js`],
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      ...playwrightPlugin.configs[`flat/recommended`].rules,
      'playwright/expect-expect': [
        `error`,
        {
          assertFunctionNames: [
            `assertCornerNodesAreVisible`,
            `assertCornerNodesAreHidden`,
          ],
        },
      ],
    },
  }
)
