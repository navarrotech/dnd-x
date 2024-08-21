// Copyright © 2024 Navarrotech

// Documentation:
// https://bulma.io/documentation/elements/button/

import { Link } from 'react-router-dom'

// Typescript
import type { MouseEventHandler, ReactNode, MutableRefObject } from 'react'
import type { BulmaColor } from '@/types'

export type ButtonProps = {
  to?: string,

  customRef?: MutableRefObject<any>

  primary?: boolean
  secondary?: boolean
  ghost?: boolean
  warning?: boolean
  error?: boolean
  success?: boolean
  info?: boolean
  link?: boolean

  inverted?: boolean

  onClick?: MouseEventHandler<HTMLButtonElement>

  small?: boolean
  medium?: boolean
  large?: boolean

  color?: BulmaColor
  children: ReactNode
  className?: string
  fullwidth?: boolean
  disabled?: boolean
  loading?: boolean
  light?: boolean
  dark?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function Button(props: ButtonProps) {
  const {
    primary,
    secondary,
    ghost,
    warning,
    error,
    success,
    info,
    link,
    dark,
    light,

    inverted,

    small,
    medium,
    large,

    className,
    children,
    disabled,
    loading,
    color,
    fullwidth,
    ...rest
  } = props

  const statusClasses = [
    primary && 'is-primary',
    secondary && 'is-secondary',
    warning && 'is-warning',
    error && 'is-error',
    success && 'is-success',
    info && 'is-info',
    link && 'is-link',

    small && 'is-small',
    medium && 'is-medium',
    large && 'is-large',

    inverted && 'is-inverted',

    ghost && 'is-ghost',
    disabled && 'is-disabled',
    loading && 'is-loading',
    dark && 'is-dark',
    light && 'is-light',
  ].filter(Boolean).join(' ')

  // On click middleware to ensure the JS protections
  // follow the CSS protections
  const onClick: MouseEventHandler<HTMLButtonElement> = (...event) => {
    if (!rest.onClick || disabled || loading) {
      return
    }

    rest.onClick(...event)
  }

  const colorClass = color ? `is-${color}` : ''
  const sizeClass = fullwidth ? 'is-fullwidth' : ''

  const classes = `button ${className || ''} ${statusClasses} ${colorClass} ${sizeClass}`.trim()

  if (props.to) {
    return <Link
      to={props.to}
      className={classes}
      {...rest as any}
      onClick={onClick as any}
    >{
        children
      }</Link>
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...rest}
      ref={props.customRef}
      onClick={onClick}
    >{
        children
      }</button>
  )
}
