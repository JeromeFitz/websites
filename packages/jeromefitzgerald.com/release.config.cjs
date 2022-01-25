const { releaseConfig } = require('../../release.config.cjs')

// const { name } = require('./package.json')

// const plugins = pluginOptions(releaseConfig.plugins, {})
// const config = { ...releaseConfig, plugins, tagFormat: `${name}@\${version}` }
const config = { ...releaseConfig, tagFormat: `website-v\${version}` }

module.exports = config
