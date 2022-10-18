import { useContext, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { getFixed } from 'utils'
import {
  CURRENCIES_ARRAY,
  ActionsPad,
  currencies
} from 'utils/constants/constants'
import {
  CUSTOM_RATES,
  CUSTOM_COP,
  CUSTOM_VES
} from 'utils/constants/modal-rates.constants'
import { RatesContext } from 'utils/contexts/RatesContext'
import { Amount } from '..'

const MASTER_CARD_FEE = 0.03

export const useAmount = () => {
  const [amount, setAmount] = useState<Amount>({
    value: '',
    currency: currencies.USD
  })
  const { cop = 4500, ves = 8, setCop, setVes } = useContext(RatesContext)
  const [customRates, setCustomRates] = useLocalStorage(CUSTOM_RATES, false)
  const [, setCustomCop] = useLocalStorage(CUSTOM_COP, cop)
  const [, setCustomVes] = useLocalStorage(CUSTOM_VES, cop)
  const onPressPad = (value: string) => {
    if (CURRENCIES_ARRAY.includes(value))
      return setAmount({
        ...amount,
        currency: value
      })
    if (value === ActionsPad.CLEAR)
      return setAmount(({ currency }) => ({
        value: '',
        currency
      }))
    if (value === ActionsPad.C)
      return setAmount(({ currency }) => ({
        value: amount?.value?.slice(0, -1),
        currency
      }))

    if (value === ActionsPad.DECIMAL) {
      return amount?.value.includes(ActionsPad.DECIMAL)
        ? null
        : setAmount({
            value: `${amount?.value}${value}`,
            currency: amount?.currency
          })
    }
    if (value === ActionsPad.CREDIT_CARD) {
      const setFees = (isAdd: boolean) => {
        const newCop = cop + cop * MASTER_CARD_FEE * (isAdd ? 1 : -1)
        setCop?.(newCop)
        setCustomCop(getFixed(+newCop))
        const newVes = ves + ves * MASTER_CARD_FEE * (isAdd ? 1 : -1)
        setVes?.(newVes)
        setCustomVes(getFixed(+newVes))
        return setCustomRates(!isAdd)
      }
      return setFees(customRates)
    }
    return setAmount({
      value: `${amount?.value}${value}`,
      currency: amount?.currency
    })
  }
  return { onPressPad, amount }
}
