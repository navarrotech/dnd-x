// Copyright © 2024 Navarrotech

// Typescript
import type { ReactNode } from 'react'
import type { AnyObjectSchema, ValidationError } from 'yup'

export type FactoryType<T> = {
  // From factory builder:
  root: T,
  proxy: T,
  save: () => Promise<void>,
  updateLocally: <K extends keyof T>(key: K, value: T[K]) => void,
  hasChanged: boolean,

  // From schema builder:
  schema: AnyObjectSchema,
  isValid: boolean,
  errors: Partial<Record<keyof T, ValidationError>>,
  errorMessages: Partial<Record<keyof T, ReactNode>>,
}
