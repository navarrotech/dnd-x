// Copyright © 2024 Navarrotech

import { Route } from 'react-router'

import { Forgot } from './Forgot'
import { Logout } from './Logout'
import { Authenticate } from './Authenticate'

export const AuthRoutes = (
  <>
    <Route path="/login" element={<Authenticate />} />
    <Route path="/signup" element={<Authenticate signup />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path="/logout" element={<Logout />} />
  </>
)
