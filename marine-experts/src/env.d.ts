/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FORMSPARK_FORM_ID?: string;
  readonly HCAPTCHA_SITEKEY?: string;
  readonly HCAPTCHA_SECRET?: string;
  readonly HCAPTCHA_ENABLED?: string;
  readonly SITE?: string;
  readonly PLAUSIBLE_DOMAIN?: string;
  readonly SMTP_HOST?: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_USER?: string;
  readonly SMTP_PASS?: string;
  readonly MAIL_TO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    plausible?: ((eventName: string, options?: { props?: Record<string, string> }) => void) & {
      q?: unknown[];
    };
  }
}
export {};
