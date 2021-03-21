const axios = require('axios')

module.exports = class Api {
  constructor(newOrigin) {
    this.newOrigin = newOrigin  
    this.axios = axios
  }

  setApi() {
    return this.axios.create({
      baseURL: this.newOrigin,
    })
  }
}
