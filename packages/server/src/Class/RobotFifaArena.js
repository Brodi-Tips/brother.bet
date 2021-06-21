/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

require('chromedriver')
const { Builder, By, Key } = require('selenium-webdriver')
const cheerio = require('cheerio')
const fs = require('fs')

class RobotFifaArena {
  async mountDatabase(availableDays) {
    const url = 'http://stats.cyberarena.live/results.aspx?tab=fifa'
    const bundle = []

    const driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get(url)
      for (const day of availableDays) {
        const page = await this.getPage(day, driver)
        const gamesResult = this.getGamesResult(page)
        const document = this.build(day, 'noUniqueId', gamesResult)
        if (document) bundle.push(document)
      }
    } catch (error) {
      console.log(error)
    } finally {
      // await this.writeJSON(bundle);
      await driver.quit()
      const filteredDatabase = this.filterDatabase(bundle)
      return filteredDatabase
    }
  }

  filterDatabase(database) {
    const filteredDatabase = database.filter((each) => {
      if (each.data) return each.data.length > 0
      return false
    })
    return filteredDatabase
  }

  getDaysOfYear(year) {
    const allDaysOfYear = []
    for (let month = 1; month < 13; month += 1) {
      const daysOfMonth = new Date(year, month, 0).getDate()
      for (let day = 1; day < daysOfMonth + 1; day += 1) {
        const dateWithoutZeros = `${year}/${month}/${day}`
        const newDay = new Date(dateWithoutZeros).toISOString().slice(0, 10)
        allDaysOfYear.push(newDay)
      }
    }
    return allDaysOfYear
  }

  getPastDays(daysAgo = 7) {
    const today = new Date()
    const pastDay = new Date(today)
    const offsetDay = pastDay.getDate() - daysAgo

    pastDay.setDate(offsetDay)

    const formatedPastDay = pastDay.toISOString().slice(0, 10)
    return formatedPastDay
  }

  getToday() {
    const d = new Date()
    const myTZO = -180
    const myNewDate = new Date(d.getTime() + 60000 * (d.getTimezoneOffset() - myTZO))
    const today = myNewDate.toISOString().slice(0, 10)
    return today
  }

  getAvailableDays(daysThatAreNotAvailable, actualYear, firstDay) {
    const getSlicedDays = (sinceDay, days) => {
      const today = this.getToday()
      const distanceToSinceDay = days.indexOf(sinceDay)
      const distanceToToday = days.indexOf(today)
      const availableDays = days.slice(distanceToSinceDay, distanceToToday)
      return availableDays
    }

    const getFilteredDays = (daysNotAvailable, daysYear) => {
      if (daysNotAvailable) {
        const daysToFilter = daysNotAvailable.map((day) => day.replace(/\./g, '-'))
        const availableDays = daysYear.filter((s) => !daysToFilter.includes(s))
        return availableDays
      }
      return daysYear
    }

    const addToday = (days) => {
      const today = this.getToday()
      const daysAddedToday = [...days, today]
      return daysAddedToday
    }

    const daysYear = this.getDaysOfYear(actualYear)
    const daysSinceToYesterday = getSlicedDays(firstDay, daysYear)
    const filteredDays = getFilteredDays(daysThatAreNotAvailable, daysSinceToYesterday)
    const availableDays = addToday(filteredDays)
    return availableDays
  }

  async changeDate(date, page) {
    try {
      await page.evaluate(() => {
        const inputDate = document.getElementById('MainContent_tb_date')
        console.log(inputDate.value)
      })
    } catch (error) {}
  }

  getGamesResult(data) {
    const $ = cheerio.load(data)
    const lines = []

    $('table').each((i, element) => {
      if ($(element).find('caption').text().split('Cyber').length - 1 === 1) {
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

  getInParentesis(line) {
    const regExp = /\(([^)]+)\)/
    const matches = regExp.exec(line)
    return matches[1]
  }

  getBeforeParentesis(line) {
    const endFileNameIndex = line.indexOf('(')
    return line.substring(0, endFileNameIndex)
  }

  getScores(line) {
    const firstHalf = this.getInParentesis(line)
      .split(':')
      .map((each) => Number.parseInt(each, 10))
    const secondHalf = this.getBeforeParentesis(line)
      .split(':')
      .map((each) => Number.parseInt(each, 10))
    return { firstHalf, secondHalf }
  }

  async writeJSON(content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        './src/resource/download/output.json',
        JSON.stringify(content),
        'utf8',
        (err) => {
          if (!err) {
            resolve()
          } else {
            reject(err)
          }
        }
      )
    })
  }

  build(day, id, data) {
    const date = day.replace(/-/g, '.')
    return { date, id, data }
  }
}

module.exports = RobotFifaArena
