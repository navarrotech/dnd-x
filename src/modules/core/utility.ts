// Copyright © 2024 Navarrotech

import type { Theme } from './types'

export function applyTheme(theme: Theme) {
  console.log('Applying theme', theme)
  document.body.classList.remove('theme-light', 'theme-dark', 'theme-system')
  if (theme === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  document.body.classList.add(`theme-${theme}`)
}
