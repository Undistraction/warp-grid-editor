// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = {
  globals: {
    vi: true,
  },

  env: {
    browser: true,
    es6: true,
    node: true,
    'vitest/env': true,
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
  },

  settings: {
    'import/extensions': [`.js`, `.jsx`, `.cjs`, `.mjs`],
    react: {
      version: `18`,
    },
  },

  extends: [
    `eslint:recommended`,
    `plugin:import/recommended`,
    `plugin:react/recommended`,
    `plugin:react-hooks/recommended`,
  ],

  plugins: [`simple-import-sort`, `import`, `tailwind`, `react`, `react-hooks`],

  ignorePatterns: [`**/coverage/*`, `/node_modules/*`, `/dist/`],

  rules: {
    // -------------------------------------------------------------------------
    // Import
    // Many rules are included in eslint-config-airbnb, so these are just
    // tweaks.
    // -------------------------------------------------------------------------

    'import/no-extraneous-dependencies': `off`,
    // TODO: Enable this and fix errors
    // 'import/exports-last': `error`,
    'import/no-unassigned-import': `error`,
    'import/no-unused-modules': `off`,
    // Don't allow /index in imports
    'import/no-useless-path-segments': [`error`, { noUselessIndex: true }],

    // -------------------------------------------------------------------------
    // General Syntax rules
    // Many rules are included in eslint-config-airbnb, so these are just
    // tweaks.
    // -------------------------------------------------------------------------

    'simple-import-sort/imports': `error`,
    'simple-import-sort/exports': `error`,
    'func-names': [`error`, `never`],
    'no-param-reassign': `off`,
    'no-confusing-arrow': `off`,
    // Use backticks instead of quotes
    quotes: [
      `error`,
      `backtick`,
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'valid-jsdoc': `error`,
    'no-restricted-syntax': [`error`, `LabeledStatement`, `WithStatement`],
    'no-unused-expressions': [`error`, { allowTaggedTemplates: true }],
    // Only flag unused params if no used params follow
    'no-unused-vars': [`error`, { args: `after-used` }],

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
    'react/jsx-filename-extension': [1, { extensions: [`.js`, `.jsx`] }],

    // Disable buggy check of curly brackets (false positives)
    'react/jsx-curly-brace-presence': `off`,

    // Allow full fragment syntax as it's more readable
    'react/jsx-fragments': `off`,

    // Allow spreading (review this when time allows)
    'react/jsx-props-no-spreading': `off`,

    // Use function keyword instead of arrow function for non-anonymous
    // components
    'react/function-component-definition': `off`,

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
    'vitest/no-commented-out-tests': `error`,
    'vitest/no-disabled-tests': `error`,
    'vitest/no-duplicate-hooks': `error`,
    'vitest/no-focused-tests': `error`,
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

  overrides: [
    {
      files: [`tests/**/*.js`],
      plugins: [`vitest`],
    },
  ],
}
