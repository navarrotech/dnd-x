// Copyright © 2024 Navarrotech

import type { TFunction } from 'i18next'

export type FormInvalid = {
  key: string,
  message: string,
}[]

export type BulmaColor = 'primary'
  | 'secondary'
  | 'link'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'white'
  | 'black'
  | 'text'
  | 'ghost'

export type ActionButton = {
  text: string
  color?: BulmaColor
  loading?: boolean
  disabled?: boolean
  closeAfterOnClick?: boolean
  onClick?: () => void
}

export type WithTextAttribute = {
  text: string,
  textKey?: never,
}

export type WithTextKeyAttribute = {
  text?: never,
  textKey: string,
}

export type WithText = WithTextAttribute | WithTextKeyAttribute

export type T = TFunction<'translation', undefined>

export type uuid = string

export type Campaign = {
  ownerId: uuid,

  name: string,
  description: string,
  cover: string,

  characters: Record<uuid, Character>

  data: Record<string, any>,

  chat: Chat[],
  map: Record<string, any>,

  players: uuid[],
  spectators: uuid[],

  createdAt: string,
  updatedAt: string,
}

export type Map = {
  image: string,
  entities: Record<string, any>,
  landmarks: Record<string, any>,
}

export type Chat = {
  what: string,
  who: uuid,
  when: string,
}

export type Character = {
  ownerId: uuid,

  name: string,
  description: string,

  data: Record<string, any>,

  createdAt: string,
  updatedAt: string,
}

export type UserDoc = {
  campaigns: Record<uuid, boolean>,
  characters: Record<uuid, boolean>,
}
