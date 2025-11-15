export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, message: 'Missing fields' }), {
        status: 400,
      });
    }

    // Resolve SMTP settings
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

    // Helper to create + verify a transporter for a given port
    const tryCreate = async (p: number) => {
      const isSecure = p === 465; // SSL on 465, STARTTLS on 587
      const t = nodemailer.createTransport({
        host,
        port: p,
        secure: isSecure,
        requireTLS: !isSecure,
        auth: { user, pass },
        logger: import.meta.env.DEV === true,
      });
      await t.verify();
      return t;
    };

    // Try provided port; otherwise try 465 then fallback to 587
    let transporter: nodemailer.Transporter;
    try {
      if (envPort) {
        transporter = await tryCreate(envPort);
      } else {
        try {
          transporter = await tryCreate(465);
        } catch (e465: any) {
          transporter = await tryCreate(587);
        }
      }
    } catch (e: any) {
      const msg = e && e.response ? String(e.response) : e?.message || 'SMTP verify failed';
      const details = {
        hint: 'Check SMTP credentials, data center host (smtp.zoho.com vs smtp.zoho.eu), and use an app password if 2FA is enabled.',
      };
      return new Response(
        JSON.stringify({ ok: false, message: 'SMTP auth failed', error: msg, details }),
        { status: 401 },
      );
    }

    // Compose message
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
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ ok: false, message: 'Failed to send mail', error: String(err.message) }),
      {
        status: 500,
      },
    );
  }
};
