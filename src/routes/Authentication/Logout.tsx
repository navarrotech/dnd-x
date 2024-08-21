// Copyright © 2024 Navarrotech

// Core
import { useEffect, useState } from 'react'

// UI
import { Navigate } from 'react-router-dom'
import { Loader } from '@/elements/Loader'

// Firebase
import { getAuth, signOut } from 'firebase/auth'

// Misc
import { urls } from '@/constants'

export function Logout() {
  const [ done, setDone, ] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    signOut(auth)
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setDone(true)
      })
  }, [])

  if (done) {
    return <Navigate to={urls.root} />
  }

  return <Loader fullpage={true} />
}
