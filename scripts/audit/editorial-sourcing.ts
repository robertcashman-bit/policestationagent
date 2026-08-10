/**
 * Runs editorial sourcing + prohibited-copy rules on guide, legal-advice, and marketing audit units.
 * Run: npm run audit:editorial-sourcing
 */
import { scanUnitRules } from '../../lib/editorial-audit/rules';
import { buildAllAuditUnits, loadUnitText } from '../../lib/editorial-audit/units';

const TEXT_UNIT_KINDS = new Set([
  'guide-summary',
  'guide-section',
  'guide-faq',
  'legal-advice',
  'marketing-page',
]);

function main() {
  const units = buildAllAuditUnits().filter((u) => TEXT_UNIT_KINDS.has(u.kind));
  const failures: string[] = [];

  for (const unit of units) {
    const loaded = loadUnitText(unit);
    const findings = scanUnitRules(loaded);
    for (const f of findings) {
      if (f.category === 'prohibited-copy' && f.severity === 'fail') {
        failures.push(`${unit.id}: ${f.message}`);
      }
      if (f.category === 'sourcing') {
        failures.push(`${unit.id}: ${f.message}`);
      }
    }
  }

  if (failures.length) {
    console.error('Editorial sourcing audit failed:\n' + failures.join('\n'));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, unitsChecked: units.length }));
}

main();
