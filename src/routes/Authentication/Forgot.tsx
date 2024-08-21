// Copyright © 2024 Navarrotech

import { useState } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { sendPasswordResetEmail } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

// UI
import { Button } from '@/elements/Button'
import { useTranslation } from 'react-i18next'

// Iconography
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

// Misc
import { logoUrl } from '@/constants'

export function Forgot() {
  const { t, } = useTranslation()
  const [ state, setState, ] = useState({
    email: '',
    finished: false,
  })

  const isValid = state.email && state.email.includes('@')

  async function submit() {
    const { email, } = state
    const auth = getAuth()

    if (!isValid) {
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setState({ ...state, finished: true, })
    }
    catch (error: any) {
      console.log({ errorCode: error.code, message: error.message, })
    }
  }

  if (state.finished) {
    return (
      <div className="hero is-halfheight">
        <div className="hero-body">
          <div className="container is-max-fullhd">
            <div className="subcontainer is-mini">
              <figure className="block image is-128x128 is-centered">
                <img src={logoUrl} alt={t('vendor')} />
              </figure>
              <div className="block box">
                <div className="block has-text-centered">
                  <h1 className="title is-size-4">{ t('forgotPassword.sent') }</h1>
                </div>
                <div className="block">
                  <p className="is-size-6">{ t('forgotPassword.instructions') }</p>
                </div>
                <div className="block buttons is-centered">
                  <Link to="/login">
                    <Button primary>
                      <span>{ t('forgotPassword.back') }</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hero is-halfheight">
      <div className="hero-body">
        <div className="container is-max-fullhd">
          <div className="subcontainer is-mini">
            <figure className="block image is-128x128 is-centered">
              <img src={logoUrl} alt="Virtual DnD" />
            </figure>
            <div className="block box">
              <div className="block has-text-centered">
                <h1 className="title is-size-4 pb-2">{ t('forgotPassword.title') }</h1>
                <h2 className="subtitle is-size-6">{ t('forgotPassword.email') }</h2>
              </div>
              <div className="block">
                <div className="field">
                  <div className="control">
                    <input
                      autoFocus
                      className="input"
                      type="email"
                      placeholder="Email"
                      // autoComplete="email"
                      value={state.email}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          submit()
                        }
                      }}
                      onChange={(e) => {
                        setState({ ...state, email: e.target.value, })
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="block buttons is-centered">
                <Button
                  primary
                  fullwidth
                  disabled={!isValid}
                  onClick={submit}
                >
                  <span>{ t('forgotPassword.send') }</span>
                  <span className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
