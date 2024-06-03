const isCI = require('is-ci')

let urlAdditional = undefined

if (!isCI) {
  urlAdditional = [
    '/currently/listening-to',
    '/currently/reading',
    // '/events',
    // '/events/2023/07/15/jerome-and',
    // '/shows',
    // '/shows/alex-o-jerome',
  ]
}

module.exports = require('@jeromefitz/lighthouse-config')({
  urlAdditional,
  website: 'jeromefitzgerald.com',
})
