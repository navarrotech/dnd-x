// Copyright © 2024 Navarrotech

// Typescript
import type { ActionButton, BulmaColor } from '@/types'

export type Toast = {
  id: number
  title?: string
  actions?: ActionButton[]
  message: string
  showProgressbar?: boolean
  color: BulmaColor
  startedAt: number
  duration: number
}

export type CreateToastParams = {
  title?: string
  message: string
  color?: BulmaColor
  duration?: number
  showProgressbar?: boolean
  actions?: ActionButton[]
}
