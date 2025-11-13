import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get('title') ?? 'Marine Experts';
  const subtitle = url.searchParams.get('subtitle') ?? 'Operational excellence at sea & shore';

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0B1F3A"/>
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="#1E3A8A"/>
  <text x="80" y="300" font-size="64" fill="#11A6A6" font-family="Inter, Arial" font-weight="700">${title}</text>
  <text x="80" y="380" font-size="32" fill="#E6E0D4" font-family="Inter, Arial">${subtitle}</text>
</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
