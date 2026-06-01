# Tasks: Migrar estilos globales a CSS Modules

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~2,130 total across all PRs (additions + deletions) |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | 5 PRs (stacked to main, independent verification per PR) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

```
Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium
```

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | shared.module.css + atoms | PR #1 | 0-dep, base for all others |
| 2 | Organisms + simple sections | PR #2 | Depends on shared.module.css from PR #1 |
| 3 | Complex sections (Hero, Desafios, Pilares, Servicios, Sectores) | PR #3 | Depends on shared.module.css from PR #1 |
| 4 | Complex sections (Comparativa, Planes, Compromiso, Contacto) | PR #4 | Depends on shared.module.css from PR #1 |
| 5 | LandingPage refactor + global.css purge | PR #5 | Depends on all prior PRs being merged |

**Note**: PR #5 exceeds 400 lines (~910 changes, mostly mechanical CSS deletions). The excess is low-risk — deletions of already-migrated rules. Consider `size:exception` for PR #5, or split into two (5a = refactor, 5b = purge).

---

## Phase 0: Foundation — shared.module.css

- [x] 0.1 Create `src/styles/shared.module.css` — extract `.wrap`, `.reveal`, `.revealed` from global.css
- [x] 0.2 Extract `.gradient-text`, `.gradient-text-alt` with background-clip + webkit-text-fill-color
- [x] 0.3 Extract `.glass-bisel` with ::after pseudo, light mode `display: none` override via `[data-theme='light']`
- [x] 0.4 Extract `.liquid-glass`, `.liquid-glass-strong`, `.liquid-glass-subtle` with ::before shimmer + light variants
- [x] 0.5 Extract `.card-hover` with lift/glow + light override
- [x] 0.6 Extract `.glow-aurora`, `.glow-core`, `.glow-rim` — positioned glow layers
- [x] 0.7 Extract `.cols-2`, `.cols-3`, `.cols-4` grid templates with responsive collapse
- [x] 0.8a Extract `.badge`, `.dot` badge classes with blink animation
- [x] 0.8b Extract `.ai-chip` AI indicator chip class
- [x] 0.8c Extract `.popular-badge` "Most Popular" badge for pricing cards
- [x] 0.8d Extract `.refract-layer` refraction overlay used by glass elements
- [ ] 0.9 Extract `.float-logo`, `.float-delay-1`, `.float-delay-2` keyframe-based animations

## Phase 1: Atoms

- [x] 1.1 Create `src/common/atoms/Button.module.css` — extract `.btn-primary`, `.btn-secondary` with full states (hover, active, disabled) + media queries (~80 lines)
- [x] 1.2 Update `Button.tsx` — import `styles`, replace `className="btn-primary"` with `styles.btnPrimary`, preserve `className` prop composability
- [x] 1.3 Create `src/common/atoms/Badge.module.css` — extract `.badge` with `display: inline-flex`, import shared for `liquidGlassSubtle`
- [x] 1.4 Update `Badge.tsx` — import shared + styles, remove inline `style={{ display: 'inline-flex' }}`

## Phase 2: Organisms

- [x] 2.1 Create `src/common/organisms/Navbar/Navbar.module.css` — extract `.navGlass`, `.desktopNav`, `.navLink`, `.themeBtn`, `.mobileToggle` with all states + media queries
- [x] 2.2 Update `Navbar.tsx` — extract inline toggle button styles to `.mobileToggle`, replace className refs
- [x] 2.3 Create `src/common/organisms/MobileMenu/MobileMenu.module.css` — extract `.overlay`, `.menuContent` (compose shared liquidGlassStrong), `.closeBtn`, `.menuLink`
- [x] 2.4 Update `MobileMenu.tsx` — extract close button inline styles, import shared + styles
- [x] 2.5 Create `src/common/organisms/Footer/Footer.module.css` — extract `.footerGrid`, `.footerLogo`, `.logoLight`, `.logoDark`, `.socialIcon`
- [x] 2.6 Update `Footer.tsx` — replace social icon inline styles with `.socialIcon`, import shared for liquidGlassSubtle

## Phase 3: Simple Sections

- [ ] 3.1 Create `src/features/landing/components/VentajaSection.module.css` — extract section classes, compose shared classes (wrap, reveal, glassBisel, glow*, gradientTextAlt)
- [ ] 3.2 Update `VentajaSection.tsx` — import shared + styles, replace className refs
- [ ] 3.3 Create `src/features/landing/components/QuickWinsSection.module.css` — extract, compose shared
- [ ] 3.4 Update `QuickWinsSection.tsx` — import shared + styles, replace className refs
- [ ] 3.5 Create `src/features/landing/components/CasosSection.module.css` — extract, compose shared + aiChip classes
- [ ] 3.6 Update `CasosSection.tsx` — import shared + styles, replace className refs
- [ ] 3.7 Create `src/features/landing/components/ModeloSection.module.css` — extract, compose shared cols*, cardHover
- [ ] 3.8 Update `ModeloSection.tsx` — import shared + styles, replace className refs

## Phase 4: Complex Sections

- [ ] 4.1 Create `src/features/landing/components/HeroSection.module.css` — `.heroGrid`, `.heroTitle`, `.heroVisual`, `.heroCta`, `.statsRow`, `.statDivider`, `.floatLogo*` + compose shared
- [ ] 4.2 Update `HeroSection.tsx` — import shared + styles, replace className refs
- [ ] 4.3 Create `src/features/landing/components/DesafiosSection.module.css` — extract section bg patterns + compose shared
- [ ] 4.4 Update `DesafiosSection.tsx` — import shared + styles, replace className refs
- [ ] 4.5 Create `src/features/landing/components/PilaresSection.module.css` — `.pilaresSection`, `.aiChip*` + compose shared
- [ ] 4.6 Update `PilaresSection.tsx` — import shared + styles, replace className refs
- [ ] 4.7 Create `src/features/landing/components/ServiciosSection.module.css` — compose shared + section classes
- [ ] 4.8 Update `ServiciosSection.tsx` — import shared + styles, replace className refs
- [ ] 4.9 Create `src/features/landing/components/SectoresSection.module.css` — `.sectorPanel`, `.sectorImgOverlay*` + compose shared
- [ ] 4.10 Update `SectoresSection.tsx` — import shared + styles, replace className refs
- [ ] 4.11 Create `src/features/landing/components/ComparativaSection.module.css` — `.compareTable`, `.highlight` + compose shared
- [ ] 4.12 Update `ComparativaSection.tsx` — import shared + styles, replace className refs
- [ ] 4.13 Create `src/features/landing/components/PlanesSection.module.css` — `.popularBadge`, `.progressTrack`, `.progressFill` + compose shared
- [ ] 4.14 Update `PlanesSection.tsx` — import shared + styles, replace className refs
- [ ] 4.15 Create `src/features/landing/components/CompromisoSection.module.css` — compose shared + section classes
- [ ] 4.16 Update `CompromisoSection.tsx` — import shared + styles, replace className refs
- [ ] 4.17 Create `src/features/landing/components/ContactoSection.module.css` — `.contactForm`, `.cfGrid`, `.cfField`, `.cfInput*`, `.contactInfo*` + compose shared
- [ ] 4.18 Update `ContactoSection.tsx` — import shared + styles, replace className refs

## Phase 5: LandingPage Refactor + Cleanup

- [ ] 5.1 Refactor `LandingPage.tsx` — replace `document.querySelector('.nav-glass')` with `useRef<HTMLElement>` on `<Navbar>`
- [ ] 5.2 Refactor `LandingPage.tsx` — replace `document.querySelectorAll('.glass-bisel, .liquid-glass, .liquid-glass-strong')` with `[data-glass]` attribute selector
- [ ] 5.3 Add `data-glass` attribute to glass elements in relevant components (Navbar, Hero, Contacto, sections)
- [ ] 5.4 Purge `global.css` — delete all migrated rule blocks, keep only reset + scrollbar + heading overrides + section base + Google Fonts import (~100 lines)
- [ ] 5.5 Remove inline `document.getElementById('menuToggle')` — move visibility to `.mobileToggle` CSS media query
- [ ] 5.6 Final verification: `npx tsc --noEmit` + `npm run lint` + visual dark/light parity check

## Dependency Graph

```
Phase 0 (shared.module.css) ──── NO DEPS
    │
    ├──→ Phase 1 (Button, Badge) ── Depends on Phase 0 (shared classes for Badge)
    ├──→ Phase 2 (Navbar, MobileMenu, Footer) ── Depends on Phase 0
    ├──→ Phase 3 (Simple Sections) ── Depends on Phase 0
    └──→ Phase 4 (Complex Sections) ── Depends on Phase 0
              │
              └──→ Phase 5 (LandingPage + global.css purge) ── Depends on ALL prior phases
```

- Phases 1–4 can run in PARALLEL within a single workspace branch (all only depend on Phase 0)
- Phase 5 MUST run last (after all section .module.css files exist and all global rules are migrated)

## Line Estimate Per PR

| PR | Phases | Additions | Deletions | Total | In Budget? |
|----|--------|-----------|-----------|-------|-----------|
| #1 | 0 + 1 | ~215 | ~0 | ~215 | ✅ Yes |
| #2 | 2 + 3 | ~270 | ~0 | ~270 | ✅ Yes |
| #3 | 4 (batch 1) | ~175 | ~0 | ~175 | ✅ Yes |
| #4 | 4 (batch 2) | ~140 | ~0 | ~140 | ✅ Yes |
| #5 | 5 | ~50 | ~860 | ~910 | ❌ No — size exception needed |

**Recommendation**: Merge PRs #1–#4 stacked to main. For PR #5, either (a) request `size:exception` maintainer approval, or (b) split: PR #5a = LandingPage refactor (~50 lines), PR #5b = global.css purge (~860 deletions, mechanical).
