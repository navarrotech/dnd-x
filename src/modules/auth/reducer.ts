// Copyright © 2024 Navarrotech

// Redux
import { createSlice } from '@reduxjs/toolkit'

// Typescript
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from 'firebase/auth'

export type State = {
  current: User
}

const initialState: State = {
  // @ts-ignore by the time this is called, the user will be set
  current: null,
}

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      // @ts-ignore
      state.current = action.payload
    },
  },
})

export const {
  setUser,
} = authSlice.actions
