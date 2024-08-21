// Copyright © 2024 Navarrotech

// Typescript
import type { Campaign } from '@/types'

// Firebase
import { database } from '@/modules/firebase'
import { ref, push, update, remove } from 'firebase/database'

// Redux
import { getState } from '@/store'

// Misc
import { defaultCover } from '@/constants'

// This function is dedicated to proper shape control of the data
export async function createCampaign(name: string, description: string) {
  const state = getState()
  const user = state.user.current

  const now = new Date().toUTCString()

  const campaign: Campaign = {
    ownerId: user.uid,

    name,
    description,
    cover: defaultCover,

    characters: {},
    data: {},

    chat: [],
    map: {},

    players: [],
    spectators: [],

    createdAt: now,
    updatedAt: now,
  }

  const newCampaignKey = push(
    ref( database, 'campaigns' ),
  ).key

  if (!newCampaignKey) {
    throw new Error('Failed to create new campaign')
  }

  await update(
    ref(database), {
      [`campaigns/${newCampaignKey}`]: campaign,
      [`users/${user.uid}/campaigns/${newCampaignKey}`]: true,
    },
  )

  return newCampaignKey
}

export async function deleteCampaign(campaignId: string) {
  const state = getState()
  const user = state.user.current

  await Promise.all([
    remove(
      ref(database, `campaigns/${campaignId}`),
    ),
    remove(
      ref(database, `users/${user.uid}/campaigns/${campaignId}`),
    ),
  ])
}

export function normalizeCampaign(partial: Partial<Campaign>): Campaign {
  const state = getState()
  const user = state.user.current

  const now = new Date().toUTCString()

  const campaign: Campaign = {
    ownerId: user.uid,

    name: partial.name || '',
    description: partial.description || '',
    cover: partial.cover || defaultCover,

    characters: partial.characters || {},
    data: partial.data || {},

    chat: partial.chat || [],
    map: partial.map || {},

    players: partial.players || [],
    spectators: partial.spectators || [],

    createdAt: partial.createdAt || now,
    updatedAt: now,
  }

  return campaign
}
