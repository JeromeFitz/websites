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

export {
  EMOJI_FALLBACK,
  MOTION_PAGE_VARIANTS,
  WEBKIT_BACKGROUND,
  WEBKIT_BACKGROUND_INHERIT,
  WEBKIT_BACKGROUND__BREAK,
}
