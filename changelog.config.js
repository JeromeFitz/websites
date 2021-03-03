// const changelog = require('@jeromefitz/semantic/src/changelog.config.js')
const format = '{emoji}{scope} {subject}'
const scopes = ['', 'release']
const questions = ['type', 'subject', 'body']
module.exports = { format, questions, scopes }
