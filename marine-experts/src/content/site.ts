//TODO fill in real content where indicated

export const company = {
  name: 'Marine Experts',
  tagline: 'Complete offshore and quayside solutions',
  description:
    'Marine Experts has been supporting complex oil & gas projects for more than 20 years, delivering reliable marine operations across ports, terminals, and offshore fields. From quayside load-in/load-out to crew logistics, provisions, certified manpower, offshore QC, and seafastening, we ensure every operation is executed safely, efficiently, and in full compliance with international standards. Our team combines deep operational experience with a safety-first mindset, enabling us to mobilize quickly, reduce downtime, and support our clients with end-to-end, 24/7 coordination',
  primaryCTAs: [
    { label: 'Contact Us', href: '#contact', id: 'cta-quote' },
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
  logos: [
    { alt: 'BP', src: '/logos/BP.svg' },
    { alt: 'ADNOC', src: '/logos/adnoc.svg' },
    { alt: 'Saudi Aramco', src: '/logos/aramco.svg' },
    { alt: 'North Oil Company', src: '/logos/noc.svg' },
    { alt: 'Lamprell', src: '/logos/Lamprell.svg' },
    { alt: 'GUPCO', src: '/logos/GUPCO.svg' },
    { alt: 'TotalEnergies', src: '/logos/logo_totalenergies.svg' },
  ],
};

export const services = [
  {
    title: 'Quayside Activities (Load-in / Load-out)',
    icon: '🛳️',
    description:
      'Heavy-lift coordination, rigging plans, stevedoring, and shore-side logistics for safe, efficient load-ins and load-outs.',
  },
  {
    title: 'Crew Changes',
    icon: '👨‍✈️',
    description:
      'End-to-end visas, meet & assist, launch/transport, medicals, and crew rotations aligned with port schedules.',
  },
  {
    title: 'Provisions Supply',
    icon: '🍱',
    description:
      'Fresh, bonded, and specialty stores with cold-chain assurance, QA checks, and just-in-time quayside delivery.',
  },
  {
    title: 'Manpower Supply',
    icon: '👷‍♂️',
    description:
      'Certified technicians, riggers, welders, blasters, and riding squads for on-board and quayside operations.',
  },
  {
    title: 'Cargo Barges & Vessels Chartering',
    icon: '🎯',
    description:
      'Flexible chartering solutions for cargo barges, supply vessels, and specialized marine units—supporting offshore campaigns, project cargo transport, and coastal operations with reliable availability and competitive day rates.',
  },
  {
    title: 'Seafastening',
    icon: '⚓',
    description:
      'Design, fabrication, and installation of seafastening solutions with calculations, weld maps, and as-built documentation.',
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
  '97% on-time completion rate across marine and offshore operations',
  'Comprehensive service offering delivered with confidence and 24/7 support',
  'Target-oriented teams committed to meeting strict project deadlines',
  'Proven excellence in marine services backed by 20+ years of experience',
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
    title: 'Last-Minute Cargo Barge Preparation – 24h Turnaround',
    text: 'Received a late call for barge readiness and completed full cargo barge preparation, documentation, and checks within 24 hours.',
    result: 'Barge mobilized on schedule | No delay to load-out window',
  },
  {
    title: 'Seafastening Manpower & Equipment – Full Deck Clearance in 24h',
    text: 'Deployed seafastening team and equipment on short notice to complete full deck clearance and securing operations within 24 hours.',
    result: 'Vessel sailed as planned | No demurrage or laytime impact',
  },
];

export const faqs = [
  {
    q: 'Which ports do you cover?',
    a: 'All GCC Countries.',
  },
  {
    q: 'How many projects covered?',
    a: '145+ projects.',
  },
  {
    q: 'How many cargo barges previously prepared?',
    a: '200+ trips.',
  },
  {
    q: 'What are your type of services offered?',
    a: 'Mechanical readiness of cargo, barges material supply, manpower arrangements',
  },
];

export const contact = {
  contactEmail: 'info@marineexpertsuae.com',

  phone: '+971-56-299-8451',
  offices: [{ city: 'Dubai', country: 'UAE' }],
  address: {
    maps: 'https://maps.app.goo.gl/fyhX7o21pT8rzD486',
    text: 'Al Hulaila FZ, Al Hulaila Industrial Free Zone - Ras Al Khaimah, UAE',
  },
};
