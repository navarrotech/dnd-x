// Copyright © 2024 Navarrotech

export const urls = {
  login: '/login',
  signup: '/signup',
  forgot: '/forgot',
  logout: '/logout',

  root: '/app/',
  default: '/app/campaigns',

  campaignList: '/app/campaigns/',
  campaignView: '/app/campaigns/:id',
  campaignCreate: '/app/campaigns/create',

  characterList: '/app/characters',
  characterView: '/app/characters/:id',
  characterCreate: '/app/characters/create',
} as const

export const logoUrl = '/logo.png' as const

export const panelIds = {
  cesium: 'cesium',
  video: 'video',
  filters: 'filters',
  components: 'components',
  trackList: 'trackList',
  trackCard: 'trackCard',
  timeline: 'timeline',
} as const

export const defaultCover = 'https://images.squarespace-cdn.com/content/v1/560383f2e4b0777b299a865b'
  + '/1611508492612-GHQ6ECDF1PYIPSD3S29L/image-asset.jpeg?format=2500w'
