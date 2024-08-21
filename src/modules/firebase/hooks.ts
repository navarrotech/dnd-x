// Copyright © 2024 Navarrotech

// Core
import { useEffect, useState } from 'react'

// Firebase
import { database } from '@/modules/firebase'
import { ref, off, onValue } from 'firebase/database'

// Redux
import { useSelector } from '@/store'

export function useRealtimeDatabase<T = any>(refPath: string, defaultValue?: T) {
  const [ data, setData, ] = useState<T | undefined>(defaultValue)

  useEffect(() => {
    if (!refPath) {
      return () => {}
    }
    const dbRef = ref(database, refPath)
    onValue(dbRef, (snapshot) => {
      setData(snapshot.val() as T)
    })

    return () => {
      off(dbRef)
    }
  }, [ refPath, ])

  return data
}

export function useUser() {
  const user = useSelector((state) => state.user.current)
  return user
}
