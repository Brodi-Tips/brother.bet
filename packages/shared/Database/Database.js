module.exports = class Database {
  constructor(api) {
    this.delay = this.delay()
    this.api = api
  }

  async setData(year, database) {
    try {
      const response = await this.api.post(`/fifaArena?year=${year}`, database)
      return response.data
    } catch (error) {
      console.log(error)
      console.log('Error in update cloud.')
      await this.delay()
      return this.updateCloud(year)
    }
  }

  async getBundle(year = new Date().getFullYear()) {
    try {
      const response = await this.api.get(`/fifaArena?year=${year}`)
      if (response.data) return response.data
    } catch (error) {
      console.log(error)  
    }
  }

  async getData(date = '2020.03.01') {
    try {
      const response = await this.api.get(`/fifaArenaDates?date=${date}`)
      return response.data
    } catch (error) {
      return console.log(error)
    }
  }

  async getDays(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArenaDays?year=${year}`)
      return response.data
    } catch (error) {
      return console.log(error)
    }
  }

  async deleteData(date) {
    try {
      const response = await this.api.delete(`/fifaArena?date=${date}`)
      return response.data
    } catch (error) {
      console.log(error)
      console.log('Error in delete data day.')
      await this.delay()
      return this.deleteDataDay(date)
    }
  }

  async getConsistency(type = 'whole') {
    try {
      const response = await this.api.get(`/databaseConsistency?type=${type}`)
      return response.data
    } catch (error) {
      return console.log(error)
    }
  }

  async postConsistency(data, type = 'whole') {
    try {
      const response = await this.api.post(`/databaseConsistency?type=${type}`, data)
      return response.data
    } catch (error) {
      return console.log(error)
    }
  }
  delay(timeSeconds = 10) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeSeconds * 1000)
    })
  }
}
