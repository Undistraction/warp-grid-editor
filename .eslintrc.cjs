// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2018,
    sourcetype: `module`,
  },

  settings: {
    files: [`*.ts`, `*.tsx`],
    'import/parsers': {
      '@typescript-eslint/parser': [`.ts`, `.tsx`, `js`, `jsx`],
    },
    'import/resolver': {
      node: true,
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  extends: [
    `eslint:recommended`,
    `plugin:import/recommended`,
    `plugin:react/recommended`,
    `plugin:react-hooks/recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],

  plugins: [
    `simple-import-sort`,
    `import`,
    `tailwind`,
    `react`,
    `react-hooks`,
    `@typescript-eslint`,
    `unused-imports`,
  ],

  ignorePatterns: [`**/coverage/*`, `/node_modules/*`, `/dist/`],

  rules: {
    // -------------------------------------------------------------------------
    // Generic
    // -------------------------------------------------------------------------
    quotes: [
      `error`,
      `backtick`,
      { avoidEscape: true, allowTemplateLiterals: true },
    ],

    // ---------------------------------------------------------------------
    // Unused imports
    // ---------------------------------------------------------------------

    '@typescript-eslint/no-unused-vars': `off`,
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

    // -------------------------------------------------------------------------
    // Imports
    // -------------------------------------------------------------------------

    'simple-import-sort/imports': `error`,
    'simple-import-sort/exports': `error`,

    // -------------------------------------------------------------------------
    // React
    // -------------------------------------------------------------------------

    // Allow object and array as proptypes
    'react/forbid-prop-types': [
      `error`,
      {
        forbid: [`any`],
      },
    ],

    // Configure file extensions that will be treated as containing jsx
    'react/jsx-filename-extension': [1, { extensions: [`.ts`, `.tsx`] }],

    // Disable buggy check of curly brackets (false positives)
    'react/jsx-curly-brace-presence': `off`,

    // Allow full fragment syntax as it's more readable
    'react/jsx-fragments': `off`,

    // Allow spreading (review this when time allows)
    'react/jsx-props-no-spreading': `off`,

    // Use function keyword instead of arrow function for non-anonymous
    // components
    'react/function-component-definition': `off`,

    // We don't use prop-types with TypeScript
    'react/prop-types': `off`,

    // We don't need to add an import for React with TypeScript
    'react/react-in-jsx-scope': `off`,
  },

  // Use vitest when running on files in the tests directory
  overrides: [
    // -------------------------------------------------------------------------
    // E2E tests
    // -------------------------------------------------------------------------
    {
      files: [`tests/ui/**/*.spec.js`],
      plugins: [`playwright`, `unused-imports`],
      extends: `plugin:playwright/recommended`,
    },
    // -------------------------------------------------------------------------
    // Unit tests
    // -------------------------------------------------------------------------
    {
      env: {
        'vitest/env': true,
      },
      files: [`tests/unit/**/*.unit.test.js`, `tests/unit/setup.js`],
      plugins: [`vitest`],
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
  ],
}
