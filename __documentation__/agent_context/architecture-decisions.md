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
