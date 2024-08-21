// Copyright © 2024 Navarrotech

import { useTranslation } from 'react-i18next'

type Props = {
  title: string
  onYes: () => void
  onNo?: () => void
  onCancel: () => void
  children: React.ReactNode
  yesText?: string
  noText?: string
}

export default function Confirm({ title, onYes, onNo, onCancel, children, ...props }: Props) {
  const { t, } = useTranslation()

  return <div className="modal is-active is-confirmator">
    <div className="modal-background" onClick={onCancel}></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{ title }</p>
      </header>
      <section className="modal-card-body">{
        children
      }</section>
      <footer className="modal-card-foot buttons is-right">
        <button className="button is-danger" type="button" onClick={onNo || onCancel}>
          <span>{ props.noText || t('no') }</span>
        </button>
        <button className="button is-success" type="button" onClick={onYes}>
          <span>{ props.yesText || t('yes') }</span>
        </button>
      </footer>
    </div>
  </div>
}
