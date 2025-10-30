const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const localesDir = path.join(__dirname, '..', '..', 'src', 'locales')

async function buildLocalesYaml (isWatch = false) {
  fs.readdirSync(localesDir).forEach(file => {
    const yamlContent = fs.readFileSync(path.join(localesDir, file), 'utf8')
    const jsonContent = yaml.load(yamlContent)
    fs.writeFileSync(path.join(localesDir, file.replace('.yaml', '.json')), JSON.stringify(jsonContent, null, 2))
  })
  console.log('[build-locales-yaml] build locales yaml success')

  if (isWatch) {
    fs.watch(localesDir, (event, filename) => {
      if (event === 'change' && filename.endsWith('.yaml')) {
        console.log(`[build-locales-yaml] ${filename} changed, rebuild`)
        buildLocalesYaml(true)
      }
    })
  }
}

module.exports = buildLocalesYaml
