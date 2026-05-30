import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', href, children, className = '', ...rest }: ButtonProps) {
  const cls = `btn-${variant} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={cls}>
        <span>{children}</span>
      </a>
    )
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
    </button>
  )
}
