// Copyright © 2024 Navarrotech

// Typescript
import type { Theme } from '@/modules/core/types'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

// Redux
import { dispatch, useSelector } from '@/store'
import { setTheme } from '@/modules/core/reducer'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSun,
  faMoon,
  faDesktop,
  faPalette,
} from '@fortawesome/free-solid-svg-icons'

// Components
import { Dropdown } from '@/elements/Dropdown'

type Props = {
  className?: string,
}

export function ThemeButton({ className='', }: Props) {
  const theme = useSelector((state) => state.core.theme)

  function chooseTheme(key: Theme, icon: IconDefinition) {
    return <a
      id={'theme-' + key}
      key={key}
      className={`dropdown-item ${(theme === key ? ' is-active' : '')}`}
      onClick={() => dispatch(setTheme(key))}
    >
      <div className="icon-text">
        <span className="icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="is-capitalized">{ key }</span>
      </div>
    </a>
  }

  return <Dropdown
    trigger={<>
      <span className="icon">
        <FontAwesomeIcon icon={faPalette} />
      </span>
      <span className='is-capitalized'>{ theme } Theme</span>
    </>}
    className={className}
  >
    { chooseTheme('light', faSun) }
    { chooseTheme('dark', faMoon) }
    { chooseTheme('system', faDesktop) }
  </Dropdown>
}
