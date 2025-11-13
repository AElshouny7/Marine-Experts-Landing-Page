import React from 'react';

type Props = {
  siteKey?: string;
};

export default function ContactForm({ siteKey }: Props) {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'error'>('idle');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  // Load hCaptcha script only if siteKey exists
  React.useEffect(() => {
    if (!siteKey) return;
    if (document.querySelector('script[src^="https://js.hcaptcha.com/1/api.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://js.hcaptcha.com/1/api.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, [siteKey]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const fd = new FormData(formRef.current!);
    const data = Object.fromEntries(fd.entries());
    // Simple client checks (server has final say)
    if (!String(data.email).includes('@')) {
      setStatus('error');
      setErrors((p) => ({ ...p, email: 'Enter a valid email.' }));
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = '/thanks';
      return;
    }
    const { errors: serverErrors, message } = await res.json().catch(() => ({}));
    setErrors(serverErrors ?? {});
    setStatus('error');
    if (message) console.error(message);
  }

  return (
    <section id="contact" className="container py-14">
      <h2 className="text-2xl md:text-3xl font-semibold text-navy">Contact</h2>
      {/* <p className="mt-2 text-sm text-slate">Request a quote or speak to an engineer.</p> */}

      <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy">
            Name
            <input
              name="name"
              required
              className="mt-1 w-full border border-sand rounded-lg px-3 py-2"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy">
            Company
            <input name="company" className="mt-1 w-full border border-sand rounded-lg px-3 py-2" />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full border border-sand rounded-lg px-3 py-2"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy">
            Phone
            <input name="phone" className="mt-1 w-full border border-sand rounded-lg px-3 py-2" />
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-navy">
            Message
            <textarea
              name="message"
              rows={5}
              required
              className="mt-1 w-full border border-sand rounded-lg px-3 py-2"
            />
          </label>
        </div>

        {siteKey && (
          <div className="md:col-span-2">
            <div className="h-captcha" data-sitekey={siteKey}></div>
          </div>
        )}

        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            data-cta="contact-submit"
            disabled={status === 'submitting'}
            className="px-5 py-3 rounded-xl bg-teal text-white font-medium disabled:opacity-60"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit'}
          </button>
          {/* <a href="/images/map-offices.png" className="text-sm underline">
            View office locations
          </a> */}
          {status === 'error' && (
            <p role="alert" className="text-sm text-red-700">
              Please fix the highlighted errors.
            </p>
          )}
        </div>

        {/* a11y checklist (kept short):
          - Labels bound to inputs
          - Required fields marked via required
          - Errors are described inline and announced (role=alert snippet)
          - Buttons have clear text
        */}
      </form>
    </section>
  );
}
