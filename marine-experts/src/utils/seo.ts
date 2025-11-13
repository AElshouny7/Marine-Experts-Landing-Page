// src/utils/seo.ts
export function orgJsonLd() {
  const site =
    (typeof window !== 'undefined' && window.location?.origin) || 'https://marineexpertsuae.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Marine Experts',
    url: site,
    logo: `${site}/icons/logo.svg`,
    // sameAs: [
    //   'https://www.linkedin.com/company/marine-experts',
    //   'https://twitter.com/marine-experts',
    // ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contact@marine-experts.example.com',
        telephone: '+971-56-299-8451',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Arabic'],
      },
    ],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
