# Deprecated and Removed Items

This document tracks files, copy, or patterns that have been deprecated or removed from active use.

## Deprecated Code/Folders
- **`src/pages/DemoDashboard.jsx`**: The MVP simplified version was removed in favor of a 1:1 port of the original dashboard features under `src/features/`.
- **`src/components/DotBackground.jsx`**: Removed and replaced by the correct `InteractiveBackground.jsx` which includes the correct mouse-tracking mask behavior.
- **`/stitch/`**: These folders contain generated design references. They are not part of the active application bundle.
- **`src/pages/Demo.jsx`**: This is a large static mock dashboard that was previously used. It has been moved to the `/old-demo` route to preserve it without cluttering the primary new `/get-started` -> `/demo-dashboard` flow.
- **Old Brand Assets**: The text-based `ModularAI` divs in the Header and Footer have been replaced by the SVG `wordmark.svg`. The old `/assets/favico_up.png` has been replaced by `mark.svg` as the favicon.

## Removed Copy
- The claim "Connect your data in 3 minutes" was removed from the FAQ to set more realistic expectations regarding setup time. It was replaced with "Setup takes just a few steps."
- Exaggerated social proof claims like "Join 400+ companies" should be strictly avoided. All active copy focuses on data clarity, predictive analytics, and free audits.
