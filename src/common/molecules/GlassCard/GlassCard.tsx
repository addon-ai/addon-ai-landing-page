import type { HTMLAttributes, ReactNode } from 'react'
import shared from '@/styles/shared.module.css'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the hover glow/lift interaction. Enabled by default. */
  hover?: boolean
  /** Adds the liquid-card refraction variant used by some sections. */
  liquid?: boolean
  /** Section-local class for layout/padding (e.g. styles.card). */
  className?: string | undefined
  children: ReactNode
}

/**
 * Base molecule that encapsulates the "liquid glass" surface shared by every
 * card on the landing: the bisel container plus the refract/glow layers.
 *
 * The four inner layers MUST stay inside the .glassBisel element because their
 * animation is triggered by `.glassBisel:hover .refractLayer` selectors in
 * shared.module.css — moving them out would break the hover effect.
 */
export function GlassCard({ hover = true, liquid = false, className = '', children, ...rest }: GlassCardProps) {
  const cls = [
    shared.glassBisel,
    hover ? shared.cardHover : '',
    liquid ? shared.liquidCard : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <div className={cls} data-glass="bisel" {...rest}>
      <div className={shared.refractLayer} />
      <div className={shared.glowAurora} />
      <div className={shared.glowCore} />
      <div className={shared.glowRim} />
      {children}
    </div>
  )
}
