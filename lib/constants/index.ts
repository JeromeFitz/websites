import IMAGE__FALLBACKS__SHOWS from '~lib/constants/images/shows'

const SLUG__HOMEPAGE = 'homepage'

const EMOJI_FALLBACK = '🍕️'

const MOTION_PAGE_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

const WEBKIT_BACKGROUND = {
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const WEBKIT_BACKGROUND_INHERIT = {
  WebkitBackgroundClip: 'inherit',
  WebkitTextFillColor: 'transparent',
}

const WEBKIT_BACKGROUND__BREAK = {
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'inherit',
}

export type TIME_RANGE_ITEM_PROPS = {
  description: string
  time_range: string
  title: string
  value: string
}
export type TIME_RANGE_PROPS = {
  [id: string]: TIME_RANGE_ITEM_PROPS
}

const TIME_RANGE: TIME_RANGE_PROPS = {
  // All-Time
  long: {
    description: 'Since March 2020.',
    time_range: 'long_term',
    title: 'All-Time',
    value: 'long_term',
  },
  // ~6 Months
  medium: {
    description: 'Half a year of music.',
    time_range: 'medium_term',
    title: '~6 Months',
    value: 'medium_term',
  },
  // ~1 Month
  short: {
    description: 'The latest and greatest.',
    time_range: 'short_term',
    title: '~1 Month',
    value: 'short_term',
  },
}

const IMAGE__PLACEHOLDER = {
  meta: {
    base64:
      'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z',
    img: {
      src: 'https://i.scdn.co/image/ab67616d0000b273a33ac83de4bc24bbf75c8b60',
      width: 640,
      height: 640,
      type: 'jpg',
    },
    slug: 'httpsiscdncoimageab67616d0000b273a33ac83de4bc24bbf75c8b60',
    url: 'https://i.scdn.co/image/ab67616d0000b273a33ac83de4bc24bbf75c8b60',
  },
}

// ref: https://bigheads.io/editor?accessory=none&body=chest&circleColor=blue&clothing=dressShirt&clothingColor=black&eyebrows=leftLowered&eyes=dizzy&faceMask=true&faceMaskColor=black&facialHair=stubble&graphic=none&hair=short&hairColor=blonde&hat=none&hatColor=black&lashes=true&lipColor=red&mask=false&mouth=grin&skinTone=light
const BIG_HEAD_PROPS = {
  accessory: 'none',
  body: 'chest',
  circleColor: 'blue',
  clothing: 'dressShirt',
  clothingColor: 'black',
  eyebrows: 'leftLowered',
  eyes: 'dizzy',
  faceMask: true,
  faceMaskColor: 'black',
  facialHair: 'stubble',
  graphic: 'none',
  hair: 'short',
  hairColor: 'blonde',
  hat: 'none',
  hatColor: 'black',
  lashes: true,
  lipColor: 'red',
  mask: false,
  mouth: 'grin',
  skinTone: 'light',
}

export {
  BIG_HEAD_PROPS,
  EMOJI_FALLBACK,
  IMAGE__FALLBACKS__SHOWS,
  IMAGE__PLACEHOLDER,
  MOTION_PAGE_VARIANTS,
  SLUG__HOMEPAGE,
  TIME_RANGE,
  WEBKIT_BACKGROUND,
  WEBKIT_BACKGROUND_INHERIT,
  WEBKIT_BACKGROUND__BREAK,
}
