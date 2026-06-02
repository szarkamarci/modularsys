# Web Portal Application Details

## Current Public Source
The real public website source is the Vite SPA located at the root of the repository. The Next.js `web_app` directory is an alternative/reference implementation that is not part of the active Vercel deployment.

## Routing Structure
The application uses `react-router-dom` for client-side routing.
- `/`: Main Landing Page.
- `/pricing`, `/resources`: Marketing pages.
- `/audit`: The "Rescue My Data" free audit contact form.
- `/get-started`: The demo login/onboarding screen.
- `/demo-dashboard`: The Dashboard shell, routing to:
  - `/demo-dashboard` (Overview)
  - `/demo-dashboard/inventory`
  - `/demo-dashboard/frequent-items`
  - `/demo-dashboard/insights`
  - `/demo-dashboard/search-analytics`
  - `/demo-dashboard/watchlist`
- `/old-demo`: An archived, extensive static mock chatbot/dashboard (previously `Demo.jsx`).

## Demo Architecture
The demo login and dashboard operate entirely in frontend-only mode.
- There is no real authentication backend. The login screen acts as an onboarding gate that visually simulates a login delay before redirecting to the dashboard.
- State is managed via React component state and mock data structures.
- Any features suggesting real data ingestion (e.g. "Connect your database") are strictly visual facades for demonstration purposes.

## Branding and Assets
- **Wordmark:** `public/assets/brand/wordmark.svg` — used in `Header`, `Footer`, and the dashboard `SideNav` (top-left, links back to `/`).
- **Mark:** `public/assets/brand/mark.svg` — used as the favicon (`index.html`), the demo login icon (`GetStarted.jsx`), and the dashboard `TopAppBar` mobile logo.
- **Dot Effect:** `src/components/InteractiveBackground.jsx` accepts a `variant` prop:
  - `variant="login"` (default) — fuller intensity, 550 px spotlight, 60% dot opacity. Used on `/get-started`.
  - `variant="hero"` — subtle/ambient, 700 px diffuse spotlight, 30% dot opacity, reduced parallax. Used in `Hero.jsx` on `/`.
  - Both variants respect `prefers-reduced-motion` — the animated dot layer is skipped and only static ambient circles are shown.

## Local Development
- Run locally: `npm run dev`
- Build for production: `npm run build`
- Lint: `npm run lint`

## Deployment
The Vite app is deployed to Vercel as a static site. Client-side routing is supported by a `vercel.json` rewrite rule that directs all incoming requests to `index.html`.
