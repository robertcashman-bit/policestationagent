const nextConfig = require('eslint-config-next');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  ...nextConfig,
  {
    name: 'project-overrides',
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];

