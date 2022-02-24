import axios from 'axios'

const BASE_URL = 'https://feematic-nest.herokuapp.com'

export const getRates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rates`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching rates')
  }
}
