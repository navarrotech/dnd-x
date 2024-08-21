// Copyright © 2024 Navarrotech

// UI
import { Button } from '@/elements/Button'

// Iconography
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Misc
import { useTranslation } from 'react-i18next'
import { urls } from '@/constants'

export function NotFound() {
  const { t, } = useTranslation()

  return <div className="container is-max-desktop">
    <div className="block has-text-centered">
      <h1 className="title is-1">{ t('page.not_found_title') }</h1>
      <p className="subtitle is-5">{ t('page.not_found') }</p>
    </div>
    <figure className="image">
      <img src='/images/404.png' alt='404' />
    </figure>
    <div className="block buttons is-centered">
      <Button primary to={urls.campaignList}>
        <span className="icon">
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <span>{ t('page.back_to_home') }</span>
      </Button>
    </div>
  </div>
}
