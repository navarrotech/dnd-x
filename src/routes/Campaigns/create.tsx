// Copyright © 2024 Navarrotech

import { Button } from '@/elements/Button'
import { useState } from 'react'
import { useSchemaBuilder } from '@/common/useValidator'
import { createCampaign } from './utility'
import { urls } from '@/constants'
import { useNavigate } from 'react-router'
import { t } from 'i18next'

export function CreateCampaign() {
  const navigate = useNavigate()

  const [ name, setName, ] = useState<string>('')
  const [ description, setDescription, ] = useState<string>('')

  const { isValid, errorMessages, } = useSchemaBuilder((yup) => yup.object().shape({
    name: yup
      .string()
      .max(64)
      .required(),
    description: yup
      .string()
      .max(512)
      .notRequired(),
  }), { name, description, })

  async function submit() {
    if (!isValid) {
      return
    }

    // TODO: This could throw an error
    const campaignKey = await createCampaign(name, description)

    // Redirect to the new campaign
    navigate(
      urls.campaignView.replace(':id', campaignKey),
    )
  }

  return <section className="section">
    <div className="container is-max-fullhd">
      <div className="block level">
        <div className="block">
          <h1 className="title">{ t('campaigns.create' ) }</h1>
          <h2 className="subtitle">{ t('campaigns.create_subtitle' ) }</h2>
        </div>
      </div>
      <div className="block">
        <div className="field">
          <div className="control">
            <div className="field">
              <label className="label">{ t('campaigns.campaign_name' ) }</label>
              <div className="control">
                <input
                  autoFocus
                  className="input is-medium"
                  type="text"
                  autoComplete='off'
                  placeholder="Campaign Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submit()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        { errorMessages.name }
        <div className="field">
          <div className="control">
            <div className="field">
              <label className="label">{ t('campaigns.description') }</label>
              <div className="control">
                <textarea
                  className="textarea is-medium"
                  placeholder="Describe your campaign..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={({ key, target, ctrlKey, }) => {
                    if ([ 'Esc', 'Escape', ].includes(key)) {
                      // @ts-ignore
                      target.blur()
                    }
                    else if (key === 'Enter' && ctrlKey) {
                      submit()
                    }
                  }}
                ></textarea>
              </div>
              {/* eslint-disable-next-line */}
              <p className='help has-text-right'>{ description.length } / 512</p>
            </div>
          </div>
        </div>
        { errorMessages.description }
      </div>
      <div className="block buttons is-right">
        <Button primary onClick={submit} disabled={!isValid}>
          <span>{ t('actions.save_and_continue') }</span>
        </Button>
      </div>
    </div>
  </section>
}
