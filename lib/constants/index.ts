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
  base64:
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAdEAACAQQDAAAAAAAAAAAAAAAAAQIDBAYhBQcR/8QAFQEBAQAAAAAAAAAAAAAAAAAABQb/xAAZEQACAwEAAAAAAAAAAAAAAAAAAwECEiH/2gAMAwEAAhEDEQA/AI72BmXN18pvJzvJJp+a0ACkDFLriOH/2Q==',
  img: {
    src: 'https://f4.bcbits.com/img/0026174629_41.jpg',
    width: 210,
    height: 210,
    type: 'jpg',
  },
  slug: 'httpsf4bcbitscomimg0026174629_41jpg',
  url: 'https://f4.bcbits.com/img/0026174629_41.jpg',
}

export {
  EMOJI_FALLBACK,
  IMAGE__PLACEHOLDER,
  MOTION_PAGE_VARIANTS,
  TIME_RANGE,
  WEBKIT_BACKGROUND,
  WEBKIT_BACKGROUND_INHERIT,
  WEBKIT_BACKGROUND__BREAK,
}
