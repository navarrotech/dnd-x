// Copyright © 2024 Navarrotech

import { createSlice } from '@reduxjs/toolkit'

// Typescript
import type { Theme } from './types'
import type { PayloadAction } from '@reduxjs/toolkit'

// Utilities
import { applyTheme } from './utility'
import { defaultLanguage } from '@/modules/i18n'

export type State = {
  theme: Theme,
  language: string,
  showFriends: boolean,
  showUserSettings: boolean,
}

const initialState: State = {
  theme: localStorage.getItem('theme') as Theme || 'system',
  language: localStorage.getItem('language') || defaultLanguage,
  showFriends: false,
  showUserSettings: false,
}

applyTheme(initialState.theme)

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
      applyTheme(action.payload)
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    showFriends(state, action: PayloadAction<boolean>) {
      state.showFriends = action.payload
    },
    showSettings(state, action: PayloadAction<boolean>) {
      state.showUserSettings = action.payload
    },
  },
})

export const {
  setTheme,
  setLanguage,
  showFriends,
  showSettings,
} = coreSlice.actions
