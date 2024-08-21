// Copyright © 2024 Navarrotech

// Core
import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Firebase
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'

// UI
import { useTranslation } from 'react-i18next'
import { Button } from '@/elements/Button'

// Validators
import { yup } from '@/modules/validators'

// Iconograhpy
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import GoogleIcon from '@/brands/google_g.svg?react'

// Misc
import { logoUrl, urls } from '@/constants'
import { useUser } from '@/modules/firebase/hooks'
import { useValidator } from '@/common/useValidator'

const provider = new GoogleAuthProvider()

type Props = {
  signup?: boolean
}

const destinationAfterSuccess = urls.campaignList

export function Authenticate({ signup = false, }: Props) {
  const user = useUser()
  const { t, i18n, } = useTranslation()

  const navigate = useNavigate()

  const [ isSignup, setIsSignup, ] = useState<boolean>(signup)
  const [ name, setName, ] = useState<string>('')
  const [ email, setEmail, ] = useState<string>('')
  const [ password, setPassword, ] = useState<string>('')
  const [ GoogleButtonLoading, setGoogleButtonLoading, ] = useState<boolean>(false)
  const [ NativeButtonLoading, setNativeButtonLoading, ] = useState<boolean>(false)
  const [ errorMessage, setMessage, ] = useState<string>('')

  const validator = useMemo(() => {
    if (isSignup) {
      return yup.object().shape({
        name: yup
          .string()
          .required()
          .min(3)
          .max(64),
        email: yup
          .string()
          .email()
          .required(),
        password: yup
          .string()
          .required()
          .min(8, 'Password must be at least 8 characters long'),
      })
    }

    return yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(8, 'Password must be at least 8 characters long'),
    })

    // eslint-disable-next-line
  }, [ i18n.language, isSignup ])

  useEffect(() => {
    if (user) {
      console.log('User is signed in, moving to dashboard')
      navigate(destinationAfterSuccess)
    }
  }, [ navigate, user, ])

  async function googleSignin() {
    setGoogleButtonLoading(true)
    const auth = getAuth()

    try {
      await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      navigate(destinationAfterSuccess)
    }
    catch (error: any) {
      console.log({
        code: error.code,
        message: error.message,
        email: error.customData.email,
        credential: GoogleAuthProvider.credentialFromError(error),
        error: JSON.parse(JSON.stringify(error)),
      })
      setGoogleButtonLoading(false)
      setMessage(error.message)
    }
  }

  async function nativeSignin() {
    const auth = getAuth()

    if (NativeButtonLoading) {
      return
    }

    setNativeButtonLoading(true)

    if (isSignup) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(userCredentials.user)
        await updateProfile(userCredentials.user, { displayName: name, })

        navigate(destinationAfterSuccess)
      }
      catch (error: any) {
        setMessage(error.message)
        console.log({ errorCode: error.code, message: error.message, })
      }

      setNativeButtonLoading(false)

      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // await validateUserDoc(userCredential.user.uid)
      navigate(destinationAfterSuccess)
      // const user = userCredential.user;
    }
    catch (error: any) {
      let message = error.message
      if (error.code === 'auth/wrong-password') {
        message = 'Invalid email or password'
      }
      else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password'
      }
      setMessage(message)
      console.log({ errorCode: error.code, message: error.message, NativeButtonLoading: false, })
    }

    setNativeButtonLoading(false)
  }

  useEffect(() => {
    if (errorMessage) {
      setMessage('')
    }

    // eslint-disable-next-line
  }, [ name, email, password, isSignup, ])

  const { isValid, errorMessages, } = useValidator(validator, {
    name,
    email,
    password,
  })

  return <div className="hero is-halfheight">
    <div className="hero-body">
      <div className="container is-max-fullhd">
        <div className="subcontainer">
          <figure className="block image is-128x128 is-centered">
            <img src={logoUrl} alt={t('vendor')} />
          </figure>

          <div className="block box">
            <div className="block has-text-centered">
              <h1 className="title">{isSignup ? 'Sign Up' : 'Login'}</h1>
              <h2 className="subtitle">
                <span>{ t('or') }{' '}</span>
                <u
                  className='has-text-primary is-clickable'
                  onClick={() => setIsSignup(!isSignup)}
                >{
                    !isSignup
                      ? t('prompt_signup')
                      : t('prompt_login')
                  }</u>
              </h2>
            </div>
            <div className="block">
              <Button
                fullwidth
                loading={GoogleButtonLoading}
                className='is-google'
                onClick={googleSignin}
              >
                <span className="icon">
                  <GoogleIcon />
                </span>
                {
                  isSignup
                    ? <span>{ t('google_signin') }</span>
                    : <span>{ t('google_signup') }</span>
                }
              </Button>
            </div>
            <div className="is-divider" data-content="OR" />
            <div className="block">
              { isSignup ? (
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      autoFocus={isSignup}
                      className="input"
                      type="text"
                      placeholder="Full Name"
                      autoComplete="name"
                      value={name}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          nativeSignin()
                        }
                      }}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                    />
                    <span className="icon is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  { errorMessages['name'] }
                </div>
              ) : (
                <></>
              )}
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    autoFocus={!isSignup}
                    className="input"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        nativeSignin()
                      }
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <span className="icon is-left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </div>
                { errorMessages['email'] }
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    value={password}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        nativeSignin()
                      }
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                  <span className="icon is-left">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </div>
                { errorMessages['password'] }
              </div>
              <div className="field">
                { errorMessage
                  ? <div className="notification is-danger">
                    { errorMessage }
                  </div>
                  : <></>
                }
              </div>
              { !isSignup
                ? <div className="field level also-mobile">
                  <p className="is-size-6">&nbsp;</p>
                  <Link to={urls.forgot} className="is-size-6 has-text-primary">
                    <span>{ t('forgot_password') }</span>
                  </Link>
                </div>
                : <></>
              }
            </div>
            <div className="block buttons is-centered">
              <Button
                primary
                fullwidth
                onClick={nativeSignin}
                disabled={!isValid}
                loading={NativeButtonLoading}
              >
                { !isSignup
                  ? <>
                    <span>{ t('login') }</span>
                    <span className="icon">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </>
                  : <>
                    <span>{ t('signup') }</span>
                    <span className="icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                  </>
                }
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
}
