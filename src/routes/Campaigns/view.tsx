// Copyright © 2024 Navarrotech

// Typescript
import type { Campaign } from '@/types'

// Dynamic factory
import { useFactory } from '@/common/Factory/useFactory'
import { MakeInput } from '@/common/Factory/MakeInput'

// Iconography
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

// UI
import { RealtimeData } from '@/modules/firebase/RealtimeData'
import { Button } from '@/elements/Button'

// Utility
import { campaignUpdateValidator } from '@/modules/validators'
import { normalizeCampaign } from './utility'
import { useTranslation } from 'react-i18next'
import { newToast } from '@/modules/toasts/utility'

type Props = {
  campaign: Campaign,
}

function CampaignManager({ campaign, }: Props) {
  const { t, } = useTranslation()
  const factory = useFactory<Campaign>(
    campaignUpdateValidator,
    campaign,
    ({ id, }) => `campaigns/${id}`,
    {
      normalize: normalizeCampaign,
      onSave: () => newToast({
        message: 'Campaign details updated',
        color: 'success',
      }),
    },
  )

  return <div className="container is-max-widescreen">
    <div className="block columns">
      <div className="column">
        <MakeInput
          invisible
          resetOnBlur
          showSaveButton
          name='name'
          className='is-large'
          factory={factory}
        />
      </div>
      <div className="column">
        <div className="block buttons is-right">
          <Button primary>
            <span className="icon">
              <FontAwesomeIcon icon={faPlay} />
            </span>
            <span>{ t('actions.play') }</span>
          </Button>
        </div>
      </div>
    </div>
    <div className="block">
      <div className="block box">
        <MakeInput
          rows={8}
          isTextarea
          showCounter
          label='Public description'
          name='description'
          factory={factory}
          saveOnBlur
        />
      </div>
    </div>
  </div>
}

// This is where the actual data is loaded and passed downwards
export function ViewCampaign() {
  return <RealtimeData<Campaign>
    path={({ id, }) => `campaigns/${id}`}
    fullpage
  >{
      (campaign) => <CampaignManager
        campaign={normalizeCampaign(campaign)}
      />
    }</RealtimeData>
}
