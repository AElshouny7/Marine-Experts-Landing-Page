import type { APIRoute } from 'astro';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  'h-captcha-response': z.string().optional(), // auto-added by widget
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errors[i.path.join('.')] = i.message));
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }

    // hCaptcha verify if keys exist
    const token = body['h-captcha-response'];
    const secret = import.meta.env.HCAPTCHA_SECRET;
    if (secret && token) {
      const vRes = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      }).then((r) => r.json());

      if (!vRes.success) {
        return new Response(JSON.stringify({ errors: { captcha: 'Captcha failed.' } }), {
          status: 400,
        });
      }
    }

    // Forward to Formspark if configured
    const formId = import.meta.env.FORMSPARK_FORM_ID;
    if (formId) {
      const fsRes = await fetch(`https://submit-form.com/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          _subject: `New Inquiry: ${parsed.data.name} – Marine Experts`,
          _webhook: 'true',
        }),
      });

      if (!fsRes.ok) {
        const text = await fsRes.text();
        return new Response(JSON.stringify({ message: 'Formspark error', details: text }), {
          status: 502,
        });
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Unexpected error' }), { status: 500 });
  }
};
