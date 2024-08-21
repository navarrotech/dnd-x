// Copyright © 2024 Navarrotech

import EventEmitter from 'events'

import type { Toast } from './types'

type ToastEvents = {
  'new': [ Toast ]
  'remove': [ number ],
  'expiring': [ number ],
}
export const ToastEvents = new EventEmitter<ToastEvents>()
