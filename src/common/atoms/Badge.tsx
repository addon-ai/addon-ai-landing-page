import type { ReactNode } from 'react'

export interface BadgeProps {
  icon?: ReactNode
  color?: string
  children: ReactNode
  className?: string
}

export function Badge({ icon, color, children, className = '' }: BadgeProps) {
  const badgeColor = color ? { color } : {}

  return (
    <div className={`badge liquid-glass-subtle ${className}`} style={{ display: 'inline-flex' }}>
      {icon}
      <span style={badgeColor}>{children}</span>
    </div>
  )
}
