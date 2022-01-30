const isDev = process.env.NODE_ENV !== 'production'
const _unsupported = ({ type }) => {
  isDev && console.dir(`@notion(_unsupported): ${type}`)
  return null
}

export default _unsupported
