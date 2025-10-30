const childProcess = require('child_process')

const buildLocalesYaml = require('./build-locales-yaml')

const isDev = process.argv.includes('--dev')
const isWatch = process.argv.includes('--watch') || isDev

async function build () {
  await buildLocalesYaml(isWatch)

  if (isDev) {
    childProcess.execSync('npx expo start', { stdio: 'inherit' })
  } else {
    childProcess.execSync('npx expo build', { stdio: 'inherit' })
  }
}

build()
