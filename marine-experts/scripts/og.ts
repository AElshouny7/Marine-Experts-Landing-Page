// Run with: ts-node scripts/og.ts  (or node --loader ts-node/esm scripts/og.ts)
import { writeFileSync } from 'node:fs';
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0B1F3A"/>
  <text x="60" y="340" font-size="72" fill="#11A6A6" font-family="Inter, Arial" font-weight="700">Marine Experts</text>
</svg>`;
writeFileSync('public/og-fallback.svg', svg, 'utf8');
console.log('Wrote public/og-fallback.svg');
