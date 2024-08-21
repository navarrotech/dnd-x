// Copyright © 2024 Navarrotech

/* eslint import/no-extraneous-dependencies: 0 */
/* eslint i18next/no-literal-string: 0 */

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Element to test:
import { Button } from '@/elements/Button'

describe('Button Component', () => {
  it('should render children correctly', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should apply the primary class when the primary prop is passed', () => {
    render(<Button primary>Primary Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-primary')
  })

  it('should apply the secondary class when the secondary prop is passed', () => {
    render(<Button secondary>Secondary Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-secondary')
  })

  it('should apply the ghost class when the ghost prop is passed', () => {
    render(<Button ghost>Ghost Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-ghost')
  })

  it('should apply the warning class when the warning prop is passed', () => {
    render(<Button warning>Warning Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-warning')
  })

  it('should apply the error class when the error prop is passed', () => {
    render(<Button error>Error Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-error')
  })

  it('should apply the success class when the success prop is passed', () => {
    render(<Button success>Success Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-success')
  })

  it('should apply the info class when the info prop is passed', () => {
    render(<Button info>Info Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-info')
  })

  it('should apply the link class when the link prop is passed', () => {
    render(<Button link>Link Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-link')
  })

  it('should apply the inverted class when the inverted prop is passed', () => {
    render(<Button inverted>Inverted Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-inverted')
  })

  it('should apply the dark class when the dark prop is passed', () => {
    render(<Button dark>Dark Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-dark')
  })

  it('should apply the light class when the light prop is passed', () => {
    render(<Button light>Light Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-light')
  })

  it('should apply the disabled attribute when the disabled prop is passed', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should apply the loading class when the loading prop is passed', () => {
    render(<Button loading>Loading Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-loading')
  })

  it('should apply the correct color class when the color prop is passed', () => {
    render(<Button color="danger">Danger Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-danger')
  })

  it('should apply the fullwidth class when the fullwidth prop is passed', () => {
    render(<Button fullwidth>Fullwidth Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-fullwidth')
  })

  it('should call the onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByRole('button')
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call the onClick handler when disabled', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    button.click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should not call the onClick handler when loading', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} loading>Loading Button</Button>)
    const button = screen.getByRole('button')
    button.click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should combine multiple class names correctly', () => {
    render(<Button primary warning ghost fullwidth>Combined Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('is-primary is-warning is-ghost is-fullwidth')
  })
})
