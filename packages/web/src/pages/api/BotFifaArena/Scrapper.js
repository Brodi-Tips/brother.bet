import puppeteer from 'puppeteer'
import { getOptions } from './chromiumOptions.js'

export default class Scrapper {
  constructor() {
    this.delay = this.delay()
  }
  static async getPageHTML(url, date = null) {
    const options = await getOptions()
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle2' })
    if (date) {
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Backspace')
      }
      await page.focus('#tb_date')
      await page.keyboard.type(date)
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Delete')
      }
      await page.focus('body')
    }

    await page.$eval('input[name=tb_date]', (e) => e.blur())
    await this.delay(3000)

    const content = await page.content()
    await browser.close()
    return content
  }

  static delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }
}
