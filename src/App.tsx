import Loader from 'components/base/Loader'
import Calculator from 'pages/Calculator'
import { useState, useEffect } from 'react'
import { getRates } from 'services/axios'
import { useLocalStorage } from 'usehooks-ts'
import { getFixed } from 'utils'
import {
  CUSTOM_COP,
  CUSTOM_RATES,
  CUSTOM_VES
} from 'utils/constants/modal-rates.constants'
import { RatesContext } from 'utils/contexts/RatesContext'

function App() {
  const [loading, setLoading] = useState(false)
  const [cop, setCop] = useState<number>(3750)
  const [ves, setVes] = useState<number>(4.63)
  const [customRates] = useLocalStorage(CUSTOM_RATES, false)
  const [customCop, setCustomCop] = useLocalStorage(CUSTOM_COP, cop)
  const [customVes, setCustomVes] = useLocalStorage(CUSTOM_VES, cop)

  const fetchRates = async () => {
    setLoading(true)
    try {
      const { cop: COP, ves: VES } = await getRates()
      setCop(getFixed(+COP))
      setCustomCop(getFixed(+COP))
      setVes(getFixed(+VES))
      setCustomVes(getFixed(+VES))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!customRates) fetchRates()
    else {
      setCop(getFixed(+customCop))
      setVes(getFixed(+customVes))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customRates, customVes, customCop])

  return (
    <RatesContext.Provider value={{ cop, setCop, ves, setVes }}>
      <div className="flex relative justify-center items-center min-h-screen bg-[#DAF0FF] min-w-screen">
        {loading ? <Loader /> : <Calculator />}
      </div>
    </RatesContext.Provider>
  )
}

export default App
