// Copyright © 2024 Navarrotech

// Core
import { useState } from 'react'

// Iconography
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHatWizard, faUser } from '@fortawesome/free-solid-svg-icons'

// Redux
import { showSettings } from '@/modules/core/reducer'
import { dispatch, useSelector } from '@/store'

// Firebase
import { useUser } from '@/modules/firebase/hooks'
import { updateProfile } from 'firebase/auth'

// UI
import { useTranslation } from 'react-i18next'
import { Loader } from '@/elements/Loader'
import { ChooseAvatar } from '@/elements/ChooseAvatar'
import { LanguageChooser } from '@/elements/LanguageChooser'
import { ThemeButton } from '@/elements/ThemeButton'
import { Modal } from '@/elements/Modal'

export function SettingsModal() {
  const { t, } = useTranslation()

  const user = useUser()
  const active = useSelector((state) => state.core.showUserSettings)

  const [ state, setState, ] = useState({
    showChooseAvatar: false,
    displayName: user?.displayName,
    username: user?.username||'',
  })

  function save(update) {
    if (!update || !Object.keys(update).length) {
      return
    }
    updateProfile(
      user.auth.currentUser,
      update,
    ).catch((error) => console.log(error))
  }

  if (!user) {
    return <Loader />
  }

  if (state.showChooseAvatar) {
    return <ChooseAvatar
      current={user.photoURL}
      onChoose={(photoURL) => {
        if (photoURL) {
          save({ photoURL, })
        }
        setState({ ...state, showChooseAvatar: false, })
      }}
    />
  }

  return <Modal
    title='Account Settings'
    show={active}
    onClose={() =>
      dispatch(
        showSettings(false),
      )
    }
    actions={[
      { text: 'Cancel', closeAfterOnClick: true, },
      { text: 'Save', color: 'primary', closeAfterOnClick: true, },
    ]}
  >
    <div className="block columns is-vcentered">
      <div className="column is-3">
        <figure
          className="image is-128x128 is-centered is-rounded is-clickable"
          onClick={() => {
            setState({ ...state, showChooseAvatar: true, })
          }}
        >
          <img src={user.photoURL} alt={user.displayName} />
        </figure>
      </div>

      <div className="column">
        <div className="field">
          <label className="label">{ t('settings.name') }</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={state.displayName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur()
                }
              }}
              onChange={(e) => {
                setState({ ...state, displayName: e.target.value, })
              }}
              onBlur={() => save({ displayName: state.displayName, })}
            />
            <span className="icon is-left">
              <FontAwesomeIcon icon={faHatWizard} />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">{ t('settings.username') }</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Username"
              value={state.username}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur()
                }
              }}
              onChange={(e) => {
                setState({ ...state, username: e.target.value, })
              }}
              onBlur={() => save({ username: state.username, })}
            />
            <span className="icon is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">{ t('settings.email') }</label>
          <div className="control has-icons-left" onClick={() => console.log(user)}>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={user?.email || ''}
              disabled={true}
            />
            <span className="icon is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="block level-right is-fullwidth">
      <LanguageChooser buttonify />
      <ThemeButton className='is-left' />
    </div>
  </Modal>
}
