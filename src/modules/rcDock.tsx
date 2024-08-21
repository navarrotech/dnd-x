// Copyright © 2024 Navarrotech

// This layout uses rc-dock: https://www.npmjs.com/package/rc-dock
// Which is a flexible docking layout system for React
// This is the same dock package that bigger apps like VSCode & PgAdmin4 use

import { useEffect, useRef } from 'react'

// Typescript
import type { CSSProperties } from 'react'
import type { LayoutData, TabData } from 'rc-dock'
import type { PanelId } from '@/types'

// Widgets
import { DockLayout } from 'rc-dock'
import { MapInstance } from '@/widgets/map/Map'

// Redux
import { dispatch } from '@/store'
import { setDockLayout } from '@/modules/core/reducer'

// Utility
import { panelIds } from '@/constants'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

// We can only define the size through style not CSS for some reason
const layoutStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

// A custom hook must be used for internationalization
// We can also use this to subscribe to the store to handle relevant redux changes.
// We can also use this to handle the layout of the dashboard.
export function useRcDockLayout() {
  const { t, i18n, } = useTranslation()

  // A reference to the dock layout
  const dockLayoutRef = useRef<DockLayout>(null)

  // If/when the ref is available, set the dockLayout in the store
  useEffect(() => {
    if (dockLayoutRef.current) {
      dispatch(
        setDockLayout(dockLayoutRef.current),
      )
    }
  }, [ dockLayoutRef, ])

  // When the component is unmounted, set the dockLayout to null
  useEffect(() => {
    () => {
      dispatch(
        setDockLayout(null),
      )
    }
  }, [])

  // Must be defined in the hook for internationalization
  const Panels: Record<PanelId, TabData> = useMemo(
    () => ({
      [panelIds.cesium]: {
        id: 'map', title: t('panelTitles.cesium'), content: MapInstance,
      },
      [panelIds.video]: {
        id: 'video', title: t('panelTitles.video'), content: <></>,
      },
      [panelIds.filters]: {
        id: 'filters', title: t('panelTitles.filters'), content: <></>,
      },
      [panelIds.components]: {
        id: 'components', title: t('panelTitles.components'), content: <></>,
      },
      [panelIds.trackList]: {
        id: 'trackList', title: t('panelTitles.trackList'), content: <></>,
      },
      [panelIds.trackCard]: {
        id: 'trackCard', title: t('panelTitles.trackCard'), content: <></>,
      },
      [panelIds.timeline]: {
        id: 'timeline', title: t('panelTitles.timeline'), content: <></>,
      },
    }),
    // Using eslint disable, as t can't be used to determine the dependency array (t is memoized)
    // https://github.com/aralroca/next-translate/issues/818
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ i18n.language, ],
  )

  const defaultLayout: LayoutData = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            Panels[panelIds.cesium],
          ],
        },
      ],
    },
  }

  const DockLayoutElement = <DockLayout
    ref={dockLayoutRef}
    defaultLayout={defaultLayout}
    style={layoutStyle}
  />

  return {
    DockLayoutElement,
    defaultLayout,
    dockLayoutRef,
  }
}
