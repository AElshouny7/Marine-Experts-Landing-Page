// src/utils/seo.ts

export function orgJsonLd(site: string) {
  const canonical = site || 'https://marineexpertsuae.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${canonical}#organization`,
    name: 'Marine Experts',
    url: canonical,
    logo: `${canonical}/icons/logo-navy.svg`,
    // Fill these in when you have profiles
    // sameAs: [
    //   'https://www.linkedin.com/company/marine-experts',
    //   'https://www.facebook.com/…',
    // ],

    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'info@marineexpertsuae.com',
        telephone: '+971-56-299-8451',
        areaServed: 'AE',
        availableLanguage: ['English', 'Arabic'],
      },
    ],

    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressLocality: 'Dubai',
      // Put real data if you want, or keep this generic:
      // streetAddress: '...',
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[], site: string) {
  const canonical = site || 'https://marineexpertsuae.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonical}#faqs`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}
