/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FORMSPARK_FORM_ID?: string;
  readonly HCAPTCHA_SITEKEY?: string;
  readonly HCAPTCHA_SECRET?: string;
  readonly SITE?: string;
  readonly PLAUSIBLE_DOMAIN?: string; // e.g. marine-experts.com
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
