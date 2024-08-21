// Copyright © 2024 Navarrotech

// Typescript
import type { Location, Params } from 'react-router'
import type { T } from '@/types'

// Logic
import { useLocation, useParams } from 'react-router'
import { useRealtimeDatabase } from './hooks'

// UI
import { Loader } from '@/elements/Loader'
import { NotFound } from '@/common/NotFound'

// Utility
import { useTranslation } from 'react-i18next'

type PathFunctionProps = Location & Readonly<Params<string>> & Record<string, any>

type Props<A = Record<string, any>> = {
  path: string | ((location: PathFunctionProps) => string),
  children: (data: A, t: T) => JSX.Element,
  onNotFound?: (location: PathFunctionProps) => JSX.Element,
  fullpage?: boolean,
}

export function RealtimeData<W = Record<string, any>>(props: Props<W>) {
  const { t, } = useTranslation()
  const params = useParams()
  const location = useLocation()

  const magic = {
    ...location,
    ...params,
  }

  const path = typeof props.path === 'function'
    ? props.path(magic)
    : props.path

  const data = useRealtimeDatabase(path)

  if (data === undefined) {
    return <Loader fullpage={props.fullpage} />
  }

  if (data === null) {
    if (!props.onNotFound) {
      return <NotFound />
    }
    return props.onNotFound(magic)
  }

  return <>{
    props.children(data, t)
  }</>
}
