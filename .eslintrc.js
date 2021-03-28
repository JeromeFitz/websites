module.exports = {
  ...require('@jeromefitz/codestyle/.eslintrc.js'),
  // @hack(codestyle) why is this not getting lifted?
  parser: './node_modules/@jeromefitz/codestyle/node_modules/@babel/eslint-parser',
}
