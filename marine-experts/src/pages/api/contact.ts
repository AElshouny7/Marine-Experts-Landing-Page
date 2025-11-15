export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = await request.json();

    const { name, email, phone, company, message } = body;

    // Basic field validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: 'Missing fields',
          errors: { form: 'Required fields missing' },
        }),
        { status: 400 },
      );
    }

    // -----------------------------
    // 🔐 hCaptcha Verification
    // -----------------------------
    const secret = import.meta.env.HCAPTCHA_SECRET;
    if (secret) {
      const token: string | undefined =
        body.hcaptchaToken ||
        body['h-captcha-response'] ||
        body['hcaptcha'] ||
        body['hCaptcha'];

      if (!token) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: 'Captcha required',
            errors: { captcha: 'Please complete the captcha.' },
          }),
          { status: 400 },
        );
      }

      const params = new URLSearchParams({
        secret,
        response: token,
        remoteip: clientAddress || '',
      });

      const verify = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const result = await verify.json();

      if (!result?.success) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: 'Captcha verification failed',
            errors: { captcha: 'Captcha invalid or expired. Please try again.' },
            codes: result?.['error-codes'],
          }),
          { status: 400 },
        );
      }
    }

    // -----------------------------
    // 📧 SMTP Setup
    // -----------------------------
    const host = import.meta.env.SMTP_HOST;
    const envPort = import.meta.env.SMTP_PORT ? Number(import.meta.env.SMTP_PORT) : undefined;
    const user = import.meta.env.SMTP_USER;
    const pass = import.meta.env.SMTP_PASS;
    const to = import.meta.env.MAIL_TO;

    if (!host || !user || !pass || !to) {
      return new Response(
        JSON.stringify({ ok: false, message: 'SMTP configuration missing on server' }),
        { status: 500 },
      );
    }

    const tryCreate = async (port: number) => {
      const secure = port === 465;
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        requireTLS: !secure,
        auth: { user, pass },
      });

      await transporter.verify();
      return transporter;
    };

    let transporter;
    try {
      if (envPort) {
        transporter = await tryCreate(envPort);
      } else {
        try {
          transporter = await tryCreate(465);
        } catch {
          transporter = await tryCreate(587);
        }
      }
    } catch (e: any) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: 'SMTP auth failed',
          error: e?.message || 'SMTP verify failed',
          details: {
            hint:
              'Check SMTP credentials, data center host (smtp.zoho.com vs smtp.zoho.eu), and use an app password if 2FA is enabled.',
          },
        }),
        { status: 401 },
      );
    }

    // -----------------------------
    // ✉️ Compose the email
    // -----------------------------
    const mailOptions = {
      from: `"Marine Experts Website" <${user}>`,
      to,
    subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <h2>Contact Request From: ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '-'}</p>
        <p><strong>Company:</strong> ${company || '-'}</p>
        <p><strong>IP:</strong> ${clientAddress || '-'}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error('CONTACT API ERROR:', err);
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'Failed to send mail',
        error: String(err.message),
      }),
      { status: 500 },
    );
  }
};
