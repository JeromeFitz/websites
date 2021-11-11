const config = require('@jeromefitz/codestyle/.eslintrc.next.js')

module.exports = {
  ...config,
  parser: '@jeromefitz/codestyle/node_modules/@babel/eslint-parser',
}
