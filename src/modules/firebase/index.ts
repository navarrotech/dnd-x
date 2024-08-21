// Copyright © 2024 Navarrotech

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

import { NODE_ENV } from '../../env'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBfa5dpT__g2CLbVl_9DQnE4z0X7wU3cGc',
  authDomain: 'dnd-x-4b380.firebaseapp.com',
  projectId: 'dnd-x-4b380',
  storageBucket: 'dnd-x-4b380.appspot.com',
  messagingSenderId: '287942100372',
  appId: '1:287942100372:web:98e5df18a02f6a70c0bb81',
  measurementId: 'G-S3FBGYT70L',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAnalytics = NODE_ENV === 'development'
  ? null
  : getAnalytics(firebaseApp)

export const database = getDatabase(firebaseApp)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp)
