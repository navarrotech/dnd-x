// Copyright © 2024 Navarrotech

import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEqual } from 'lodash-es'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type Option = {
  id?: string
  icon?: IconProp | string
  key: string
  value: string
  text: string
}

type Props = {
  options: string[] | Option[]
  onSelect: (value: string) => void
  isMulti?: boolean
  title?: string
  icon?: IconProp
  className?: string
  value?: string[] | string // Prop to accept value from parent
  children: React.ReactNode // Dropdown trigger content
}

export function AdvancedSelect({ options, className='', onSelect, isMulti, value = [], children, ...props }: Props) {
  const [ selectedIndex, setSelectedIndex, ] = useState<number>(0)
  const [ searchTerm, setSearchTerm, ] = useState('')
  const [ selectedValues, setSelectedValues, ] = useState<string[]>(Array.isArray(value) ? value : [ value, ])
  const [ isActive, setIsActive, ] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelectedIndex(0)
  }, [ searchTerm, ])

  useEffect(() => {
    if (!isEqual(value, selectedValues)) {
      setSelectedValues(Array.isArray(value) ? value : [ value, ])
    }
  }, [ value, ])

  useEffect(() => {
    searchRef.current?.focus()
  }, [ isActive, ])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelect = (val: string) => {
    if (isMulti) {
      setSelectedValues((prevValues) =>
        prevValues.includes(val)
          ? prevValues.filter((value) => value !== val)
          : [ ...prevValues, val, ],
      )
      onSelect(val)
    }
    else {
      setSelectedValues([ val, ])
      onSelect(val)
      setIsActive(false) // Close the dropdown on single select
    }
  }

  const handleDropdownClick = () => {
    setIsActive(!isActive)
  }

  const filteredOptions = options.filter((option) =>
    (typeof option === 'string' ? option : option.text)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredOptions.length - 1),
        )
      }
      else if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      }
      else if (event.key === 'Enter') {
        event.stopPropagation()
        event?.stopImmediatePropagation()
        event.preventDefault()
        const curr = filteredOptions[selectedIndex]
        if (curr) {
          handleSelect(typeof curr === 'string' ? curr : curr.value)
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleArrowKeys)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleArrowKeys)
    }
  }, [ dropdownRef.current, filteredOptions, selectedIndex, ])

  return (
    <div className={`dropdown advanced-select ${isActive ? 'is-active' : ''} ${className}`} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={handleDropdownClick}>
        { children }
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content">
          {
            props.title && <div className="dropdown-item">
              { props.icon && <span className="icon">
                <FontAwesomeIcon icon={props.icon} />
              </span> }
              <h3 className="title is-size-4">{props.title}</h3>
            </div>
          }
          <div className="dropdown-item">
            <div className="field">
              <div className="control has-icons-left">
                <input
                  ref={searchRef}
                  className="input is-small dropdown-search"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setIsActive(false)
                    }

                    const curr = filteredOptions[0]
                    if (event.key === 'Enter' && curr) {
                      handleSelect(typeof curr === 'string' ? curr : curr.value)
                    }
                  }}
                />
                <span className="icon is-left">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
          </div>
          <div className="dropdown-wrapper">
            {filteredOptions.map((option, index) => {
              const key = typeof option === 'string' ? option : option.key
              const val = typeof option === 'string' ? option : option.value
              const text = typeof option === 'string' ? option : option.text
              const icon = typeof option !== 'string' && option.icon ? option.icon : null
              const selected = selectedValues.includes(val)

              const highlighted = index === selectedIndex && !selected

              return (
                <a
                  className={`dropdown-item is-clickable ${highlighted ? 'is-highlighted' : ''} ${selected ? 'is-active' : ''}`}
                  key={key}
                  onClick={() => handleSelect(val)}
                >
                  {isMulti && (
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(val)}
                      onChange={() => handleSelect(val)}
                    />
                  )}
                  {icon
                    ? <span className="icon">{
                      typeof icon === 'string'
                        ? <img src={icon} alt={val} />
                        : <FontAwesomeIcon icon={icon} className="mr-2" />
                    }</span>
                    : <></>
                  }
                  { text }
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
