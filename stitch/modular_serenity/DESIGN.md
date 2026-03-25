# Design System Strategy: The Serene Interface

## 1. Overview & Creative North Star: "The Digital Sanctuary"
This design system rejects the frantic, high-density aesthetic of traditional data platforms. Our Creative North Star is **The Digital Sanctuary**. We are building a "modern spa day for data"—an environment that feels curative, intentional, and weightless. 

To move beyond the "template" look, we employ **Editorial Asymmetry**. Instead of rigid, centered grids, we use generous whitespace (`spacing.20` and `spacing.24`) to let elements breathe. We favor "heavy-top" layouts where large, airy `display-lg` typography sits offset against floating, glassmorphic containers. The goal is to make the user feel as though they are browsing a high-end architectural magazine, not a database.

---

## 2. Colors: Tonal Depth over Linearity
Our palette is a sophisticated mix of soft lavenders (`primary`), airy blues (`secondary`), and a foundation of "warm-light" neutrals.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning or containment. 
Boundaries must be defined solely through:
- **Background Shifts:** A `surface_container_low` card sitting on a `surface` background.
- **Tonal Transitions:** Using `surface_container_lowest` to draw the eye to the most critical interactive areas.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, semi-translucent paper.
1.  **Base Layer:** `surface` (#faf9fe) – The vast, open floor.
2.  **Section Layer:** `surface_container_low` (#f4f3f8) – Subtle grouping for secondary content.
3.  **Active/Card Layer:** `surface_container_lowest` (#ffffff) – Pure white to create a "pop" of clarity.
4.  **Interaction Layer:** `surface_container_high` (#e9e7ed) – For hovered states or inset utility panels.

### The "Glass & Gradient" Rule
To achieve a "premium" feel, use **Glassmorphism** for floating elements (modals, dropdowns, sticky navs). Apply `surface_container_lowest` at 70% opacity with a `24px` backdrop-blur. 
**Signature Textures:** For primary CTAs, do not use flat fills. Use a subtle linear gradient from `primary` (#5749c2) to `primary_container` (#7063dd) at a 135-degree angle to provide visual "soul."

---

## 3. Typography: The Editorial Voice
We pair the structural precision of **Plus Jakarta Sans** with the approachable clarity of **Manrope**.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "hero" elements. Use `display-lg` with tight letter-spacing (-0.02em) to create a commanding, editorial presence. Large headlines should often be the only high-contrast element on a page (`on_surface`).
*   **Body & Titles (Manrope):** Chosen for its high legibility and warmth. Use `body-lg` (1rem) as the default to maintain the "breathable" feel—never crowd the user with small text.
*   **Labels (Manrope):** Use `label-md` in `on_surface_variant` (#474553) for metadata. The slight color shift ensures the hierarchy is felt, not just seen.

---

## 4. Elevation & Depth: Tonal Layering
We convey hierarchy through soft light physics rather than structural lines.

*   **The Layering Principle:** Depth is achieved by "stacking." A white `surface_container_lowest` card on a `surface_container_low` background creates a natural lift.
*   **Ambient Shadows:** When an element must "float" (e.g., a primary Modal), use an extra-diffused shadow:
    *   *Shadow:* 0px 20px 40px rgba(87, 73, 194, 0.06). 
    *   Note: The shadow is tinted with the `primary` color, not grey, to mimic natural light passing through a tinted lens.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` at 20% opacity. 100% opaque borders are forbidden.
*   **Generous Roundedness:** Use `DEFAULT` (1rem/16px) for standard cards and `xl` (3rem/48px) for hero containers to reinforce the "soft" brand personality.

---

## 5. Components

### Buttons & Chips
*   **Primary Button:** Gradient fill (`primary` to `primary_container`), `full` roundedness, and `spacing.6` horizontal padding. No shadows on rest; a soft `primary` tinted shadow on hover.
*   **Selection Chips:** Use `secondary_fixed_dim` backgrounds with `on_secondary_fixed` text. On selection, transition to `primary`. No borders.

### Input Fields
*   **The "Soft Inset" Look:** Use `surface_container_low` as the background fill. On focus, transition the background to `surface_container_lowest` and add a 2px "Ghost Border" of `primary` at 40% opacity. Use `rounded-md` (1.5rem) for a friendly, modern feel.

### Cards & Lists
*   **Strict Rule:** No divider lines. Separate list items using `spacing.3` vertical gaps or alternating background shades between `surface` and `surface_container_low`.
*   **Content Grouping:** Use "The Halo Effect"—group related items inside a `rounded-lg` (2rem) container with a `surface_container_lowest` background to let them float above the base.

### Special Component: The "Zen Loader"
Instead of a spinning circle, use a gentle "breathing" opacity pulse (0.4 to 1.0) on a `primary_fixed` soft-edged orb.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is `spacing.12`, try a right margin of `spacing.20` for an editorial feel.
*   **Do** embrace "Over-Spacing." If a layout feels "okay," add another `spacing.4` of padding.
*   **Do** use `tertiary` (soft purples) for success states or "delight" moments rather than harsh greens.

### Don't:
*   **Don't** use 100% black (#000000). Use `on_surface` (#1a1b1f) to maintain the "spa" softness.
*   **Don't** use "Drop Shadows" that are dark or tight. If it looks like a shadow from 1998, it’s wrong.
*   **Don't** use hard corners. Even "square" elements should have at least a `sm` (0.5rem) radius.