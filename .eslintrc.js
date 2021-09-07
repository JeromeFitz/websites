const config = require('@jeromefitz/codestyle/.eslintrc.js')

module.exports = {
  ...config,
  extends: [...config.extends, 'next'],
}
