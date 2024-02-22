const isCI = require('is-ci')

let urlAdditional = undefined

if (!isCI) {
  urlAdditional = [
    '/books',
    // '/events',
    // '/events/2023/07/15/jerome-and',
    '/music',
    // '/shows',
    // '/shows/alex-o-jerome',
  ]
}

module.exports = require('@jeromefitz/lighthouse-config')({
  urlAdditional,
  website: 'jeromefitzgerald.com',
})
