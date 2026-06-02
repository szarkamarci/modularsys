# Architecture Decisions

## Frontend-Only Deployment
We have explicitly chosen to operate without a backend server (VPS/Node.js/Python backend) for the time being. All website features, including the demo dashboard and login flow, must remain frontend-safe and deployable on a static hosting provider like Vercel.

## The Demo Experience
The decision was made to fully port the original `web_app` dashboard into the Vite SPA, ensuring 100% design fidelity. We installed the required dependencies (`recharts`, `@tanstack/react-query`, etc.) and mapped the routes under `/demo-dashboard/`. The demo login is explicitly designed to look like a "Demo Platform" rather than a real user account.

## Component Reusability
We prioritize reusing existing UI components, Tailwind utility classes, and the overarching "futuristic/playful" visual language established in the main marketing site.
- **Visuals:** We use premium interactions like the `InteractiveBackground` component which leverages highly performant CSS masks, transform parallax, and `requestAnimationFrame` to track mouse movement.

## Vercel Compatibility
Because the Vite app uses client-side routing (`react-router-dom`), a `vercel.json` file with a rewrite rule (`"source": "/(.*)", "destination": "/index.html"`) is mandatory. This ensures that users who reload a specific route (e.g., `/get-started`) do not receive a 404 error from Vercel's edge network.

## Demo Auth / Session State
This is a frontend-only demo with no real authentication backend.
- The demo login (`/get-started`) simulates a 1200 ms network delay and redirects to `/demo-dashboard`.
- The `localStorage` key used is `modularai_demo_session` (constant `DEMO_SESSION_KEY` in `TopAppBar.tsx`).
- **Logout** clears this key and navigates to `/get-started` via `useNavigate()`.
- There is intentionally no route guard — any URL under `/demo-dashboard/*` is accessible directly. This is by design for a public-facing sales demo.

## Dashboard Sidebar Routing
- All sidebar nav link `href` values in `src/config/locales/en.ts` and `src/config/locales/hu.ts` are prefixed with `/demo-dashboard/`.
- `SideNav.tsx` and `BottomNav.tsx` use `react-router-dom` `<Link to={href}>` (not `href` prop).
- Active state uses an exact match for `/demo-dashboard` and `pathname.startsWith(href)` for sub-routes.
