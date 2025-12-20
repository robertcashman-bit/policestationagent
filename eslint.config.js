const nextConfig = require('eslint-config-next');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  ...nextConfig,
  // Project-level ignores (generated content + helper scripts)
  {
    ignores: [
      'scripts/**',
      'legacy/**',
      'data/**',
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
    ],
  },
  {
    name: 'project-overrides',
    rules: {
      'react/no-unescaped-entities': 'off',
      // This repo uses useEffect for client-only localStorage reads (cookie banner, etc.)
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

