import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const cookie = context.cookies.get('ab')?.value;
  if (!cookie) {
    const variant = Math.random() < 0.5 ? 'heroA' : 'heroB';
    context.cookies.set('ab', variant, {
      path: '/',
      httpOnly: false,
      secure: context.url.protocol === 'https:',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 60, // ~60 days
    });
  }
  return next();
});
