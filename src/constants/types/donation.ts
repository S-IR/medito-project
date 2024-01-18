export const possibleCurrencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'] as const
export const possibleCurrenciesSymbol = ['$', '€', '£', 'A$', 'C$'] as const
export const possibleIntervals = ['month', 'year', 'one-time'] as const

export type possibleCurrency = (typeof possibleCurrencies)[number]

export type possibleCurrencySymbol = (typeof possibleCurrenciesSymbol)[number]

export type donorData = {
  name: string
  amount: number
  currency: possibleCurrency
  profileUrl?: string
  date: Date
  id: string
}

export function getCurrencySymbol(
  currency: possibleCurrency
): possibleCurrencySymbol {
  switch (currency) {
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    case 'GBP':
      return '£'
    case 'AUD':
      return 'A$'
    case 'CAD':
      return 'C$'
  }
}

export type donationData = {
  amount: number
  currency: possibleCurrency
  fromDonor: donorData
}
