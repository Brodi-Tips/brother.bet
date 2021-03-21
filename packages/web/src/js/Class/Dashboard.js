export default class Dashboard {
  constructor({
    Typed,
    $,
    developerMode,
    debugTime,
    filterRankByTarget,
    hash,
    localDB,
    middleware,
    dashTables,
    dashStatistics,
    DashTimelines,
    timeline,
  }) {
    // Constants
    this.developerMode = developerMode
    this.marketingText = [
      'Hey BRO, lets bet!!',
      'odds are going up',
      'or down, so go by LAY',
      'goaaaaaaaaal!!!!',
      'improve your profit',
    ]
    this.viewsList = ['home', 'account', 'method', 'profit', 'contact', 'game', 'robot', 'admin']

    // Variables

    // Functions
    this.debugTime = debugTime
    this.filterRankByTarget = filterRankByTarget
    this.hash = hash

    // Objects
    this.window = window
    this.Typed = Typed
    this.localDB = localDB
    this.middleware = middleware
    this.dashTables = dashTables
    this.dashStatistics = dashStatistics
    this.DashTimelines = DashTimelines
    this.timeline = timeline

    this.$ = $

    // DOM Objects
    this.updateDOM()

    // Initialization
    this.initEffect()
  }

  registerHandlers() {
    this.elBtnOpenNeural.off().click((e) => this.openNeuralFactory(e))
    this.elBtnOpenPredict.off().click((e) => this.openPredictFactory(e))
    this.elBtnCloseTrain.off().click((e) => this.closeNeuralFactory(e))
    this.elBtnClosePredict.off().click((e) => this.closePredictFactory(e))
    this.elBtnSaveTrain.off().click((e) => this.saveTrain(e))
    this.elBtnCookTrain.off().click((e) => this.cookTrain(e))
    this.elBtnCookTrainReal.off().click((e) => this.cookTrainReal(e))
    this.elBtnCookPredict.off().click((e) => this.cookPredict(e))
    this.elBtnLogout.off().click((e) => this.logout(e))
    this.elBtnFilter.off().click((e) => this.doRankFiltering(e))
    this.elBtnHistory.off().click((e) => this.openHistory(e))
    this.observer.off().click((e, params) => this[params.function](params.event))
  }

  updateDOM() {
    this.elNeuralFactory = this.$('#neuralFactory')
    this.elPredictFactory = this.$('#predictFactory')
    this.elBtnOpenNeural = this.$('#btnNeural')
    this.elBtnOpenPredict = this.$('#btnPredict')
    this.elBtnCloseTrain = this.$('#btnCloseTrain')
    this.elBtnClosePredict = this.$('#btnClosePredict')
    this.elBtnSaveTrain = this.$('#btnSaveTrain')
    this.elBtnCookTrain = this.$('#btnCookTrain')
    this.elBtnCookTrainReal = this.$('#btnCookTrainReal')
    this.elBtnCookPredict = this.$('#btnCookPredict')
    this.elBtnLogout = this.$('#btnLogout')
    this.elBtnFilter = this.$('.page-content thead:nth-child(2) i')
    this.elBtnHistory = this.$('.page-content tbody th:first-child')
    this.elBtnHome = this.$('#btnHome')
    this.elBarProgress = this.$('#progress')
    this.elImgLogo = this.$('#loaderLogo')
    this.elLoader = this.$('#loader')
    this.elPreloader = this.$('#preloader')
    this.elIconStatusCloud = this.$('#statusCloud')
    this.elContentSection = this.$('.page-content')
    this.elCmbUserA = this.$('#cmbUserA')
    this.elCmbUserB = this.$('#cmbUserB')
    this.elCmbTeamB = this.$('#cmbTeamB')
    this.elCmbTeamA = this.$('#cmbTeamA')
    this.elSldBatches = this.$('#sldBatches')
    this.elSldLearningRate = this.$('#sldLearningRate')
    this.elSldStart = this.$('#sldStart')
    this.elSldEnd = this.$('#sldEnd')
    this.elSldPercentValidation = this.$('#sldPercentValidation')
    this.elSldStep = this.$('#sldStep')
    this.elSldPlotPercent = this.$('#sldPlotPercent')
    this.elSldSaveEvery = this.$('#sldSaveEvery')
    this.elSliders = this.$('.slider')
    this.elChip = this.$('.mdl-chip')
    this.elObfuscator = this.$('.mdl-layout__obfuscator')
    this.elLayoutDrawer = this.$('.mdl-layout__drawer')
    this.elExtBudget = this.$('#txtBudget')
    this.MsgSnackbar = this.$('#demo-snackbar-example')
    this.observer = this.$('#observer')
  }

  async initEffect() {
    this.debugTime('initEffect')
    this.processing()
    this.preloader()
    this.cloudDone(false)
    this.DashTimelines.init(this.$, this.timeline)
    const local = await this.middleware.cloud()
    console.log(local)
    this.fillDashboard(local)
    this.initStorage()
    this.initTrain()
    this.views()
    this.typed()
    this.processing(false)
    this.updateDOM()
    this.registerHandlers()
    this.debugTime('end')
    const promiseCloud = this.middleware.cloud()
    this.fillDashboardByCloud(promiseCloud)
    this.cloudDone()
  }

  openNeuralFactory(e) {
    e.stopImmediatePropagation()
    this.elNeuralFactory.show()
  }

  openPredictFactory(e) {
    e.stopImmediatePropagation()
    this.elPredictFactory.show()
  }

  closeNeuralFactory(e) {
    e.stopImmediatePropagation()
    this.elNeuralFactory.hide()
  }

  closePredictFactory(e) {
    e.stopImmediatePropagation()
    this.elPredictFactory.hide()
  }

  saveTrain(e) {
    e.stopImmediatePropagation()
    this.localDB.setCache(this.getConfig())
  }

  cookTrain(e) {
    e.stopImmediatePropagation()
    this.getTrainIsTogether(this.getTrain)
  }

  cookTrainReal(e) {
    e.stopImmediatePropagation()
    this.getTrainIsTogether(this.getNeuralNetwork)
  }

  cookPredict(e) {
    e.stopImmediatePropagation()
    this.saveConfig()
  }

  static logout(e) {
    e.stopImmediatePropagation()
    return false
  }

  async doRankFiltering(e) {
    e.stopImmediatePropagation()
    const context = this.$(e.target).parents()[5].id.split('tabRank')[1].slice(0, 5).toLowerCase()
    const index = this.$(this.$(e.target).parents()[0]).index()
    const target = this.$(e.target).prev().attr('class')
    const teams = ''
    const btn = this.$(e.target).html()
    const tgBtn = true
    const nameScope = this.$(
      `#${this.$(e.target).parents()[5].id} .page-content tbody th:first-child`
    ).html()
    const history = this.$(e.target).parents()[5].id.split('tabRank')[1].slice(5, 15)
    const time = this.$(e.target).parents().eq(5).find('ol .selected').attr('value')

    await this.timeFilterRank(context, index, target, teams, btn, tgBtn, nameScope, history, time)
  }

  async openHistory(e) {
    e.stopImmediatePropagation()
    const context = this.$(e.target)
      .parents()[4]
      .id.split('tabRank')[1]
      .split('History')[0]
      .toLowerCase()
    const index = '1'
    const target = 'games'
    const teams = ''
    const btn = 'filter_alt'
    const tgBtn = true
    const nameScope = this.$(this.$(e.target).get(0)).html()
    const history = 'History'
    const time = this.$(e.target).parents().eq(5).find('ol .selected').attr('value')

    await this.timeFilterRank(context, index, target, teams, btn, tgBtn, nameScope, history, time)
  }

  async timelineFilter(e) {
    e.stopImmediatePropagation()
    const { id } = this.$(e.target).parents()[7]

    const context = id.split('tabRank')[1].slice(0, 5).toLowerCase()
    const index = this.getBtnFilterAndIndex(id).btnIndex
    const target = this.$(`#${id} thead:nth-child(2) tr span`).eq(index).attr('class')
    const teams = ''
    const btn = this.getBtnFilterAndIndex(id).button
    const tgBtn = false
    const nameScope = this.$(`#${id} .page-content tbody th:first-child`).html()
    const history = id.split('tabRank')[1].slice(5, 15)
    const time = this.$(e.target).attr('value')

    await this.timeFilterRank(context, index, target, teams, btn, tgBtn, nameScope, history, time)
  }

  getBtnFilterAndIndex(id) {
    const arrBtns = this.$(`#${id} thead:nth-child(2) i`)
      .map((i, each) => this.$(each).html())
      .get()
    const button = [
      ...arrBtns.reduce((r, n) => r.set(n, (r.get(n) || 0) + 1), new Map()),
    ].reduce((r, v) => (v[1] < r[1] ? v : r))[0]
    return { button, btnIndex: arrBtns.indexOf(button) }
  }

  async timeFilterRank(context, index, target, inTeams, btn, tgBtn, nameScope, history, time) {
    if (inTeams) {
      return this.filterRank(context, index, target, inTeams, btn, tgBtn, nameScope, history, time)
    }

    const [timeLabel, timeVal] = time.split('-')
    const date = {
      d: new Date(new Date().setDate(new Date().getDate() - timeVal)).toISOString().slice(0, 10),
      m: new Date(new Date().setMonth(new Date().getMonth() - timeVal)).toISOString().slice(0, 10),
      y: new Date(`01.01.${timeVal}`).toISOString().slice(0, 10),
    }[timeLabel]
    const timedSet = await this.fifa.timeFilterRank(context, date)

    return this.filterRank(context, index, target, timedSet, btn, tgBtn, nameScope, history)
  }

  async filterRank(context, index, target, teams, inBtn, tgBtn, nameScope, history) {
    let btn = inBtn
    let inverse = false

    if (tgBtn) {
      if (btn === 'filter_alt' || btn === 'arrow_downward') btn = 'arrow_upward'
      else if (btn === 'arrow_upward') btn = 'arrow_downward'

      if (btn === 'arrow_downward') inverse = true
    }

    const all = []

    if (!history) {
      const nameTeams = Object.keys(teams)
      nameTeams.forEach((nameTeam) => {
        const team = teams[nameTeam][teams[nameTeam].length - 1]
        team.name = nameTeam
        all.push(team)
      })
    } else {
      const team = teams[nameScope]
      team.forEach((turn) => {
        const newTurn = turn
        newTurn.name = nameScope
        all.push(newTurn)
      })
      this.$(`#btnTabRank${context[0].toUpperCase() + context.slice(1)}History`)[0].click()
    }

    const filteredTable = this.filterRankByTarget(all, target, inverse)
    await this.dashTables.addTableRank(context, filteredTable, index, btn, history)
    this.updateDOM()
    this.registerHandlers()
  }

  processing(status = true) {
    if (status) return this.elBarProgress.addClass('mdl-progress__indeterminate')
    this.elBarProgress.removeClass('mdl-progress__indeterminate')
    return this.preloader()
  }

  async preloader() {
    await this.elImgLogo.css('filter', 'none')
    this.elLoader.delay(2000).fadeOut('slow', () => this.elPreloader.fadeOut('slow'))
  }

  cloudDone(status = true) {
    if (!status) return this.elIconStatusCloud.css('color', 'var(--contrast_primary_color_3)')
    return this.elIconStatusCloud.css('color', 'var(--contrast_primary_color_1)')
  }

  getGameIsFilled() {
    const game = {
      teamA: { user: this.elCmbUserA.val(), team: this.elCmbTeamA.val() },
      teamB: { user: this.elCmbUserB.val(), team: this.elCmbTeamB.val() },
    }
    if (game.teamA.user && game.teamA.team && game.teamB.user && game.teamB.team) return game
    return this.snackbar('You need fill all fields to predict.')
  }

  async fillPrediction(game) {
    if (game) {
      const prediction = await this.getPredictionIsTogether(game)
      const fixed = 7
      this.$('#tablesPrediction').show()
      this.$('#teamAWin').html(prediction[0].toFixed(fixed))
      this.$('#draw').html(prediction[1].toFixed(fixed))
      this.$('#teamBWin').html(prediction[2].toFixed(fixed))
      this.$('#goalsTeamA').html(prediction[3].toFixed(fixed))
      this.$('#goalsTeamB').html(prediction[4].toFixed(fixed))
    }
  }

  getTrainIsTogether(callback) {
    const assets = this.getConfig()
    const assetsResult = JSON.parse(JSON.stringify(assets))
    assetsResult.nameDataSet = 'trainResultSet'
    callback(assetsResult)

    const assetsGoals = JSON.parse(JSON.stringify(assets))
    assetsGoals.nameDataSet = 'trainGoalsSet'
    callback(assetsGoals)
  }

  snackbar(string) {
    this.MsgSnackbar[0].MaterialSnackbar.showSnackbar({
      message: string,
    })
  }

  setBtnsState(propName, option) {
    let pos = 1
    if (option === true) pos = 0
    this.elChip.closest(propName).children().eq(1).children()[pos].click()
  }

  getBtnsState(propName) {
    const chip = this.elChip.closest(propName).children().eq(1).children()
    if (chip.css('backgroundColor') === 'var(--contrast_primary_color_1)') return true
    return false
  }

  getConfig() {
    const obj = JSON.parse(JSON.stringify(this.fifa.defaultML))
    obj.batches = this.elSldBatches.val()
    obj.learningRate = this.elSldLearningRate.val()
    obj.start = this.elSldStart.val()
    obj.end = this.elSldEnd.val()
    obj.validationPercent = this.elSldPercentValidation.val()
    obj.step = this.elSldStep.val()
    obj.plotPercent = this.elSldPlotPercent.val()
    obj.saveEvery = this.elSldSaveEvery.val()
    obj.randomize = this.getBtnsState('#btnsShuffle')
    obj.normalization = this.getBtnsState('#btnsNormalization')

    return obj
  }

  fillDashboard({ users, teams, data }) {
    this.timeFilterRank('users', '0', 'name', users, 'filter_alt', false, 'y-1990')
    this.timeFilterRank('teams', '0', 'name', teams, 'filter_alt', false, 'y-1990')
    this.dashTables.tableResultGamesCheck(2020, data)
    this.dashTables.addLastGames(data)
    this.dashStatistics.initStatistics(users, teams)
  }

  fillDashboardByCloud(promiseCloud) {
    Promise.all(promiseCloud).then((cloud) => {
      if (!cloud) this.fillDashboard(cloud)
    })
  }

  initTrain() {
    const {
      batches,
      learningRate,
      start,
      end,
      max,
      randomize,
      normalization,
      validationPercent,
      step,
      plotPercent,
    } = JSON.parse(this.localDB.getCache('machineLearning'))

    this.elSldStart.attr('max', max)
    this.elSldEnd.attr('max', max)
    this.elSldStep.attr('max', max)

    this.elSldBatches.val(batches)
    this.elSldLearningRate.val(learningRate)
    this.elSldStart.val(start)
    this.elSldEnd.val(end)
    this.elSldPercentValidation.val(validationPercent)
    this.elSldStep.val(step)
    this.elSldPlotPercent.val(plotPercent)

    this.updateLabel()

    this.setBtnsState('#btnsNormalization', normalization)
    this.setBtnsState('#btnsShuffle', randomize)
  }

  initStorage() {
    if (!this.localDB.getCache('machineLearning')) {
      this.localDB.setCache('machineLearning', JSON.stringify(this.fifa.defaultML))
    }
  }

  autoUpdateLabel() {
    this.elSliders.each((i, wrap) => {
      const range = this.$(wrap).find('.mdl-slider')
      this.$(wrap)
        .off()
        .click((e) => this.openHistory(e))
      wrap.addEventListener('input', () => {
        const values = this.$(wrap).find('.values')
        values.html(range.val())
      })
    })
  }

  updateLabel() {
    this.elSliders.each((i, wrap) => {
      const range = this.$(wrap).find('.mdl-slider')
      const values = this.$(wrap).find('.values')
      values.html(range.val())
    })
  }

  typed() {
    return new this.Typed('.typed', {
      strings: this.marketingText,
      typeSpeed: 100,
      backDelay: 0,
    })
  }

  views() {
    this.viewsList.forEach((showElement) => {
      const key = `#btn${showElement[0].toUpperCase()}${showElement.slice(1)}s`
      this.$(key).click((e) => {
        e.stopImmediatePropagation()
        this.viewsList.forEach((hideElement) => {
          this.$(`#${hideElement}`).hide()
        })
        this.elObfuscator.removeClass('is-visible')
        this.elLayoutDrawer.removeClass('is-visible')
        this.localDB.setCache('view:', showElement)
        this.$(`#${showElement}`).toggle()
        if (showElement === 'home') {
          this.elExtBudget.html('Brother.Bet')
        } else {
          this.elExtBudget.html(showElement)
        }
      })
    })
    this.elBtnHome.click()
  }
}
