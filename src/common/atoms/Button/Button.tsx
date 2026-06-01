import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', href, children, className = '', ...rest }: ButtonProps) {
  const sizeClass = size !== 'md' ? styles[size] : ''
  const cls = [styles.base, styles[variant], sizeClass, className].filter(Boolean).join(' ').trim()

  if (href) {
    return (
      <a href={href} className={cls} {...(rest as Record<string, unknown>)}>
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
