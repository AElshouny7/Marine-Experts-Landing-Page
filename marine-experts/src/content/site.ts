//TODO fill in real content where indicated

export const company = {
  name: 'Marine Experts',
  tagline: 'Operational excellence at sea & shore',
  description:
    'Trusted partner for port services, vessel support, inspections, and logistics. We mobilize fast, operate safely, and deliver on-time clearances across 180+ ports.',
  primaryCTAs: [
    { label: 'Request a Quote', href: '#contact', id: 'cta-quote' },
    { label: 'Talk to an Engineer', href: 'mailto:ops@marine-experts.example.com', id: 'cta-talk' },
  ],
  // secondaryCTA: { label: 'Download Capabilities Deck (PDF)', href: '/deck.pdf', id: 'cta-deck' },
};

export const trustBadges = [
  { alt: 'ISM Code', src: '/icons/ism-code.svg' },
  { alt: 'ISO 9001', src: '/icons/iso-9001.svg' },
  { alt: 'ISO 14001', src: '/icons/iso-14001.svg' },
];

export const logoCloud = {
  title: 'Trusted by leading owners, operators, and terminals',
  logos: Array.from({ length: 8 }).map((_, i) => ({
    alt: `Client ${i + 1}`,
    src: '/images/logo-placeholder.svg',
  })),
};

export const services = [
  {
    title: 'Port Agency',
    description:
      'End-to-end husbandry and clearance: pre-arrival coordination, berth planning, documentation, and turnarounds.',
    icon: '🛳️',
  },
  {
    title: 'Technical Support',
    description:
      'Riding squads and OEM-backed technicians for onboard repairs, troubleshooting, and preventive maintenance.',
    icon: '🛠️',
  },
  {
    title: 'Class & Flag Inspections',
    description:
      'Certified surveyors for class, flag, PSC prep, and condition assessments with actionable reports.',
    icon: '📋',
  },
  {
    title: 'Crew & Provisions',
    description:
      'Visas, meet & assist, launches, bonded stores, catering, and medicals with 24/7 coordination.',
    icon: '👩‍✈️',
  },
  {
    title: 'Spare Parts Logistics',
    description:
      'Door-to-deck logistics with customs handling, last-mile to gangway, and reverse logistics.',
    icon: '📦',
  },
  {
    title: 'Drydock Coordination',
    description:
      'Specification, yard interface, HSE compliance, and daily progress tracking to control scope and cost.',
    icon: '⚙️',
  },
];

export const how = {
  steps: [
    { title: 'Scope', text: 'Define objectives, HSE constraints, and documentation required.' },
    { title: 'Mobilize', text: 'Secure permits, line up vendors, and stage equipment & crew.' },
    {
      title: 'Execute & Report',
      text: 'Operate to plan, monitor KPIs, and issue verified close-out.',
    },
  ],
  callouts: [
    'Safety-first: ISM & ISO-aligned procedures',
    'Regulatory diligence: class/flag & port compliance',
    'Transparent communications: live updates & reports',
  ],
};

export const differentiators = [
  '24/7 operations desk',
  'Global vendor network',
  'Certified inspectors & surveyors',
  'Rapid mobilization SLAs',
];

export const metrics = [
  { label: 'Projects served', value: '50+' },
  { label: 'On-time solutions delivery', value: '98.7%' },
  { label: 'Ports coverage', value: '25+' },
];

export const pricing = {
  monthly: {
    title: 'Monthly Support',
    price: '$2,900/mo',
    includes: [
      'Priority desk access',
      'Up to 12 clearances',
      'Regulatory monitoring',
      'Monthly report',
    ],
  },
  perCall: {
    title: 'Per-Call',
    price: 'From $350/call',
    includes: [
      'Pre-arrival coordination',
      'Documentation & permits',
      'Husbandry services',
      'Post-call report',
    ],
  },
};

export const cases = [
  {
    title: 'Rapid PSC Readiness – Tanker',
    text: 'Mobilized surveyor and riding squad within 6h; cleared findings and achieved on-time departure.',
    result: '0 detentions | 18h port stay',
  },
  {
    title: 'Critical Spare to Anchorage – Bulk Carrier',
    text: 'Door-to-deck in 36h across two borders with bonded courier & launch coordination.',
    result: 'ETA preserved | No laytime impact',
  },
];

export const faqs = [
  {
    q: 'Which ports do you cover?',
    a: 'We serve 180+ ports regionally and expand via partner agents. Share your voyage plan; we confirm coverage along your route.',
  },
  {
    q: 'Can you support emergency turnarounds?',
    a: 'Yes—our 24/7 desk escalates to rapid mobilization with predefined HSE and regulatory checks.',
  },
  {
    q: 'What SLAs do you offer?',
    a: 'Standard SLAs include response <15 min and mobilization windows by service type; bespoke SLAs available.',
  },
  {
    q: 'Are your inspectors certified?',
    a: 'Yes—class/flag recognized inspectors with verifiable credentials and calibration records.',
  },
];

export const contact = {
  contactEmail: 'contact@marineexpertsuae.com',

  phone: '+971-56-299-8451',
  offices: [{ city: 'Dubai', country: 'UAE' }],
  address: {
    maps: 'https://maps.app.goo.gl/fyhX7o21pT8rzD486',
    text: 'Al Hulaila FZ, Al Hulaila Industrial Free Zone - Ras Al Khaimah, UAE',
  },
};
