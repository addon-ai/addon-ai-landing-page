# Apply Progress — PR #3: Organisms (Navbar, MobileMenu, Footer)

**Change**: css-modules-migration
**PR**: #3 (Phase 2 — Organisms)
**Mode**: Standard (strict_tdd: false)
**Date**: 2026-06-01

## Completed Tasks

| # | Description | Status |
|---|-------------|--------|
| 0.1–0.8d | Foundation — shared.module.css | ✅ (PR #1) |
| 0.9 | Extract .float-logo, .float-delay-1, .float-delay-2 | ⬜ Pending |
| 1.1–1.4 | Atoms — Button + Badge | ✅ (PR #2) |
| 2.1 | Create `Navbar/Navbar.module.css` — `.navGlass`, `.desktopNav`, `.navLink`, `.themeBtn`, `.mobileToggle` + light theme + responsive | ✅ |
| 2.2 | Update `Navbar.tsx` — extract inline toggle button styles to `.mobileToggle`, replace className refs | ✅ |
| 2.3 | Create `MobileMenu/MobileMenu.module.css` — `.overlay`, `.menuContent` (compose shared.liquidGlassStrong), `.closeBtn`, `.menuLink` | ✅ |
| 2.4 | Update `MobileMenu.tsx` — extract close button inline styles, import shared + styles | ✅ |
| 2.5 | Create `Footer/Footer.module.css` — `.footerGrid`, `.footerLogo`, `.logoDark`, `.logoLight`, `.socialIcon`, `.columnTitle`, `.columnLink`, `.bottomBar`, `.copyright` | ✅ |
| 2.6 | Update `Footer.tsx` — replace social icon inline styles with `.socialIcon`, import shared for liquidGlassSubtle | ✅ |

## Files Created

| File | Action | Lines |
|------|--------|-------|
| `src/common/organisms/Navbar/Navbar.module.css` | Created | 158 |
| `src/common/organisms/MobileMenu/MobileMenu.module.css` | Created | 82 |
| `src/common/organisms/Footer/Footer.module.css` | Created | 120 |

## Files Modified

| File | Action | Lines Changed |
|------|--------|--------------|
| `src/common/organisms/Navbar/Navbar.tsx` | Modified | +10/-14 (imports + class refs) |
| `src/common/organisms/MobileMenu/MobileMenu.tsx` | Modified | +6/-13 (imports + class refs) |
| `src/common/organisms/Footer/Footer.tsx` | Modified | +10/-14 (imports + class refs) |

## Implementation Details

### Navbar.module.css
- `.navGlass` — fixed header with glass backdrop, [data-theme='light'] override (#fff bg, different border)
- `.navInner` — extracted from inline `height: 100%, display: flex, align-items: center, justify-content: center` on the wrap div
- `.navCenter` — extracted from inline `flex: 1, gap: 32, padding-right: 40` flex layout
- `.desktopNav` — flex row with `display: none !important` at 768px
- `.navLink` — 14px, 0.75 opacity, light mode color #163a65 / hover #338a7b
- `.navActions` — flex row, gap 16 for the right-side button group
- `.themeBtn` — 40px circle with glass bg, [data-theme='light'] override
- `.mobileToggle` — extracted from inline styles: 40px square, glass bg, `display: none` by default, `display: flex` at 768px, light theme variant added

### MobileMenu.module.css
- `.overlay` — fixed inset transparent-black backdrop, `display: none` / `.overlayOpen` (`display: block`)
- `.menuContent` — fixed right panel (300px, 100vh), slide-in via `translateX(100%)` → `.menuOpen` (`translateX(0)`)
- `.closeBtn` — extracted from inline: absolute top-right, 40px, glass bg, light theme variant
- `.menuLink` — 18px, `var(--text-secondary)` color
- Uses `shared.liquidGlassStrong` via JS composition on `.menuContent` div

### Footer.module.css
- `.footer` — padding 64px 0, border-top
- `.footerGrid` — `2fr 1fr 1fr 1fr` grid, collapses to 2 columns at 1024px, 1 column at 768px
- `.footerLogo` — inline-flex logo wrap
- `.logoDark` / `.logoLight` — dark/light toggle with `display: none/block` swap via `[data-theme='light']`
- `.socialIcon` — 36px icon button, flex-centered
- `.columnTitle` — uppercase 13px h4 headers
- `.columnLink` — 14px footer links
- `.bottomBar` / `.copyright` — bottom border section
- Uses `shared.liquidGlassSubtle` via JS composition on social icon `<a>` elements

## Design Deviations

| Design (D3) | Used Instead | Reason |
|---|---|---|
| `.menuOverlay` / `.menuPanel` | `.overlay` / `.menuContent` | Orchestrator instruction — matches spec scope names |
| 1-column collapse at 768px only | 2-column intermediate breakpoint at 1024px | Design says "Responsive (collapse to 2-column, then 1-column)" — better UX |
| Logo classes in global.css only | Logo styles (`.logoDark`, `.logoLight`) duplicated in Footer.module.css | Per design D2: non-color properties need duplication per `.module.css` since they use `display` toggle, not CSS custom properties |

## Verification

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | ✅ Passes (zero errors) |
| `npm run lint` | ✅ Passes (zero errors) |
| Inline styles extracted — mobile toggle | ✅ All style props moved to `.mobileToggle` class |
| Inline styles extracted — mobile menu close button | ✅ All style props moved to `.closeBtn` class |
| Inline styles extracted — social icons | ✅ Inline styles replaced by `.socialIcon` class |
| Shared class composition (JS) | ✅ `shared.wrap`, `shared.liquidGlassStrong`, `shared.liquidGlassSubtle` via className template |
| Theme parity via `[data-theme='light']` | ✅ `.navGlass`, `.navLink`, `.themeBtn`, `.mobileToggle`, `.closeBtn`, `.logoDark/Light` all have light variants |
| `desktop-nav` media query preserved | ✅ `.desktopNav` has `display: none !important` at 768px |

## What Was Extracted (Inline → CSS)

| Component | Inline Style Removed | CSS Class |
|-----------|---------------------|-----------|
| Navbar | `height: 100%, display: flex, alignItems: center, justifyContent: center` (wrap div) | `.navInner` |
| Navbar | `display: flex, alignItems: center, justifyContent: center, flex: 1, gap: 32, paddingRight: 40` | `.navCenter` |
| Navbar | `display: flex, alignItems: center, gap: 20, flexWrap: wrap, justifyContent: center` (desktop-nav) | `.desktopNav` |
| Navbar | `display: flex, alignItems: center, gap: 16` (actions div) | `.navActions` |
| Navbar | Mobile toggle: width, height, borderRadius, border, background, backdropFilter, cursor, display, alignItems, justifyContent, color | `.mobileToggle` |
| MobileMenu | Overlay: position, inset, background, zIndex, display | `.overlay` / `.overlayOpen` |
| MobileMenu | Panel: position, top, right, width, height, zIndex, transform, transition, padding, display, flexDirection, gap, borderRadius | `.menuContent` / `.menuOpen` |
| MobileMenu | Close btn: position, top, right, width, height, borderRadius, border, background, cursor, display, alignItems, justifyContent, color | `.closeBtn` |
| MobileMenu | Nav links: fontSize, color, textDecoration | `.menuLink` |
| Footer | footer: padding, borderTop | `.footer` |
| Footer | Grid: display, gridTemplateColumns, gap, marginBottom | `.footerGrid` |
| Footer | Logo wrap: marginBottom, display, alignItems, height | `.footerLogo` |
| Footer | Logo images: height, width | `.logoDark` / `.logoLight` |
| Footer | Description: fontSize, color, lineHeight, marginBottom | `.description` |
| Footer | Social icon: width, height, display, alignItems, justifyContent, textDecoration, color | `.socialIcon` |
| Footer | Column title: fontSize, fontWeight, color, marginBottom, textTransform, letterSpacing | `.columnTitle` |
| Footer | Column link: fontSize, color, textDecoration | `.columnLink` |
| Footer | Bottom bar: borderTop, paddingTop, display, flexWrap, justifyContent, alignItems, gap | `.bottomBar` |
| Footer | Copyright: fontSize, color | `.copyright` |

## Remaining Inline Styles (Intentional)

| Component | Inline Style | Reason |
|-----------|-------------|--------|
| Navbar | `Button style={{ display: 'none' }}` | `id="navCta"` visibility is controlled by JS in LandingPage.tsx — dynamic |
| MobileMenu | CTA div `style={{ paddingTop: 24, borderTop: '...' }}` | Separator for the CTA section within menu |
| MobileMenu | CTA anchor `style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}` | CTA uses global `btn-primary` class (not yet refactored to Button component) |
| Footer | Social icons wrapper `style={{ display: 'flex', gap: 12 }}` | Simple one-off flex row |
| Footer | `<ul style={{ listStyle: 'none', padding: 0 }}>` | Repeat pattern, minor |
| Footer | `<li style={{ marginBottom: 10 }}>` | List item spacing per item |
| Footer | Contact `li > span className={styles.columnLink}` | Uses the class but the span itself is fine |

## Workload / PR Boundary

- **Mode**: Single PR (within 400-line budget)
- **Current work unit**: Phase 2 — Organisms (Navbar, MobileMenu, Footer)
- **Estimated changed lines**: ~360 (158 + 82 + 120 CSS + ~30 TSX)
- **Budget**: ✅ Well within 400 lines
- **Chain strategy**: stacked-to-main
- **PR boundary**: Three `.module.css` created, three `.tsx` modified

## Remaining Tasks

| # | Description | Suggested PR |
|---|-------------|-------------|
| 0.9 | Extract .float-logo, .float-delay-1, .float-delay-2 | Deferred |
| 3.1–3.8 | Phase 3: Simple Sections (Ventaja, QuickWins, Casos, Modelo) | PR #4 |
| 4.1–4.18 | Phase 4: Complex Sections (Hero–Contacto) | PR #5 |
| 5.1–5.6 | Phase 5: LandingPage refactor + global.css purge | PR #6 |
