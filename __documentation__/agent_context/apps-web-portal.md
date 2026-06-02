# Web Portal Application Details

## Current Public Source
The real public website source is the Vite SPA located at the root of the repository. The Next.js `web_app` directory is an alternative/reference implementation that is not part of the active Vercel deployment.

## Routing Structure
The application uses `react-router-dom` for client-side routing.
- `/`: Main Landing Page.
- `/pricing`, `/resources`: Marketing pages.
- `/audit`: The "Rescue My Data" free audit contact form.
- `/get-started`: The demo login/onboarding screen.
- `/demo-dashboard`: The MVP frontend-only demo dashboard experience.
- `/old-demo`: An archived, extensive static mock chatbot/dashboard (previously `Demo.jsx`).

## Demo Architecture
The demo login and dashboard operate entirely in frontend-only mode.
- There is no real authentication backend. The login screen acts as an onboarding gate that visually simulates a login delay before redirecting to the dashboard.
- State is managed via React component state and mock data structures.
- Any features suggesting real data ingestion (e.g. "Connect your database") are strictly visual facades for demonstration purposes.

## Branding and Assets
- **Wordmark:** `public/assets/brand/wordmark.svg` is the main horizontal logo. It is used in the `Header`, `Footer`, and `DemoDashboard`.
- **Mark:** `public/assets/brand/mark.svg` is the simple icon used for the browser favicon (`index.html`) and as the logo icon in the Demo Login (`GetStarted.jsx`).
- **Dot Effect:** The interactive dot background design (`DotBackground.jsx`) tracks mouse movement (`mousemove` event with `requestAnimationFrame`) and renders a sleek masked radial gradient. It is placed as an ambient background in the `Hero.jsx` component.

## Local Development
- Run locally: `npm run dev`
- Build for production: `npm run build`
- Lint: `npm run lint`

## Deployment
The Vite app is deployed to Vercel as a static site. Client-side routing is supported by a `vercel.json` rewrite rule that directs all incoming requests to `index.html`.
