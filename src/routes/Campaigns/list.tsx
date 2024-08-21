// Copyright © 2024 Navarrotech

// Core
import { Link } from 'react-router-dom'

// UI
import { Loader } from '@/elements/Loader'
import { Button } from '@/elements/Button'

// Iconography
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faScroll } from '@fortawesome/free-solid-svg-icons'

// Utility
import { useCampaigns } from './hooks'
import moment from 'moment'

// Misc
import styles from './campaigns.module.sass'
import { urls } from '@/constants'
import { useTranslation } from 'react-i18next'

export function ListCampaigns() {
  const { t, } = useTranslation()
  const { campaigns, error, loading, } = useCampaigns()

  if (error) {
    // TODO: Add better error messages
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <Loader fullpage />
  }

  const campaignEntries = Object.entries(campaigns)

  return <div className='container is-fluid'>
    <div className='block level'>
      <div>
        <h2 className='is-size-3 icon-text has-title-font has-text-weight-bold has-text-white'>
          <span className='icon mr-2'>
            <FontAwesomeIcon icon={faScroll} />
          </span>
          <span>{ t('campaigns.list_title') }</span>
        </h2>
      </div>
      <div className='buttons is-left'>
        <Button primary to={urls.campaignCreate}>
          <span>{ t('campaigns.create') }</span>
          <span className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </Button>
      </div>
    </div>
    {
      campaignEntries.length
        ? <>
          <div className={'block ' + styles.CampaignList}>
            {
              campaignEntries.map(([ id, campaign, ]) => {
                return <Link
                  id={id}
                  key={id}
                  className={styles.CampaignItem}
                  to={urls.campaignView.replace(':id', id)}
                >
                  <div className={styles.cover} style={{
                    backgroundImage: `url('${campaign.cover}')`,
                  }}></div>
                  <div className={styles.titles}>
                    <h1 className={styles.title}>{ campaign.name }</h1>
                    <h2 className={styles.subtitle}>{
                      t('information.created_at', {
                        date: moment(campaign.createdAt).format('MMM Do YYYY'),
                      })
                    }</h2>
                  </div>
                </Link>
              })
            }
          </div>
        </>
        : <div className='block'>
          <p></p>
        </div>
    }
  </div>
}
