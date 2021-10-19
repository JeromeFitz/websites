const config = require('@jeromefitz/codestyle/.eslintrc.js')

module.exports = {
  ...config,
  extends: [...config.extends, 'next'],
  rules: {
    ...config.rules,
    complexity: [2, 10],
  },
}
