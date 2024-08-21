// Copyright © 2024 Navarrotech

// Core
import { useEffect, useState } from 'react'

// Typescript
import type { Toast } from './types'

// Utility
import { Toast as ToastElement } from './Toast'
import { ToastEvents } from './events'

// Misc
import styles from './Toasts.module.sass'

export function AllToasts() {
  const [ toasts, setToasts, ] = useState<Toast[]>([])

  useEffect(() => {
    const createListener = (toast: Toast) => {
      setToasts((prev: Toast[]) => [ ...prev, toast, ])
    }
    const removeListener = (id: number) => {
      setToasts((prev: Toast[]) => prev.filter((toast) => toast.id !== id))
    }

    ToastEvents.on('new', createListener)
    ToastEvents.on('remove', removeListener)

    return () => {
      ToastEvents.off('new', createListener)
      ToastEvents.off('remove', removeListener)
    }
  }, [])

  return <div className={styles.toasts}>{
    toasts.map((toast) => <ToastElement
      key={toast.id}
      toast={toast}
    />)
  }</div>
}
