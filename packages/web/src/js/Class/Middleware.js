import Fifa from '@brother.bet/Fifa'
import Database from '@brother.bet/Database'
import Api from '@brother.bet/Api'

export default class Middleware {
  constructor() {
    // Data
    this.data = []
    this.games = []
    this.aggregated = []
    this.train = []
    this.teams = []
    this.users = []
    this.addedTrain = []
    this.trainResult = []
    this.trainGoals = []
    this.train = []

    // Objects
    this.fifa = new Fifa()
    this.api = new Api('https://brother.bet').setApi()
    this.database = new Database(this.api)
  }

  async cloud() {
    const bundle = await this.database.getBundle()
    return bundle

    const { data, games, aggregated, teams, users } = await this.fifa.init(bundle)

    // this.data = data
    // this.games = games
    // this.aggregated = aggregated
    // this.teams = teams
    // this.users = users

    // return {
    //   data: this.data,
    //   games: this.games,
    //   aggregated: this.aggregated,
    //   teams: this.teams,
    //   users: this.users,
    //   train: this.train,
    //   addedTrain: this.addedTrain,
    //   trainResult: this.trainResult,
    //   trainGoals: this.trainGoals,
    //   trainValidation: this.train,
    // }
    return false
  }
}
