import chrome from 'chrome-aws-lambda'

const chromeExecPaths = {
  win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
}

export async function getOptions(isDev) {
  let options

  options = {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true,
  }

  return options
}
