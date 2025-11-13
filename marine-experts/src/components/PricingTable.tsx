import React from 'react';

type Plan = { title: string; price: string; includes: string[] };
export default function PricingTable(props: { monthly: Plan; perCall: Plan }) {
  const [mode, setMode] = React.useState<'monthly' | 'perCall'>('perCall');

  return (
    <section id="pricing" className="container py-14">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-navy">Pricing & Engagement</h2>
        <div className="flex items-center gap-2" role="group" aria-label="Pricing mode">
          <button
            className={`px-3 py-1 rounded-lg border ${mode === 'perCall' ? 'bg-teal text-white border-teal' : 'border-sand text-navy'}`}
            onClick={() => setMode('perCall')}
            aria-pressed={mode === 'perCall'}
          >
            Per-Call
          </button>
          <button
            className={`px-3 py-1 rounded-lg border ${mode === 'monthly' ? 'bg-teal text-white border-teal' : 'border-sand text-navy'}`}
            onClick={() => setMode('monthly')}
            aria-pressed={mode === 'monthly'}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {[props.perCall, props.monthly].map((p, i) => {
          const active = (i === 0 && mode === 'perCall') || (i === 1 && mode === 'monthly');
          return (
            <article
              key={p.title}
              className={`rounded-2xl border p-6 ${active ? 'border-teal shadow-lg' : 'border-sand'}`}
            >
              <h3 className="text-lg font-semibold text-navy">{p.title}</h3>
              <p className="mt-1 text-2xl font-semibold text-navy">{p.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate">
                {p.includes.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden>✔️</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-cta={`pricing-${p.title}`}
                className="mt-6 inline-block px-4 py-2 rounded-lg bg-navy text-white"
              >
                Request a Quote
              </a>
            </article>
          );
        })}
      </div>

      {/* a11y note: radio buttons could be used; kept as buttons with aria-pressed for clarity */}
    </section>
  );
}
