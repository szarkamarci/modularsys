# Agent Rules

When modifying this repository, follow these strict guidelines:

1. **Inspect Before Changing**: Always use `view_file` or `list_dir` to inspect the actual structure and contents. Never assume paths or structure.
2. **Frontend-Only Deployment**: The application is deployed statically on Vercel. Do not introduce server-only code, database connections, or API routes.
3. **Demo Transparency**: The demo login/dashboard must not pretend to be real authentication. Keep it clearly marked as a demo experience using mock data and local state. Do not invent fake security claims or fake self-serve capabilities.
4. **Preserve the Brand**: Maintain the "ModularAI" futuristic/playful visual identity. Reuse existing layout, navbar, buttons, cards, and theme styles. Do not trigger a full redesign unless explicitly asked.
5. **No Exaggerated Copy**: Do not invent fake clients ("Join 400+ companies") or fake metrics ("Connect in 3 minutes"). Keep the copy grounded, focusing on "clarity", "data audits", and "predictive analytics without enterprise complexity".
6. **Small Targeted Changes**: Do not refactor the entire app for a small feature request.
7. **Build Output**: Do not edit `dist/` manually unless the deployment explicitly requires it and no source alternative exists. Prefer editing `src/` files.
8. **Navigation Integrity**: Do not break the existing landing page navigation (`/`, `/pricing`, `/resources`, `/audit`).
