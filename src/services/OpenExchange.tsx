import axios from 'axios'
export interface Rates {
  VES: number
  COP: number
}

export interface OpenExchangeAPI {
  disclaimer?: string
  license?: string
  timestamp?: number
  base?: string
  rates?: Rates
}

export const getRates = async (): Promise<Rates> => {
  try {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${
      import.meta.env.VITE_OPEN_EXCHANGE_API_KEY
    }`
    const { data } = await axios.get<OpenExchangeAPI>(url)
    if (data?.rates) {
      const { VES, COP } = data.rates
      return {
        VES,
        COP
      }
    }
  } catch (error) {
    console.error('Error getting rates', error)
  }
  return { VES: 9, COP: 4500 }
}
