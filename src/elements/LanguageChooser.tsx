// Copyright © 2024 Navarrotech

// Redux
import { dispatch, useSelector } from '@/store'
import { setLanguage } from '@/modules/core/reducer'

// Lib
import { languageLocalizedRecord, languageToFlag, supportedLanguages } from '@/modules/i18n'

// Iconography
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// UI
import { AdvancedSelect } from './AdvancedSelect'

// Misc
import { useTranslation } from 'react-i18next'
import { Button } from './Button'

type Props = {
  buttonify?: boolean,
}

export function LanguageChooser({ buttonify, }: Props) {
  const language = useSelector((state) => state.core.language)
  const { t, i18n, } = useTranslation()

  const trigger = buttonify
    ? <Button>
      <span className="icon">
        <FontAwesomeIcon icon={faGlobeAmericas} />
      </span>
      <span>{ languageLocalizedRecord[language] }</span>
    </Button>
    : <>
      <span className="icon">
        <FontAwesomeIcon icon={faGlobeAmericas} />
      </span>
      <span>{ languageLocalizedRecord[language] }</span>
    </>

  return <AdvancedSelect
    title={t('choose_language')}
    onSelect={(value) => {
      dispatch(setLanguage(value))
      i18n.changeLanguage(value)
    }}
    className="is-up"
    options={
      supportedLanguages
        .map((key) => ({
          key,
          value: key,
          text: languageLocalizedRecord[key],
          icon: `https://flagsapi.com/${languageToFlag[key]}/flat/64.png`,
        }))
    }
    value={language}
  >{ trigger }</AdvancedSelect>
}
