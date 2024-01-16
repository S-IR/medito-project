
export const possibleCurrencies = ["USD"] as const
export const possibleCurrenciesSymbol = ["$"] as const
export const possibleIntervals = ['month', 'year', 'one-time'] as const

export type possibleCurrency = typeof possibleCurrencies[number]

export type possibleCurrencySymbol = typeof possibleCurrenciesSymbol[number]

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
  }
}

export type donationData = {
  amount: number
  currency: possibleCurrency
  fromDonor: donorData
}