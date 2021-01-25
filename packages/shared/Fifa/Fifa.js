/* eslint-disable no-param-reassign */
const tf = require('@tensorflow/tfjs')

module.exports = class Fifa {
  constructor() {
    // Variables
    this.percentSplitMachineLearning

    // Database
    this.aggregated = []
    this.users = []
    this.teams = []
    this.data = []

    // Object
    this.tf = tf
    this.iData
  }

  static getJustData(data) {
    let arr = []
    data.forEach((each) =>
      each.data.forEach((each2) => {
        arr = [...arr, each2]
      })
    )
    return arr
  }

  static sortByDay(data) {
    data.map((each) => {
      const { date } = each
      const time = new Date(date).getTime()
      each.time = time
      return each
    })

    data.forEach((eachDay) => {
      const date = eachDay.date.split('.')
      eachDay.data.map((each) => {
        const sheduled = (each.time || '00:00').split(':')
        const timed = new Date(
          date[0],
          date[1] - 1,
          date[2],
          sheduled[0],
          sheduled[1],
          0,
          0
        ).getTime()
        each.timed = timed
        return each
      })
    })

    data.sort((a, b) => a.time - b.time)

    data.forEach((eachDay) => {
      eachDay.data.sort((a, b) => a.timed - b.timed)
    })

    return data
  }

  static getGameOutput(game) {
    const goalsA = parseInt(game.teamA.firstHalf, 10) + parseInt(game.teamA.secondHalf, 10) || 0
    const goalsB = parseInt(game.teamB.firstHalf, 10) + parseInt(game.teamB.secondHalf, 10) || 0

    const output = [0, 0, 0, goalsA, goalsB]

    if (goalsA > goalsB) {
      output[0] = 1
    } else if (goalsA === goalsB) {
      output[1] = 1
    } else {
      output[2] = 1
    }
    return output
  }

  static getGameInput(game, teams, usersIn = {}) {
    const { ranks, rankedA, rankedB } = Fifa.addAndGetRank(usersIn, game, 'user')

    const teamA = teams[game.teamA.team][teams[game.teamA.team].length - 1]
    const teamB = teams[game.teamB.team][teams[game.teamB.team].length - 1]

    const input = [
      [...Object.values(teamA), ...Object.values(rankedA)],
      [...Object.values(teamB), ...Object.values(rankedB)],
    ]

    return { input, ranks }
  }

  static addAndGetRank(ranks, game, scope) {
    const { 0: winnerIsTeamA, 1: draw, 2: winnerIsTeamB, 3: goalsTeamA, 4: goalsTeamB } = {
      ...Fifa.getGameOutput(game),
    }

    const teamA = game.teamA[scope]
    const teamB = game.teamB[scope]

    ranks = Fifa.rank(ranks, teamA, winnerIsTeamA, draw, winnerIsTeamB, goalsTeamA, goalsTeamB)
    // eslint-disable-next-line no-param-reassign
    ranks = Fifa.rank(ranks, teamB, winnerIsTeamB, draw, winnerIsTeamA, goalsTeamB, goalsTeamA)

    const rankedA = ranks[teamA][ranks[teamA].length - 1]
    const rankedB = ranks[teamB][ranks[teamB].length - 1]

    return { ranks, rankedA, rankedB }
  }

  static rank(ranks, nameScope, win, draw, loss, goalsPro, goalsCon) {
    let team = {}
    if (ranks[nameScope]) team = ranks[nameScope][ranks[nameScope].length - 1]

    let isBothScore = 0
    let isUnderHalf = 0
    let isUnderOneAndHalf = 0
    let isUnderTwoAndHalf = 0
    let isUnderThreeAndHalf = 0
    let isUnderFourAndHalf = 0
    let isOverHalf = 0
    let isOverOneAndHalf = 0
    let isOverTwoAndHalf = 0
    let isOverThreeAndHalf = 0
    let isOverFourAndHalf = 0

    if (goalsPro > 0 && goalsCon > 0) isBothScore = 1

    if (goalsPro < 0.5) isUnderHalf = 1
    if (goalsPro < 1.5) isUnderOneAndHalf = 1
    if (goalsPro < 2.5) isUnderTwoAndHalf = 1
    if (goalsPro < 3.5) isUnderThreeAndHalf = 1
    if (goalsPro < 4.5) isUnderFourAndHalf = 1

    if (goalsPro > 0.5) isOverHalf = 1
    if (goalsPro > 1.5) isOverOneAndHalf = 1
    if (goalsPro > 2.5) isOverTwoAndHalf = 1
    if (goalsPro > 3.5) isOverThreeAndHalf = 1
    if (goalsPro > 4.5) isOverFourAndHalf = 1

    const gamesCount = team.games || 0
    const rise = gamesCount + 1

    team = {
      games: gamesCount + 1,
      wins: ((team.wins || 0) * gamesCount + win) / rise,
      draws: ((team.draws || 0) * gamesCount + draw) / rise,
      losses: ((team.losses || 0) * gamesCount + loss) / rise,
      goalsPro: ((team.goalsPro || 0) * gamesCount + goalsPro) / rise,
      goalsCon: ((team.goalsCon || 0) * gamesCount + goalsCon) / rise,
      bothScore: ((team.bothScore || 0) * gamesCount + isBothScore) / rise,
      underHalf: ((team.underHalf || 0) * gamesCount + isUnderHalf) / rise,
      underOneAndHalf: ((team.underOneAndHalf || 0) * gamesCount + isUnderOneAndHalf) / rise,
      underTwoAndHalf: ((team.underTwoAndHalf || 0) * gamesCount + isUnderTwoAndHalf) / rise,
      underThreeAndHalf: ((team.underThreeAndHalf || 0) * gamesCount + isUnderThreeAndHalf) / rise,
      underFourAndHalf: ((team.underFourAndHalf || 0) * gamesCount + isUnderFourAndHalf) / rise,
      overHalf: ((team.overHalf || 0) * gamesCount + isOverHalf) / rise,
      overOneAndHalf: ((team.overOneAndHalf || 0) * gamesCount + isOverOneAndHalf) / rise,
      overTwoAndHalf: ((team.overTwoAndHalf || 0) * gamesCount + isOverTwoAndHalf) / rise,
      overThreeAndHalf: ((team.overThreeAndHalf || 0) * gamesCount + isOverThreeAndHalf) / rise,
      overFourAndHalf: ((team.overFourAndHalf || 0) * gamesCount + isOverFourAndHalf) / rise,
    }

    ranks[nameScope] = [...(ranks[nameScope] || []), ...([team] || [])]

    return ranks
  }

  static getRankTeams(games) {
    let teams = {}
    games.forEach((game) => {
      const { ranks } = Fifa.addAndGetRank(teams, game, 'team')
      teams = ranks
    })
    return teams
  }

  static getRankUsers(games, teams) {
    let users = {}
    games.forEach((game) => {
      const { ranks } = Fifa.getGameInput(game, teams, users)
      users = ranks
    })
    return users
  }

  static aggTrain(games, teams) {
    const agg = []
    let users = {}
    games.forEach((game) => {
      const output = Fifa.getGameOutput(game)
      const { input, ranks } = Fifa.getGameInput(game, teams, users)
      users = ranks
      agg.push({ input, output })
    })
    return { agg, users }
  }

  addedTrain(data) {
    const inputs = []
    data.input.forEach((each) => {
      const tensorA = this.tf.tensor(each[0])
      const tensorB = this.tf.tensor(each[1])
      const tensorInput = tensorA.sub(tensorB)
      const input = Array.from(tensorInput.dataSync())
      inputs.push(input)

      tensorA.dispose()
      tensorB.dispose()
      tensorInput.dispose()

      return input
    })

    return { input: inputs, output: data.output }
  }

  static splitInputOutput(data) {
    const input = []
    const output = []
    data.forEach((each) => {
      input.push(each.input)
      output.push(each.output)
    })
    return { input, output }
  }

  static getTrainValidation(data, percentTrainSet) {
    const trainSet = {
      input: [],
      output: [],
    }

    const validationSet = {
      input: [],
      output: [],
    }

    let max = data.input.length

    const maxTrainSamples = Math.floor(max * percentTrainSet)
    const maxValidationSamples = max - maxTrainSamples

    for (let i = maxTrainSamples; i > 0; i -= 1) {
      const rand = Math.floor(Math.random() * Math.floor(max))
      trainSet.input.push(data.input[rand])
      trainSet.output.push(data.output[rand])
      data.input.splice(rand, 1)
      data.output.splice(rand, 1)
      max -= 1
    }

    for (let i = maxValidationSamples; i > 0; i -= 1) {
      const rand = Math.floor(Math.random() * Math.floor(max))
      validationSet.input.push(data.input[rand])
      validationSet.output.push(data.output[rand])
      max -= 1
    }

    return { trainSet, validationSet }
  }

  static spliceResultOutput(data) {
    const { input } = data
    const output = data.output.map((each) => each.slice(0, 3))
    return { input, output }
  }

  static spliceGoalsOutput(data) {
    const { input } = data
    const output = data.output.map((each) => each.slice(3, 6))
    return { input, output }
  }

  async timeFilterRank(context, date) {
    const time = new Date(date).getTime()
    const timedSet = this.data.filter(
      (each) => new Date(each.date.split('.').join('-')).getTime() > time
    )
    const gamesSet = Fifa.getJustData(timedSet)
    const teamsSet = Fifa.getRankTeams(gamesSet)
    if (context === 'teams') return teamsSet
    return Fifa.getRankUsers(gamesSet, teamsSet)
  }

  async getData(frontData) {
    let bundle = frontData
    if (!frontData) bundle = await this.iData.get()
    return bundle
  }

  async dataTooler(data) {
    return new Promise((resolve) => {
      const { dataSet, gamesSet, aggregatedSet, teamsSet, usersSet } = this.dataToolerSync(data)

      resolve({
        dataSet,
        gamesSet,
        aggregatedSet,
        teamsSet,
        usersSet,
      })

      const trainSet = Fifa.splitInputOutput(aggregatedSet)
      const addedTrainSet = this.addedTrain(trainSet)
      const trainResultSet = Fifa.spliceResultOutput(trainSet)
      const trainGoalsSet = Fifa.spliceGoalsOutput(trainSet)
      const trainValidationSets = Fifa.getTrainValidation(
        trainSet,
        this.percentSplitMachineLearning
      )

      this.saveDB({
        dataSet,
        gamesSet,
        aggregatedSet,
        trainSet,
        teamsSet,
        usersSet,
        addedTrainSet,
        trainResultSet,
        trainGoalsSet,
        trainValidationSets,
      })
    })
  }

  async dataToolerSync(data) {
    const dataFiltered = data.filter((each) => each.data.length)
    const dataSet = Fifa.sortByDay(dataFiltered)
    const gamesSet = Fifa.getJustData(dataSet)
    const teamsSet = Fifa.getRankTeams(gamesSet)
    const { agg: aggregatedSet, users: usersSet } = Fifa.aggTrain(gamesSet, teamsSet)

    return {
      dataSet,
      gamesSet,
      aggregatedSet,
      teamsSet,
      usersSet,
    }
  }

  async dataToolerMachineLearning(data) {
    return new Promise((resolve) => {
      const dataFiltered = data.filter((each) => each.data.length)
      const dataSet = Fifa.sortByDay(dataFiltered)
      const gamesSet = Fifa.getJustData(dataSet)
      const teamsSet = Fifa.getRankTeams(gamesSet)
      const { agg: aggregatedSet, users: usersSet } = Fifa.aggTrain(gamesSet, teamsSet)
      const trainSet = Fifa.splitInputOutput(aggregatedSet)
      const addedTrainSet = this.addedTrain(trainSet)
      const trainResultSet = Fifa.spliceResultOutput(trainSet)
      const trainGoalsSet = Fifa.spliceGoalsOutput(trainSet)
      const trainValidationSets = Fifa.getTrainValidation(
        trainSet,
        this.percentSplitMachineLearning
      )

      resolve({
        dataSet,
        gamesSet,
        aggregatedSet,
        trainSet,
        teamsSet,
        usersSet,
        addedTrainSet,
        trainResultSet,
        trainGoalsSet,
        trainValidationSets,
      })

      this.saveDB({
        dataSet,
        gamesSet,
        aggregatedSet,
        trainSet,
        teamsSet,
        usersSet,
        addedTrainSet,
        trainResultSet,
        trainGoalsSet,
        trainValidationSets,
      })
    })
  }

  async saveDB({
    dataSet,
    gamesSet,
    aggregatedSet,
    trainSet,
    teamsSet,
    usersSet,
    addedTrainSet,
    trainResultSet,
    trainGoalsSet,
    trainValidationSets,
  }) {
    this.iData.set({ dataSet })
    this.iData.set({ gamesSet })
    this.iData.set({ aggregatedSet })
    this.iData.set({ trainSet })
    this.iData.set({ teamsSet })
    this.iData.set({ usersSet })
    this.iData.set({ addedTrainSet })
    this.iData.set({ trainResultSet })
    this.iData.set({ trainGoalsSet })
    this.iData.set({ trainValidationSets })
  }

  static isTruncated(data) {
    const truncatedLogs = []

    const isValid = (inData) => {
      if (Number.isNaN(inData)) return 'Is NaN!'
      if (inData === true) return 'Is true!'
      if (inData === false) return 'Is false!'
      if (inData === null) return 'Is null!'
      if (inData === undefined) return 'Is undefined!'
      if (inData === '') return "Is ''!"
      return false
    }

    const validate = (dataTest, obj, context) => {
      const testValidation = isValid(dataTest)
      if (testValidation) {
        obj.problems[context] = testValidation
        return obj
      }
      return obj
    }

    data.forEach((eachA) => {
      eachA.data.forEach((eachB, indexOf) => {
        let objContext = {
          date: eachA.date,
          id: eachA.id,
          position: indexOf,
          data: eachB,
          problems: {},
        }

        objContext = validate(eachB.teamA.firstHalf, objContext, 'teamA.firstHalf')
        objContext = validate(eachB.teamA.secondHalf, objContext, 'teamA.secondHalf')
        objContext = validate(eachB.teamB.firstHalf, objContext, 'teamB.firstHalf')
        objContext = validate(eachB.teamB.secondHalf, objContext, 'teamB.secondHalf')

        if (Object.keys(objContext.problems).length) truncatedLogs.push(objContext)
      })
    })

    return truncatedLogs
  }

  async initMachineLearning(frontData) {
    const bundle = await this.getData(frontData)

    return new Promise((resolve) => {
      const {
        dataSet,
        gamesSet,
        aggregatedSet,
        trainSet,
        teamsSet,
        usersSet,
        addedTrainSet,
        trainResultSet,
        trainGoalsSet,
        trainValidationSets,
      } = this.dataToolerMachineLearning(bundle)

      resolve({
        data: dataSet,
        games: gamesSet,
        aggregated: aggregatedSet,
        train: trainSet,
        teams: teamsSet,
        users: usersSet,
        addedTrain: addedTrainSet,
        trainResult: trainResultSet,
        trainGoals: trainGoalsSet,
        trainValidation: trainValidationSets,
      })

      this.saveDB({
        dataSet,
        gamesSet,
        aggregatedSet,
        trainSet,
        teamsSet,
        usersSet,
        addedTrainSet,
        trainResultSet,
        trainGoalsSet,
        trainValidationSets,
      })
    })
  }

  async init(frontData) {
    const bundle = await this.getData(frontData)

    return new Promise((resolve) => {
      const { dataSet, gamesSet, aggregatedSet, teamsSet, usersSet } = this.dataTooler(bundle)

      resolve({
        data: dataSet,
        games: gamesSet,
        aggregated: aggregatedSet,
        teams: teamsSet,
        users: usersSet,
      })
    })
  }
}
