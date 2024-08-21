// Copyright © 2024 Navarrotech

// Typescript
import type { CreateToastParams, Toast } from './types'

// Utility
import { ToastEvents } from './events'

export function newToast(createToast: CreateToastParams) {
  const id = Date.now()
  const duration = createToast.duration === undefined
    ? 10_000
    : createToast.duration

  if (createToast.duration !== 0) {
    setTimeout(() => {
      ToastEvents.emit('remove', id)
    }, duration + 500)
    setTimeout(() => {
      ToastEvents.emit('expiring', id)
    }, duration)
  }

  const toast: Toast = {
    id,
    duration,
    title: createToast.title,
    message: createToast.message,
    color: createToast.color || 'primary',
    showProgressbar: createToast.showProgressbar || true,
    startedAt: Date.now(),
    actions: createToast.actions,
  }

  ToastEvents.emit('new', toast)
}
