import type { CSSProperties, ReactNode } from 'react'
import shared from '@/styles/shared.module.css'
import { GlassCard } from '../GlassCard'

export interface ServiceCardProps {
  icon: ReactNode
  title: string
  desc: string
  tag: string
  /** Accent color applied to the tag text. */
  color?: string | undefined
  /** Background applied to the icon wrapper. */
  iconBg?: string | undefined
  /** Section-local classes so the section keeps owning its layout/styling. */
  cardClassName?: string | undefined
  iconWrapClassName?: string | undefined
  titleClassName?: string | undefined
  descClassName?: string | undefined
  tagClassName?: string | undefined
}

/**
 * Service card molecule: icon + title + description + tag, composed on top of
 * the shared GlassCard surface.
 */
export function ServiceCard({
  icon,
  title,
  desc,
  tag,
  color,
  iconBg,
  cardClassName = '',
  iconWrapClassName = '',
  titleClassName = '',
  descClassName = '',
  tagClassName = '',
}: ServiceCardProps) {
  const iconStyle: CSSProperties | undefined = iconBg ? { background: iconBg } : undefined
  const tagStyle: CSSProperties | undefined = color ? { color } : undefined

  return (
    <GlassCard liquid className={cardClassName}>
      <div className={iconWrapClassName} style={iconStyle}>
        {icon}
      </div>
      <h3 className={titleClassName}>{title}</h3>
      <p className={descClassName}>{desc}</p>
      <div className={`${shared.liquidGlassSubtle} ${tagClassName}`.trim()} style={tagStyle}>
        {tag}
      </div>
    </GlassCard>
  )
}
