# Repository Map

The project is structured with a root Vite SPA that serves as the main public website. 

- `/` (Root): The main Vite React Single Page Application (SPA).
  - `index.html`: The entry point.
  - `vite.config.js`: Vite build configuration.
  - `vercel.json`: Configuration for Vercel deployment, primarily client-side routing rewrites.
- `/src/`: Source code for the Vite SPA.
  - `/src/components/`: Reusable React components.
    - `ui/`, `layout/`: Ported dashboard components.
    - `InteractiveBackground.jsx`: The interactive dot hover effect.
  - `/src/features/`: Ported dashboard features (overview, insights, etc.).
  - `/src/lib/`: Data providers and utilities.
  - `/src/config/`: Locales and client configs.
  - `/src/pages/`: Page-level React components.
    - `dashboard/`: The `DashboardLayout.jsx` shell and nested routes.
    - `Home.jsx`, `Pricing.jsx`, `Resources.jsx`: Main marketing pages.
    - `Audit.jsx`: The "Rescue My Data" free audit contact form.
    - `GetStarted.jsx`: The demo login/onboarding screen.
    - `Demo.jsx`: An older, extensive static mock chatbot/dashboard (mapped to `/old-demo`).
  - `/src/locales/`: i18next translation files.
- `/public/`: Static assets like images and favicons.
  - `/public/assets/brand/`: Production location for brand assets (`wordmark.svg` and `mark.svg`).
- `/web_app/`: Original Next.js application directory (source of the ported dashboard).
- `/stitch/`: Generated design references.
