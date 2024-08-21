// Copyright © 2024 Navarrotech

// Core
import { useEffect, useState } from 'react'

// Typescript
import { type ReactNode } from 'react'

// Redux
import { dispatch } from '@/store/store'
import { setUser } from '@/modules/auth/reducer'

// Hooks
import { useTranslation } from 'react-i18next'

// Firebase
import { auth } from '@/modules/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// UI
import { Loader } from '@/elements/Loader'

type Props = {
    children: ReactNode
}

export function Initialization({ children, }: Props) {
  const { t, i18n, } = useTranslation()
  const [ isReady, finish, ] = useState<boolean>(false)

  // Check if the user is signed in, and save the user to Redux
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log('user changed', user)
        dispatch(
          setUser(user),
        )
      }
      else {
        // User is signed out
        dispatch(
          setUser(null),
        )
      }
      finish(true)
    })
  }, [])

  // Update the document title when the language changes
  useEffect(() => {
    document.title = t('vendor')
    // eslint-disable-next-line
  }, [ i18n.language, ])

  if (!isReady) {
    return <Loader fullpage />
  }

  return children
}
