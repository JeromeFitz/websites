/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const isCI = require('is-ci')

let urlAdditional = undefined

/**
 * @todo(turbo) 2.0.3 concern with way we pass `CI` in some cases
 */
if (!isCI) {
  urlAdditional = [
    // '/currently/listening-to',
    // '/currently/reading',
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
