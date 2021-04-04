// const changelog = require('@jeromefitz/semantic/src/changelog.config.js')
const branch = {
  format: '{branchType}{branchName}',
  projectCode: '',
  questions: ['branchName', 'branchPrefix', 'branchType'],
  ticketUrl: '',
}
const format = '{emoji}{scope} {branchName}{subject}'
const scopes = ['', 'release']
const questions = ['branchPrefix', 'type', 'scope', 'subject', 'body', 'breaking']
const theme = 'gitmoji'

module.exports = { branch, format, questions, scopes, theme }
