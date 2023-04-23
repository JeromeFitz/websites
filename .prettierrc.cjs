// module.exports = {
//   ...require('@jeromefitz/prettier-config/tailwind.cjs'),
//   // tailwindConfig: './sites/jeromefitzgerald.com/tailwind.config.js',
// }
const config = require('@jeromefitz/prettier-config/index.cjs')

module.exports = {
  ...config,
  plugins: [...config.plugins, require('prettier-plugin-nativewind')],
  tailwindCustomFunctions: ['cx'],
}
