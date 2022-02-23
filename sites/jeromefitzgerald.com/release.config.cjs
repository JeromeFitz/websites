/* eslint-disable import/order */
const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: '../../.env' })

const { config: configDefault } = require('../../release.config.cjs')
const { getConfig } = require('@jeromefitz/semantic')

// const { name } = require('./package.json')

const configPassed = {
  ...configDefault,
  repositoryUrl: `https://github.com/JeromeFitz/websites`,
  tagFormat: 'website-v${version}',
}

const config = getConfig(configPassed)

module.exports = config
