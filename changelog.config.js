const changelog = require('@jeromefitz/semantic/src/changelog.config.js')
const scopes = ['', 'release']
const questions = ['type', 'subject', 'body']
module.exports = { ...changelog, questions, scopes }
