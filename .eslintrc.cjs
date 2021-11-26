const config = require('@jeromefitz/codestyle/.eslintrc.next.cjs')

module.exports = {
  ...config,
  parser: '@babel/eslint-parser',
}
