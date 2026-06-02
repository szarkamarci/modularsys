# Repository Map

The project is structured with a root Vite SPA that serves as the main public website. There are also older/alternative implementations located within the repository.

- `/` (Root): The main Vite React Single Page Application (SPA).
  - `index.html`: The entry point.
  - `vite.config.js`: Vite build configuration.
  - `vercel.json`: Configuration for Vercel deployment, primarily client-side routing rewrites.
- `/src/`: Source code for the Vite SPA.
  - `/src/components/`: Reusable React components (Layout, Navbar, Footer, Hero, CTA, etc.).
  - `/src/pages/`: Page-level React components.
    - `Home.jsx`, `Pricing.jsx`, `Resources.jsx`: Main marketing pages.
    - `Audit.jsx`: The "Rescue My Data" free audit contact form.
    - `GetStarted.jsx`: The demo login/onboarding screen.
    - `DemoDashboard.jsx`: The MVP frontend-only demo dashboard experience.
    - `Demo.jsx`: An older, extensive static mock chatbot/dashboard (currently mapped to `/old-demo` and preserved).
  - `/src/locales/`: i18next translation files (en/hu) containing marketing copy.
- `/public/`: Static assets like images and favicons.
  - `/public/assets/brand/`: Production location for brand assets (`wordmark.svg` and `mark.svg`).
- `/web_app/`: A separate Next.js application directory. It contains an alternative/more complex dashboard implementation that was originally used as a reference for building the MVP Vite demo. This folder is not currently part of the active public deployment.
- `/stitch/`: Generated design references and components from AI tools (like v0 or Stitch). Used purely for visual reference.
