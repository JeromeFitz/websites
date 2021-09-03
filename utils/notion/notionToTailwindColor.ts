const tailwindColors = {
  amber: 'amber',
  blue: 'blue',
  blueGray: 'blueGray',
  coolGray: 'coolGray',
  cyan: 'cyan',
  emerald: 'emerald',
  fuchsia: 'fuchsia',
  gray: 'gray',
  green: 'green',
  indigo: 'indigo',
  // lightBlue: 'lightBlue',
  lime: 'lime',
  orange: 'orange',
  pink: 'pink',
  purple: 'purple',
  red: 'red',
  rose: 'rose',
  sky: 'sky',
  teal: 'teal',
  trueGray: 'trueGray',
  violet: 'violet',
  warmGray: 'warmGray',
  yellow: 'yellow',
}

// const notionColors = {
//   blue: 'blue',
//   brown: 'brown',
//   default: 'default',
//   gray: 'gray',
//   green: 'green',
//   orange: 'orange',
//   pink: 'pink',
//   purple: 'purple',
//   red: 'red',
//   yellow: 'yellow',
// }

const notionMapping = {
  blue: tailwindColors['blue'],
  brown: tailwindColors['amber'],
  default: tailwindColors['fuchsia'],
  gray: tailwindColors['gray'],
  green: tailwindColors['green'],
  orange: tailwindColors['orange'],
  pink: tailwindColors['pink'],
  purple: tailwindColors['purple'],
  red: tailwindColors['red'],
  yellow: tailwindColors['yellow'],
}

const notionToTailwindColor = (notionColor) => notionMapping[notionColor]

export default notionToTailwindColor
