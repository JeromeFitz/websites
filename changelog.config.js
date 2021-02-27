const changelog = require('@jeromefitz/semantic/src/changelog.config.js')
const scopes = ['', 'release']
const questions = [
  // 'breaking',
  'type',
  // 'scope',
  'subject',
  'body',
  // 'issues',
  'lerna',
]
module.exports = { ...changelog, questions, scopes }
