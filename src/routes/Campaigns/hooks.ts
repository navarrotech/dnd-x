// Copyright © 2024 Navarrotech

import type { Campaign } from '@/types'

import { useState, useEffect } from 'react'

import { getDatabase, ref, get, child } from 'firebase/database'
import { useUser } from '@/modules/firebase/hooks'

export function useCampaigns() {
  const [ campaigns, setCampaignsData, ] = useState<Record<string, Campaign>>({})
  const [ loading, setLoading, ] = useState<boolean>(true)
  const [ error, setError, ] = useState<Error | null>(null)
  const user = useUser()

  useEffect(() => {
    async function fetchCampaigns() {
      if (!user) {
        console.warn('No user found, unable to fetch campaigns')
        return
      }

      const db = getDatabase()
      const userCampaignsRef = ref(db, `users/${user.uid}/campaigns`)

      try {
        const snapshot = await get(userCampaignsRef)
        if (snapshot.exists()) {
          const campaignIds = Object.keys(snapshot.val())
          const campaignsData: Record<string, Campaign> = {}

          await Promise.all(campaignIds.map(async (campaignId) => {
            const campaignSnapshot = await get(
              child(ref(db), `campaigns/${campaignId}`),
            )
            if (campaignSnapshot.exists()) {
              campaignsData[campaignId] = campaignSnapshot.val()
            }
          }))

          setCampaignsData(campaignsData)
        }
        else {
          console.warn('No campaigns found for user:', user.uid)
          setCampaignsData({})
        }
      }
      catch (err) {
        console.error('Error fetching campaigns:', err)
        if (err instanceof Error) {
          setError(err)
        }
      }
      finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [ user, ])

  return { campaigns, loading, error, }
}
