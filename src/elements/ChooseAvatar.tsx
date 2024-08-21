// Copyright © 2024 Navarrotech

// Core
import { useState } from 'react'

// Misc
import { avatarUrls } from '@/data/avatarUrls'
import styles from './ChooseAvatar.module.sass'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'

type Props = {
  onChoose: (url: string | null) => void
  current: string | null
}

export function ChooseAvatar({ onChoose, current, }: Props) {
  const { t, } = useTranslation()
  const [ selected, setSelected, ] = useState(current)

  return (
    <div className={'modal is-active ' + styles.ChooseAvatar}>
      <div className="modal-background" onClick={() => {
        onChoose(null)
      }}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{ t('avatars.select') }</p>
          <button className="delete" onClick={() => {
            onChoose(null)
          }}></button>
        </header>
        <section className="modal-card-body">
          <div className={styles.ChooseAvatarImages}>
            {
              avatarUrls.map((url) => <figure key={url} onClick={() => {
                setSelected(url)
              }}
              className={'image ' + (url === selected ? styles['is-selected'] : '')}>
                <img src={url} alt=""/>
              </figure>)
            }
          </div>
        </section>
        <footer className="modal-card-foot buttons is-right">
          <Button onClick={() => {
            onChoose(null)
          }}>
            <span>{ t('actions.cancel') }</span>
          </Button>
          <Button primary onClick={() => {
            onChoose(selected)
          }}>
            <span>{ t('actions.save') }</span>
          </Button>
        </footer>
      </div>
    </div>
  )
}
