import plugin from 'tailwindcss/plugin'

/**
 * @note(tailwind) hover + focus = hocus
 */
const hocusPlugin = plugin(({ addVariant }) => {
  addVariant('hocus-visible', ['&:hover', '&:focus-visible'])
  addVariant('hocus-within', ['&:hover', '&:focus-within'])
  addVariant('hocus', ['&:hover', '&:focus'])

  addVariant('group-hocus-visible', [
    ':merge(.group):hover &',
    ':merge(.group):focus-visible &',
  ])
  addVariant('group-hocus-within', [
    ':merge(.group):hover &',
    ':merge(.group):focus-within &',
  ])
  addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus &'])

  addVariant('peer-hocus-visible', [
    ':merge(.peer):hover ~ &',
    ':merge(.peer):focus-visible ~ &',
  ])
  addVariant('peer-hocus-within', [
    ':merge(.peer):hover ~ &',
    ':merge(.peer):focus-within ~ &',
  ])
  addVariant('peer-hocus', [':merge(.peer):hover ~ &', ':merge(.peer):focus ~ &'])
})

export default hocusPlugin
