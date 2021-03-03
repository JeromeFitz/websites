// const changelog = require('@jeromefitz/semantic/src/changelog.config.js')
const format = '{emoji}{scope} {subject}'
const scopes = ['', 'release']
const questions = ['type', 'scope', 'subject', 'body', 'breaking']
module.exports = { format, questions, scopes }
