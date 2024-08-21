// Copyright © 2024 Navarrotech

// Core
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router'

// Typescript
import type { Validator } from '@/modules/validators'
import type { FactoryType } from '@/common/Factory/types'
import type { Params, Location } from 'react-router'

// Firebase
import { database } from '@/modules/firebase'
import { ref, update } from 'firebase/database'

// Hooks
import { useSchemaBuilder } from '@/common/useValidator'

// Utility
import { isEqual } from 'lodash-es'

type useFactoryOptions<T> = {
  normalize?: (data: any) => T,
  onSave?: (data: T) => void,
}

type PathFunctionProps = Location & Readonly<Params<string>> & Record<string, any>

export function useFactory<T>(
  validator: Validator,
  root: T,
  dbPath: string | ((location: PathFunctionProps) => string),
  options: useFactoryOptions<T> = {},
): FactoryType<T> {
  // Options
  const {
    normalize,
    onSave,
  } = options

  const location = useLocation()
  const params = useParams()

  if (typeof dbPath === 'function') {
    dbPath = dbPath({
      ...location,
      ...params,
    })
  }

  // Local state that updates when parent root is updated
  // In case someone else changes the data or we init
  const [ proxy, setProxy, ] = useState<T>(
    normalize
      ? normalize(root)
      : root,
  )
  useEffect(() => {
    if (!root) {
      return
    }

    let value: T = root
    if (normalize) {
      value = normalize(root)
    }

    if (isEqual(value, proxy)) {
      return
    }

    setProxy(value)
    // eslint-disable-next-line
  }, [ root, normalize, ])

  const validimogrifier = useSchemaBuilder<T>(validator, proxy)

  type ObjectKey = keyof T

  const hasChanged = !isEqual( proxy, root )

  async function save() {
    if (!hasChanged) {
      console.log('No changes to save')
      return
    }

    if (!validimogrifier.isValid) {
      console.warn(
        'Refusing to save invalid data:',
        validimogrifier,
        { proxy, root, },
      )
      return
    }

    const updates = {
      [`${dbPath}/updatedAt`]: new Date().toUTCString(),
    }

    // Only items in the validation schema are saveable
    const fields = Object.keys(validimogrifier.schema.fields)
    fields.forEach((key) => {
      // @ts-ignore
      const value: any = validimogrifier.validatedData[key]
      if (!value) {
        console.warn('No value for key, skipping save:', key, {
          validimogrifier, proxy, root, dbPath,
        })
        return
      }
      // @ts-ignore
      updates[`${dbPath}/${key}`] = value
    })

    if (onSave) {
      onSave(proxy)
    }

    try {
      await update(
        ref(database),
        updates,
      )
    }
    catch (error: any) {
      console.error(
        'Error saving data:',
        error,
        { proxy, root, },
      )
    }
  }

  function updateLocally<K extends ObjectKey>(key: K, value: T[K]) {
    setProxy({
      ...proxy as any,
      [key]: value as any,
    })
  }

  return {
    root,
    proxy,
    save,
    updateLocally,
    hasChanged,
    errorMessages: validimogrifier.errorMessages,
    errors: validimogrifier.errors,
    isValid: validimogrifier.isValid,
    schema: validimogrifier.schema,
  }
}
