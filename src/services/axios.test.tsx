import axios from 'axios'
import { getRates } from './OpenExchange'

jest.mock('axios')
describe('Axios Test', () => {
  it('Get test', () => {
    ;(axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({}))
    getRates()
    expect(axios.get).toHaveBeenCalled()
  })
})
