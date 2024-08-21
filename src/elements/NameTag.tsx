// Copyright © 2024 Navarrotech

import { useUser } from '@/modules/firebase/hooks'

type Props = {
    size?: number
    title?: string
    subtitle?: string
}

export function NameTag({ size = 64, title, subtitle, }: Props) {
  const user = useUser()
  const { photoURL, displayName, } = user

  return <div className={'block nametag'}>
    <figure className={`image is-${size}x${size} is-rounded`}>
      <img src={photoURL} alt={displayName} referrerPolicy="no-referrer" />
    </figure>
    <div className="titles">
      <p className="has-text-weight-bold">{title ? title : displayName}</p>
      <p>{subtitle ? subtitle : 'Level 1 Apprentice'}</p>
    </div>
  </div>
}
