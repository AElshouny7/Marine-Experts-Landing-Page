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

    if (!formRef.current) return;

    const fd = new FormData(formRef.current);

    // Basic fields
    const data = Object.fromEntries(fd.entries()) as Record<string, FormDataEntryValue>;

    // Client-side email check (server still validates)
    const email = String(data.email || '');
    if (!email.includes('@')) {
      setStatus('error');
      setErrors((p) => ({ ...p, email: 'Enter a valid email.' }));
      return;
    }

    // 🔐 hCaptcha token from widget
    const hcaptchaToken = String(fd.get('h-captcha-response') || '');

    if (siteKey && !hcaptchaToken) {
      setStatus('error');
      setErrors((p) => ({
        ...p,
        hcaptcha: 'Please complete the security check.',
      }));
      return;
    }

    // Build payload for API (rename h-captcha-response -> hcaptchaToken)
    // Remove raw h-captcha-response from data to keep payload clean
    delete data['h-captcha-response'];
    const payload = {
      ...data,
      hcaptchaToken,
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

      <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid md:grid-cols-2 gap-6" noValidate>
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
            <input
              name="company"
              className="mt-1 w-full border border-sand rounded-lg px-3 py-2"
            />
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
            <input
              name="phone"
              className="mt-1 w-full border border-sand rounded-lg px-3 py-2"
            />
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

        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            data-cta="contact-submit"
            disabled={status === 'submitting'}
            className="px-5 py-3 rounded-xl bg-teal text-white font-medium disabled:opacity-60"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit'}
          </button>

          {/* 🔐 hCaptcha widget BESIDE the button */}
          {siteKey && (
            <div>
              <div className="h-captcha" data-sitekey={siteKey}></div>
              {errors.hcaptcha && (
                <p className="text-red-600 text-sm mt-1">{errors.hcaptcha}</p>
              )}
            </div>
          )}

          {status === 'error' && (
            <p role="alert" className="text-sm text-red-700">
              Please fix the highlighted errors.
            </p>
          )}
        </div>

        {/* a11y checklist:
          - Labels bound to inputs
          - Required fields marked via required
          - Errors are described inline and announced (role=alert snippet)
          - Buttons have clear, descriptive text
        */}
      </form>
    </section>
  );
}
