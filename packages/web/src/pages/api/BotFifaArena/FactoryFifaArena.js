const cheerio = require('cheerio')

export default class FactoryFifaArena {
  static async getGamesResult(data, date) {
    const $ = cheerio.load(data)
    const lines = []

    if (date) {
      $('#tb_date').each(function (date) {
        $(this).prop('value', date)
      })
    }

    $('table').each((i, element) => {
      if ($(element).find('caption').text().split('CLA').length - 1 === 1) {
        $(element)
          .find('tbody')
          .find('tr')
          .each((index, tRow) => {
            if (index > 0 && $(tRow).find('td:nth-child(4)').text().split(':').length > 2) {
              const scores = this.getScores($(tRow).find('td:nth-child(4)').text())

              lines.push({
                time: $(tRow).find('td:nth-child(1)').text(),
                video: $(tRow).find('td:nth-child(7)').find('a').attr('href') || '#',
                teamA: {
                  team: $(tRow).find('td:nth-child(2)').text(),
                  user: $(tRow).find('td:nth-child(3)').text(),
                  firstHalf: +scores.firstHalf[0],
                  secondHalf: +scores.secondHalf[0] - +scores.firstHalf[0],
                },
                teamB: {
                  team: $(tRow).find('td:nth-child(5)').text(),
                  user: $(tRow).find('td:nth-child(6)').text(),
                  firstHalf: +scores.firstHalf[1],
                  secondHalf: +scores.secondHalf[1] - +scores.firstHalf[1],
                },
              })
            }
          })
      }
    })

    return lines
  }

  static getInParentesis(line) {
    const regExp = /\(([^)]+)\)/
    const matches = regExp.exec(line)
    return matches[1]
  }

  static getBeforeParentesis(line) {
    const endFileNameIndex = line.indexOf('(')
    return line.substring(0, endFileNameIndex)
  }

  static getScores(line) {
    const firstHalf = this.getInParentesis(line)
      .split(':')
      .map((each) => Number.parseInt(each, 10))
    const secondHalf = this.getBeforeParentesis(line)
      .split(':')
      .map((each) => Number.parseInt(each, 10))
    return { firstHalf, secondHalf }
  }

}
