// Copyright © 2024 Navarrotech

// Core
import { useMemo } from 'react'

// Typescript
import type { ReactNode } from 'react'
import type { AnyObjectSchema } from 'yup'
import type { Validator } from '@/modules/validators'
import type { T } from '@/types'

// Hooks
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

// Validators
import { ValidationError } from 'yup'
import { yup } from '@/modules/validators'
import { startCase } from 'lodash-es'

export function useValidator<T = Record<string, any>>(validator: AnyObjectSchema, data: T) {
  const { t, } = useTranslation()

  type DataKey = keyof typeof data

  let isValid = false
  const errors: Partial<Record<DataKey, ValidationError>> = {}
  const errorMessages: Partial<Record<DataKey, ReactNode>> = {}

  let validatedData: Partial<T> = {}
  try {
    // Attempt validation
    validatedData = validator.validateSync(data, {
      abortEarly: false,
      stripUnknown: true,
    })

    isValid = true
  }
  catch (error: any) {
    if (error instanceof ValidationError) {
      error.inner.forEach((err) => {
        errors[err.path as DataKey] = err
        errorMessages[err.path as DataKey] = showError(err, t)
      })
    }
  }

  return {
    validatedData,
    isValid,
    errorMessages,
    errors,
  }
}

export function useSchemaBuilder<T = Record<string, any>>(
  callback: Validator,
  value: T,
  deps: any[] = [],
) {
  const { i18n, t, } = useTranslation()
  const schema = useMemo(() => {
    return callback(yup, t)
  // eslint-disable-next-line
  }, [ i18n.language, ...deps ])

  const result = useValidator<T>(schema, value)

  return {
    ...result,
    schema,
  }
}

function showError(error: ValidationError | undefined, t: T): ReactNode {
  if (!error) {
    return <></>
  }

  if (error.value.length === 0) {
    return <></>
  }

  // Get the name of the field
  const path = error.path || 'This'
  const key = path?.split('.').pop() as string
  const what = startCase(key)

  const { type, params, } = error

  let message = error.message

  // If the error message is a translation key, let's attempt to translate it!
  if (i18next.exists(message)) {
    message = t(message, { what, type, })
  }
  else if (type === 'max') {
    const length = params!.max as string
    message = t('validator.max', { what, length, })
  }
  // If the error is because it was too short
  else if (type === 'min') {
    const length = params!.min as string
    message = t('validator.min', { what, length, })
  }
  else if (type === 'typeError') {
    const type = params!.type as string
    message = t('validator.type', { what, type, })
  }
  else if (type === 'optionality') {
    message = t('validator.required', { what, })
  }
  else if (type === 'oneOf') {
    message = t('validator.oneof', { what, values: params!.values as string, })
  }

  return <p id={path} className="help is-danger" key={path}>{
    message
  }</p>
}
