// Copyright © 2024 Navarrotech

const digitsOnlyRegex = /\D/gmi

const additionalDigits = {
  '3': '-',
  '6': ') ',
  '9': ' (',
} as const

type AdditionalDigitsKey = keyof typeof additionalDigits;

type Props = {
    phone: string
}

export default function FormatNumber({ phone, }: Props) {
  return <>{ formatNumber(phone) }</>
}

export function formatNumber(number: string) {
  // @ts-ignore
  number = number.replaceAll(digitsOnlyRegex, '')
  // Assume a US country code
  if (number.length === 10) {
    number = '1' + number
  }
  let str = ''
  for (let i = number.length; i > 0; i--) {
    const char = number[i - 1]
    const iInv = String(number.length - i) as AdditionalDigitsKey
    str = (additionalDigits[iInv] || '') + char + str
  }
  if (number.length >= 10) {
    str = '+ ' + str
  }
  return str
}
