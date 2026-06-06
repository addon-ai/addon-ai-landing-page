import type { CSSProperties, ReactNode } from 'react'
import { GlassCard } from '../GlassCard'

export interface ChallengeCardProps {
  icon: ReactNode
  title: string
  desc: string
  /** Background applied to the icon wrapper (e.g. `${color}33`). */
  iconBg?: string | undefined
  /** Section-local classes so the section keeps owning its layout/styling. */
  cardClassName?: string | undefined
  iconWrapClassName?: string | undefined
  titleClassName?: string | undefined
  descClassName?: string | undefined
}

/**
 * Challenge card molecule: icon + title + description over the GlassCard
 * surface.
 */
export function ChallengeCard({
  icon,
  title,
  desc,
  iconBg,
  cardClassName = '',
  iconWrapClassName = '',
  titleClassName = '',
  descClassName = '',
}: ChallengeCardProps) {
  const iconStyle: CSSProperties | undefined = iconBg ? { background: iconBg } : undefined

  return (
    <GlassCard className={cardClassName}>
      <div className={iconWrapClassName} style={iconStyle}>
        {icon}
      </div>
      <h3 className={titleClassName}>{title}</h3>
      <p className={descClassName}>{desc}</p>
    </GlassCard>
  )
}
