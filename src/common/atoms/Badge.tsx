import type { ReactNode } from 'react'
import shared from '@/styles/shared.module.css'
import styles from './Badge.module.css'

export interface BadgeProps {
  icon?: ReactNode
  color?: string
  children: ReactNode
  className?: string
}

export function Badge({ icon, color, children, className = '' }: BadgeProps) {
  const badgeColor = color ? { color } : {}

  return (
    <div className={`${styles.badge} ${shared.liquidGlassSubtle} ${className}`.trim()}>
      {icon}
      <span style={badgeColor}>{children}</span>
    </div>
  )
}
