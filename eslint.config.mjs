import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'next-env.d.ts',
      'scripts/_generated_*',
      '**/*.sql',
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // Cosmetic only; literal quotes/apostrophes in JSX text render fine and are
      // pervasive in existing copy. Disabling avoids 50+ no-op churn edits.
      'react/no-unescaped-entities': 'off',
      // New strict react-hooks rules (Next 16 / plugin v7) flag established,
      // working mount-time patterns. Surface as warnings instead of failing the
      // build; refactoring these is behaviour-risky and out of scope here.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];

export default eslintConfig;
