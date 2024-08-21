// Copyright © 2024 Navarrotech

import type { ReactNode } from 'react'
import { Button, type ButtonProps } from './Button'

type Props = {
  children: ReactNode
  active?: boolean
} & ButtonProps

export function ButtonToggle({ children, active = false, ...rest }: Props) {
  return <Button
    className={'is-toggle' + (active ? ' is-active' : '')}
    { ...rest }
  >{
      children
    }</Button>
}
