import type { CSSProperties, ReactNode } from 'react'
import { GlassCard } from '../GlassCard'

export interface CaseCardProps {
  icon: ReactNode
  title: string
  desc: string
  /** Background applied to the icon wrapper. */
  iconBg?: string | undefined
  /** Section-local classes so the section keeps owning its layout/styling. */
  cardClassName?: string | undefined
  contentClassName?: string | undefined
  iconClassName?: string | undefined
  titleClassName?: string | undefined
  descClassName?: string | undefined
}

/**
 * Case-study card molecule: an icon+title row over the GlassCard surface,
 * followed by a description.
 */
export function CaseCard({
  icon,
  title,
  desc,
  iconBg,
  cardClassName = '',
  contentClassName = '',
  iconClassName = '',
  titleClassName = '',
  descClassName = '',
}: CaseCardProps) {
  const iconStyle: CSSProperties | undefined = iconBg ? { background: iconBg } : undefined

  return (
    <GlassCard className={cardClassName}>
      <div className={contentClassName}>
        <div className={iconClassName} style={iconStyle}>
          {icon}
        </div>
        <h3 className={titleClassName}>{title}</h3>
      </div>
      <p className={descClassName}>{desc}</p>
    </GlassCard>
  )
}
