// const changelog = require('@jeromefitz/semantic/src/changelog.config.js')
const format = '{emoji}{scope} {subject}'
const scope = ['', 'release']
const questions = ['type', 'subject', 'body']
module.exports = { format, questions, scope }
