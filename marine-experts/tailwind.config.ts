import type { Config } from 'tailwindcss';

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px", "2xl": "1400px" }
    },
    extend: {
      colors: {
        navy: "#0B1F3A",       // Primary
        teal: "#11A6A6",       // Accent
        ocean: "#1E3A8A",      // Support
        sand: "#E6E0D4",
        slate: "#64748B"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
} satisfies Config;
