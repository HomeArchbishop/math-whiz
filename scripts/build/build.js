const childProcess = require('child_process')

const buildLocalesYaml = require('./build-locales-yaml')

const isDev = process.argv.includes('--dev')
const isWatch = process.argv.includes('--watch') || isDev

async function build () {
  await buildLocalesYaml(isWatch)

  if (isDev) {
    childProcess.execSync('bunx expo start', { stdio: 'inherit' })
  } else {
    const command = './gradlew  -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=7897 assembleRelease --info'
    childProcess.execSync(command, { stdio: 'inherit' })
  }
}

build()
