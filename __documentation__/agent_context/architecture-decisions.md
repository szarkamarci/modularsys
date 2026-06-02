# Architecture Decisions

## Frontend-Only Deployment
We have explicitly chosen to operate without a backend server (VPS/Node.js/Python backend) for the time being. All website features, including the demo dashboard and login flow, must remain frontend-safe and deployable on a static hosting provider like Vercel.

## The Demo Experience
The decision was made to integrate a lightweight MVP version of the demo dashboard directly into the Vite SPA, rather than trying to deploy the heavy Next.js `web_app` application alongside it. This keeps the Vercel deployment straightforward and the bundle size manageable. The demo login is explicitly designed to look like a "Demo Platform" rather than a real user account, to manage user expectations.

## Component Reusability
We prioritize reusing existing UI components, Tailwind utility classes, and the overarching "futuristic/playful" visual language established in the main marketing site.
- **Visuals:** We use premium interactions like the interactive `DotBackground` component which leverages highly performant CSS masks and `requestAnimationFrame` instead of heavy libraries to maintain high FPS and low bundle size.

## Vercel Compatibility
Because the Vite app uses client-side routing (`react-router-dom`), a `vercel.json` file with a rewrite rule (`"source": "/(.*)", "destination": "/index.html"`) is mandatory. This ensures that users who reload a specific route (e.g., `/get-started`) do not receive a 404 error from Vercel's edge network.
