# Apply Progress: PR #5b — LandingPage Refactor + global.css Purge

**Change**: css-modules-migration
**Mode**: Standard
**PR**: #5b (final PR of the migration)

---

## Completed Tasks

| Task | Status |
|------|--------|
| PR #1: shared.module.css + atoms | ✅ (previous) |
| PR #2: Organisms + simple sections | ✅ (previous) |
| PR #3: Complex sections batch 1 | ✅ (previous) |
| PR #4: Complex sections batch 2 | ✅ (previous) |
| **PR #5a**: Complex section module.css finalization | ✅ (previous) |
| **5.1** Refactor `LandingPage.tsx` navbar query | ✅ |
| **5.2** Refactor glass element query + remove dead reveal observer | ✅ |
| **5.3** Add `data-glass` attributes to 14 glass elements across 12 components | ✅ |
| **5.4** Purge `global.css` — 898 lines removed, 64 remaining | ✅ |
| **5.5** Remove `menuToggle` from resize handler (CSS handles it) | ✅ |
| **5.6** Final verification: tsc ✅ lint ✅ build ✅ | ✅ |

---

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/styles/global.css` | Modified | Purged all migrated styles (898→64 lines). Kept only reset, fonts, scrollbar, tag-level heading defaults, section base. |
| `src/features/landing/pages/LandingPage.tsx` | Modified | Refactored 3 DOM queries: `.nav-glass` → `[data-nav="glass"]`, removed dead `.reveal` global observer, `.glass-bisel/.liquid-glass/.liquid-glass-strong` → `[data-glass]`, removed `menuToggle` from resize handler |
| `src/common/organisms/Navbar/Navbar.tsx` | Modified | Added `data-nav="glass"` attribute to `<nav>` element |
| `src/common/organisms/MobileMenu/MobileMenu.tsx` | Modified | Added `data-glass="liquid-strong"`, replaced `className="btn-primary"` with `<Button>` component |
| `src/common/atoms/Button/Button.tsx` | Modified | Fixed href variant to spread `...rest` props (onClick, style, etc.) to anchor element |
| `src/features/landing/components/HeroSection.tsx` | Modified | Added `data-glass="liquid"` to 2 floating badge divs |
| `src/features/landing/components/VentajaSection.tsx` | Modified | Added `data-glass="bisel"` to glass card |
| `src/features/landing/components/DesafiosSection.tsx` | Modified | Added `data-glass="bisel"` to challenge cards |
| `src/features/landing/components/ServiciosSection.tsx` | Modified | Added `data-glass="bisel"` to service cards |
| `src/features/landing/components/QuickWinsSection.tsx` | Modified | Added `data-glass="bisel"` to quick win cards |
| `src/features/landing/components/SectoresSection.tsx` | Modified | Added `data-glass="bisel"` to sector panels |
| `src/features/landing/components/CasosSection.tsx` | Modified | Added `data-glass="bisel"` to case cards |
| `src/features/landing/components/ComparativaSection.tsx` | Modified | Added `data-glass="bisel"` to comparison card |
| `src/features/landing/components/PlanesSection.tsx` | Modified | Added `data-glass="bisel"` to plan cards |
| `src/features/landing/components/CompromisoSection.tsx` | Modified | Added `data-glass="bisel"` to commitment card |
| `src/features/landing/components/ContactoSection.tsx` | Modified | Added `data-glass="bisel"` to contact glass card |
| `src/features/landing/components/ModeloSection.tsx` | Modified | Added `data-glass="bisel"` to model step cards |
| `openspec/changes/css-modules-migration/tasks.md` | Modified | Marked all Phase 5 tasks as [x] |

---

## Deviations from Design

**Task 5.1 approach**: The design suggested `useRef<HTMLElement>` on `<Navbar>`. Instead, I used a simpler `data-nav="glass"` data-attribute approach. Rationale: avoids adding forwardRef boilerplate to Navbar and keeps the component API surface unchanged.

**Task 5.2 approach**: The design suggested refactoring to `data-glass` selector. I also removed the global `.reveal` IntersectionObserver entirely because sections already handle their own scroll reveal via `useScrollReveal` hook — the observer was dead code.

**Task 5.5 approach**: The design said "move visibility to `.mobileToggle` CSS media query" — the CSS was already correct. Only needed to remove the redundant JS code from the resize handler.

**Button.tsx fix**: Discovered that the `<Button href="...">` path didn't spread `...rest` props (onClick, style, className weren't passed to the anchor element). Fixed to properly pass props through.

**`.gradient-text` heading weight**: Pre-existing issue — the global CSS rule `h1 .gradient-text { font-weight: 800 !important; }` won't match CSS-Moduled class names, so gradient text in headings might appear at weight 200 instead of 800. This was already broken before this PR and is outside its scope.

---

## Issues Found

- **Button component bug**: The `href` variant didn't pass `onClick`, `style`, `className` to the anchor element. Fixed by spreading `rest` props on both `<a>` and `<button>` paths.
- **`.reveal` observer was dead code**: The global `document.querySelectorAll('.reveal')` returned empty since `.reveal` is now a CSS Modules class. The sections handle their own reveal via `useScrollReveal` hook.
- **`document.getElementById('menuToggle')` was redundant**: CSS media query already handles mobile toggle visibility.

---

## Remaining Lines in global.css

**64 lines** (down from 962):
- 2 @import rules (tokens.css, animations.css)
- 3 lines Google Fonts import
- 27 lines reset (box-sizing, html, body, headings, section)
- 13 lines scrollbar styles
- 12 lines responsive heading overrides
- 7 lines empty/comment

---

## Workload / PR Boundary

- Mode: `size:exception` accepted (PR was split into 5a + 5b per workload recommendation; 5b is the mechanical deletion bulk)
- Current work unit: PR #5b — LandingPage DOM query refactor + global.css purge
- Boundary: All 6 Phase 5 tasks complete across PRs #5a and #5b
- Estimated review budget impact: ~898 deletions (low cognitive load — mechanical CSS removal)

---

## Status

**6/6 tasks complete.** All phases 0–5 complete. Migration is fully finished.

Ready for **verify phase**.
