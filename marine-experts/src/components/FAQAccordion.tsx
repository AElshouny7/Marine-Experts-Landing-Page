import React from 'react';

type FAQ = { q: string; a: string };

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faqs" className="container py-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-navy">FAQs</h2>
      <div className="mt-6 divide-y border border-sand rounded-2xl">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                className="w-full text-left px-4 py-4 flex justify-between items-center"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-medium text-navy">{f.q}</span>
                <span aria-hidden>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="px-4 pb-4 text-sm text-slate">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
