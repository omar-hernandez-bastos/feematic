import Pad from 'components/base/Pad'
import ModalRates from 'components/ModalRates'
import Operation from 'components/Operation'
import Result from 'components/Result'
import { useLocalStorage } from 'usehooks-ts'
import { ActionsPad, pads } from 'utils/constants/constants'
import { CUSTOM_RATES } from 'utils/constants/modal-rates.constants'
import { useAmount } from './hooks/useAmount'

export interface Amount {
  value: string
  currency: string
}

function CalculatorComponent() {
  const { onPressPad, amount } = useAmount()

  const [customRates] = useLocalStorage(CUSTOM_RATES, false)
  //Get if pad must has active class
  const getIsActive = (text: string) => {
    return (
      (text === ActionsPad.CREDIT_CARD && customRates) ||
      amount.currency === text
    )
  }
  return (
    <div className="overflow-y-auto relative w-screen sm:w-96 h-screen sm:h-[90vh] max-h-screen bg-[#303136] sm:rounded-3xl sm:shadow-2xl">
      <ModalRates />
      <div className="flex flex-col justify-evenly p-8 w-full h-full">
        <div className="flex flex-col justify-center items-end w-full min-h-[30%]">
          <Operation amount={amount} />
          <Result amount={amount} />
        </div>
        <div className="grid flex-auto grid-cols-4 gap-3 w-full max-h-[60%]">
          {pads.map(({ id, text, className, color }) => (
            <Pad
              key={id}
              data-testid={text}
              className={className}
              onClick={() => onPressPad(text)}
              text={text}
              color={color}
              isActive={getIsActive(text)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalculatorComponent
