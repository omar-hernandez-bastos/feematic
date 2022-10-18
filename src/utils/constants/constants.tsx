export enum ActionsPad {
  CLEAR = 'AC',
  C = 'C',
  DECIMAL = '.',
  CREDIT_CARD = '💳'
}
export const pads = [
  { id: 1, text: '🇨🇴', className: 'col-span-2', color: 'cyan-200' },
  { id: 2, text: '🇺🇸', className: 'col-span-2', color: 'gray-100' },
  { id: 4, text: '7', className: '' },
  { id: 5, text: '8', className: '' },
  { id: 6, text: '9', className: '' },
  { id: 3, text: '🇻🇪', className: '' },
  { id: 7, text: '4', className: '' },
  { id: 8, text: '5', className: '' },
  { id: 9, text: '6', className: '' },
  { id: 3, text: '💳', className: '' },
  { id: 10, text: '1', className: '' },
  { id: 11, text: '2', className: '' },
  { id: 12, text: '3', className: '' },
  { id: 13, text: ActionsPad.C, className: '' },
  { id: 14, text: '0', className: 'col-span-2' },
  { id: 15, text: ActionsPad.DECIMAL, className: '' },
  { id: 16, text: ActionsPad.CLEAR, className: '' }
]

export type CURRENCIES = '🇨🇴' | '🇺🇸' | '🇻🇪'
const currencies = {
  COP: '🇨🇴',
  USD: '🇺🇸',
  VES: '🇻🇪'
}
export const CURRENCIES_ARRAY = [currencies.USD, currencies.COP, currencies.VES]
export { currencies }

export const COP_DEFAULT = 3800
export const VES_DEFAULT = 4.5
