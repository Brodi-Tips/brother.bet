import axios from 'axios'

const api = axios.create({
  baseURL: 'https://brother.bet',
})

// https://brother.bet/fifaArena?year=2020

export default api
