/**
 * @hack some reason everything is coming here, is it `api/v1/cms/index.ts`?
 */
const nextWeirdRoutingSkipData = ['favicon.ico', 'false', 'true', 'undefined']

// @note(next) no longer used due to ISR
const revalidate = 60 * 60 * 24 // 1 day (86,400)

const CACHE_TYPES = {
  REMOTE: 'remote',
  LOCAL: 'local',
}

export { nextWeirdRoutingSkipData, revalidate, CACHE_TYPES }
