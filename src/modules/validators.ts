// Copyright © 2024 Navarrotech

// Core
import * as yup from 'yup'

// Typescript
import type { T } from '@/types'


export type Yup = typeof yup
export type Validator = (yup: Yup, t: T) => yup.AnyObjectSchema

export const campaignUpdateValidator: Validator = (yup) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3)
    .max(64)
    .required(),
  description: yup
    .string()
    .trim()
    .max(999)
    .required(),
})

export {
  yup,
}
