// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
// Configure Astro to deploy on Vercel using the serverless adapter.
export default defineConfig({
  adapter: vercel(),
});
