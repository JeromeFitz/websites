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

export {
  EMOJI_FALLBACK,
  MOTION_PAGE_VARIANTS,
  TIME_RANGE,
  WEBKIT_BACKGROUND,
  WEBKIT_BACKGROUND_INHERIT,
  WEBKIT_BACKGROUND__BREAK,
}
