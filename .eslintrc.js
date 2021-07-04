const config = require('@jeromefitz/codestyle/.eslintrc.js')

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'import/order': 0, // @todo
  },
}
