// Copyright © 2024 Navarrotech

// Core
import { Link, NavLink, useLocation } from 'react-router-dom'

// Iconography
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGears,
  faHatWizard,
  faRightFromBracket,
  faTents,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

// UI
import { NameTag } from '@/elements/NameTag'
import { useTranslation } from 'react-i18next'

// Redux
import { useSelector, dispatch } from '@/store'
import { showSettings, showFriends } from '@/modules/core/reducer'

// Misc
import styles from './Dashboard.module.sass'
import { urls } from '@/constants'

export function Sidebar() {
  const { t, } = useTranslation()

  const friends = useSelector((state) => state.core.showFriends)
  const settings = useSelector((state) => state.core.showUserSettings)

  const { pathname, } = useLocation()

  const collapsed = !settings && !friends && (pathname === urls.campaignCreate)

  return (
    <div className={styles.Sidebar + (collapsed ? ' ' + styles.collapsed : '')}>
      <NameTag />
      <div className={'block buttons is-centered has-addons ' + styles.sidebarButtons}>
        <button
          className={'button is-' + (friends ? 'primary' : 'dark')}
          type="button"
          onClick={() => {
            dispatch(
              showFriends(!friends),
            )
          }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faUserGroup} />
          </span>
        </button>
        <button
          className={'button is-' + (settings ? 'primary' : 'dark')}
          type="button"
          onClick={() => {
            dispatch(
              showSettings(!settings),
            )
          }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faGears} />
          </span>
        </button>
        <Link to={urls.logout} className="button is-dark">
          <span className="icon">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
        </Link>
      </div>
      <NavLink
        to={urls.campaignList}
        className={({ isActive, }) => styles.SidebarItem + (isActive ? ' ' + styles.isActive : '')}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faTents}/>
        </span>
        <span className={styles.hideOnCollapse}>{ t('sidebar.campaigns') }</span>
      </NavLink>
      <NavLink
        to={urls.characterList}
        className={({ isActive, }) => styles.SidebarItem + (isActive ? ' ' + styles.isActive : '')}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faHatWizard} />
        </span>
        <span className={styles.hideOnCollapse}>{ t('sidebar.characters') }</span>
      </NavLink>
      <div className={styles.spacer} />
    </div>
  )
}
