const nextConfig = require("eslint-config-next");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  ...nextConfig,
  // Project-level ignores (generated content + helper scripts)
  {
    ignores: [
      "scripts/**",
      "legacy/**",
      "data/**",
      ".next/**",
      ".vercel/**",
      "out/**",
      "build/**",
      "node_modules/**",
    ],
  },
  {
    name: "project-overrides",
    rules: {
      "react/no-unescaped-entities": "off",
      // This repo uses useEffect for client-only localStorage reads (cookie banner, etc.)
      "react-hooks/set-state-in-effect": "off",
      // React Compiler correctness rules (new in eslint-config-next 16). The
      // existing codebase predates them; left as warnings so they surface for
      // gradual adoption without failing CI on the Next 16 baseline.
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
    },
  },
];
