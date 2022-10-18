import { Amount } from 'pages/Calculator'
import React from 'react'
import { formatMoney } from 'utils'

interface Props {
  amount: Amount
}

const Operation = ({ amount }: Props) => {
  const text = `${formatMoney(Number(amount.value))}${amount.currency}`
  // Get small text class if text is so long
  const getTextResponsive = () => {
    if (text.length > 18) {
      return 'text-2xl'
    }
    if (text.length > 12) {
      return 'text-3xl'
    }

    return 'text-5xl'
  }
  return (
    <div className={`${getTextResponsive()} font-bold text-right text-white`}>
      {text}
    </div>
  )
}

export default Operation
