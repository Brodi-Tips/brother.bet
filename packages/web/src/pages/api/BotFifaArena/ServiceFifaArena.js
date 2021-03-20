import Scrapper from './Scrapper'
import FactoryFifaArena from './FactoryFifaArena'
const Database = require('@brother.bet/Database')
const Api = require('@brother.bet/Api')

export default class ServiceFifaArena {
  constructor() {
    this.baseUrl = 'https://brother.bet'
    this.getDatesSearch = getDatesSearch()
  }

  static async updateFifaArena(date = null) {
    try {
      const { lastDay, dateQuery } = date
        ? { lastDay: date.split('-').join('.'), dateQuery: date }
        : this.getDatesSearch()

      const contentHTML = await Scrapper.getPageHTML(
        'http://stats.cyberarena.live/results.aspx?tab=fifa21',
        dateQuery
      )

      const data = await FactoryFifaArena.getGamesResult(contentHTML, dateQuery)

      const api = new Api('https://brother.bet').api
      const database = new Database(api)

      const obj = [{ date: lastDay.split('-').join('.'), data: data, id: 'noUniqueId' }]

      await database
        .setData(dateQuery.split('-')[0], obj)
        .then((resp) => {
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    } catch (error) {
      console.log(error)
      return {
        data: {
          message: 'Estamos com indisponibilidade no momento, tente novamente mais tarde!',
          ...error,
        },
        code: 500,
      }
    }
  }

  async getDatabase(initDate) {
    try {
      const year = new Date().getFullYear()
      const availableDays = this.robot.getAvailableDays('', year, initDate)
      const database = await this.robot.mountDatabase(availableDays)
      return database
    } catch (error) {
      console.log(error)
      console.log('Error in getDatabase.')
      await this.delay()
      return this.getDatabase(initDate)
    }
  }

  static getDatesSearch() {
    const date = new Date()
    date.setHours(date.getHours() + 2)
    date.setDate(date.getDate())

    const lastDay = `${date.getFullYear()}.${`0${date.getMonth() + 1}`.slice(
      -2
    )}.${`0${date.getDate()}`.slice(-2)}`
    const dateQuery = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
      -2
    )}-${`0${date.getDate()}`.slice(-2)}`

    return { lastDay: lastDay, dateQuery: dateQuery }
  }
}
