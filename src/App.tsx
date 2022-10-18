import Calculator from 'pages/Calculator'
import { useState, useEffect } from 'react'
import { getRates } from 'services/OpenExchange'
import { useLocalStorage } from 'usehooks-ts'
import { getFixed } from 'utils'
import {
  CUSTOM_COP,
  CUSTOM_RATES,
  CUSTOM_VES
} from 'utils/constants/modal-rates.constants'
import { RatesContext } from 'utils/contexts/RatesContext'

function App() {
  const [cop, setCop] = useState<number>(4500)
  const [ves, setVes] = useState<number>(8)
  const [customRates, setCustomRates] = useLocalStorage(CUSTOM_RATES, false)
  const [customCop, setCustomCop] = useLocalStorage(CUSTOM_COP, cop)
  const [customVes, setCustomVes] = useLocalStorage(CUSTOM_VES, cop)

  useEffect(() => {
    //Fetch Rates from server and update states
    const fetchRates = async () => {
      try {
        const { COP: cop, VES: ves } = await getRates()
        setCop(getFixed(Number(cop)))
        setCustomCop(getFixed(Number(cop)))
        setVes(getFixed(Number(ves)))
        setCustomVes(getFixed(Number(ves)))
        setCustomRates(false)
      } catch (error) {
        console.error(error)
      }
    }

    if (!customRates) fetchRates()
    else {
      setCop(getFixed(Number(customCop)))
      setVes(getFixed(Number(customVes)))
    }
  }, [customRates])

  return (
    <RatesContext.Provider value={{ cop, setCop, ves, setVes }}>
      <div className="flex relative justify-center items-center min-h-screen bg-[#DAF0FF] min-w-screen">
        <Calculator />
      </div>
    </RatesContext.Provider>
  )
}

export default App
