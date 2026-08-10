# PSR Train

[![CI](https://github.com/robertcashman-bit/pstrain-rebuild/actions/workflows/ci.yml/badge.svg)](https://github.com/robertcashman-bit/pstrain-rebuild/actions/workflows/ci.yml)

PSRAS preparation platform for police station representative candidates in England & Wales.

**Live site:** [psrtrain.com](https://psrtrain.com)

## Development

```bash
npm ci
npm run dev
```

## Tests

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

User-journey regression tests (login, mobile clicks, monthly checkout, Stephanie account checks):

```bash
npm run test:user-journey
```
