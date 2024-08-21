// Copyright © 2024 Navarrotech

// Core
import { useState, useEffect } from 'react'

// Typescript
import type { Toast } from './types'

// Utility
import { useTranslation } from 'react-i18next'
import { ToastEvents } from './events'

// Misc
import styles from './Toasts.module.sass'
import { Button } from '@/elements/Button'

export function Toast({ toast, }: { toast: Toast }) {
  const [ animating, animate, ] = useState<boolean>(false)
  const [ expiring, expire, ] = useState<boolean>(false)

  // Expiring means that this toast has 500ms left to live and should start animating out
  useEffect(() => {
    const listener = (id: number) => {
      if (id === toast.id) {
        expire(true)
      }
    }

    ToastEvents.on('expiring', listener)

    return () => {
      ToastEvents.off('expiring', listener)
    }
  }, [ toast.id, ])

  // After mounting, animate in
  useEffect(() => {
    window.requestAnimationFrame(() => {
      animate(true)
    })
  }, [])

  const { t, i18n, } = useTranslation()
  const text = i18n.exists(toast.message)
    ? t(toast.message)
    : toast.message

  const title = toast.title && i18n.exists(toast.title)
    ? t(toast.title)
    : toast.title

  const deleteButton = <button
    className='delete'
    aria-label='delete'
    onClick={() => ToastEvents.emit('remove', toast.id)}
  />

  const progressBar = toast.duration !== 0
    ? <div key='toast-progressbar' className='multi-progress'>
      <div
        className={`progress-item is-${toast.color}`}
        style={{
          transition: `width ${toast.duration + 500}ms linear`,
          width: animating ? '0%' : '100%',
        }}
      />
    </div>
    : <></>

  const actions = toast.actions
    ? <div className='field buttons is-right'>{
      toast.actions?.map((action) => <Button
        key='toast-actions'
        disabled={action.disabled}
        loading={action.loading}
        color={action.color}
        onClick={() => {
          action.onClick?.()
          if (action.closeAfterOnClick) {
            ToastEvents.emit('remove', toast.id)
          }
        }}
      >
        <span>{
          i18n.exists(action.text)
            ? t(action.text)
            : action.text
        }</span>
      </Button>)
    }</div>
    : <></>

  const expiringClass = expiring ? styles.expiring : ''

  if (title) {
    return <article
      key={toast.id}
      className={`${styles.toast} message is-${toast.color} ${expiringClass}`}
    >
      <div className='message-header'>
        <p>{ title }</p>
        { deleteButton }
      </div>
      <div className='message-body'>
        <p className='field'>{ text }</p>
        <div className='field'>
          { progressBar }
        </div>
        { actions }
      </div>
    </article>
  }

  return <div
    key={toast.id}
    className={`${styles.toast} notification is-${toast.color} ${expiringClass}`}
  >
    { deleteButton }
    <p className='field'>{ text }</p>
    <div className='field'>
      { progressBar }
    </div>
    { actions }
  </div>
}
