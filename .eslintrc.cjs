// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
    'jest/globals': true,
  },

  parserOptions: {
    ecmaVersion: 2024,
    sourceType: `module`,
  },

  settings: {
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

  plugins: [`tailwind`, `import`, `react`, `react-hooks`],

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
  },

  overrides: [
    {
      files: [`tests/**/*.js`],
      plugins: [`jest`],
      extends: [`plugin:jest/recommended`],
    },
  ],
}
