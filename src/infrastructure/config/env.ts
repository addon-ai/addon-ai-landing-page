/**
 * Typed environment configuration and feature flags.
 * Vite statically replaces `import.meta.env.VITE_*` at build time.
 */

const readBooleanFlag = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined || value === '') return fallback
  return value === 'true' || value === '1'
}

export const env = {
  web3forms: {
    /** Access key from web3forms.com. Empty until VITE_WEB3FORMS_ACCESS_KEY is set. */
    accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '',
  },
  featureFlags: {
    /** Impacto en ODS section (CompromisoSection). Hidden by default; enable with VITE_SHOW_IMPACTO_ODS=true. */
    showImpactoOds: readBooleanFlag(import.meta.env.VITE_SHOW_IMPACTO_ODS, false),
    /** Prices on the Planes section. Hidden by default; enable with VITE_SHOW_PLAN_PRICES=true. */
    showPlanPrices: readBooleanFlag(import.meta.env.VITE_SHOW_PLAN_PRICES, false),
    /** Resultados que hablan solos section (CasosSection). Hidden by default; enable with VITE_SHOW_CASOS_SECTION=true. */
    showCasosSection: readBooleanFlag(import.meta.env.VITE_SHOW_CASOS_SECTION, false),
  },
} as const