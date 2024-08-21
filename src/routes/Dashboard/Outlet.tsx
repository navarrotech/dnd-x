// Copyright © 2024 Navarrotech

// Core
import { useNavigate, Outlet } from 'react-router'

// Firebase
import { urls } from '@/constants'
import { useSelector } from '@/store'

import { SettingsModal } from './Settings'
import { FriendsList } from './Friends'
import { Sidebar } from './Sidebar'

import { ErrorBoundary } from '@/common/ErrorBoundary'
import styles from './Dashboard.module.sass'
import { useUser } from '@/modules/firebase/hooks'

export function AuthorizedOutlet() {
  const user = useUser()
  const navigate = useNavigate()
  const showFriends = useSelector((state) => state.core.showFriends)

  if (!user) {
    console.log('Redirecting user to login because no user was found!')
    navigate(urls.login)
  }

  return <div className={styles.Dashboard + (showFriends ? ' ' + styles.friendsActive : '')}>
    <SettingsModal />
    <FriendsList />
    <Sidebar />
    <div className={styles.Application}>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  </div>
}
