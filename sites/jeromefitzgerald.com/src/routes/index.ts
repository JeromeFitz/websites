import dynamic from 'next/dynamic'

/**
 * @note This is done by a combination of:
 * - routeType
 * - dataType
 *
 * Both coming from DatabaseInfo which enables:
 * - specificty for routes that need it
 * - generalization for routes that do not
 *
 *
 * @todo Make this a bit more typesafe and dynamic
 */
const getRouterNode = {
  /**
   * @generic
   */
  ['LISTING']: dynamic(() => import('./_Fallback/Listing')),
  ['SLUG']: dynamic(() => import('./_Fallback/Slug')),
  /**
   * @specific
   */
  ['BOOKS/LISTING']: dynamic(() => import('./Books/Listing')),

  ['EVENTS/LISTING']: dynamic(() => import('./Events/Listing')),
  ['EVENTS/LISTING_BY_DATE']: dynamic(() => import('./Events/Listing')),
  ['EVENTS/SLUG_BY_ROUTE']: dynamic(() => import('./Events/Slug')),

  ['PODCASTS/LISTING']: dynamic(() => import('./Podcasts/Listing')),
  // @todo(routes) This doubles for PODCASTS|EPISODES currently
  ['PODCASTS/SLUG_BY_ROUTE']: dynamic(() => import('./Podcasts/Slug')),

  ['SHOWS/LISTING']: dynamic(() => import('./Shows/Listing')),
  ['SHOWS/SLUG']: dynamic(() => import('./Shows/Slug')),
  /**
   * @todo
   */
  ['BLOG/LISTING']: dynamic(() => import('./_Fallback/Listing')),
  ['BLOG/LISTING_BY_DATE']: dynamic(() => import('./_Fallback/Listing')),
  ['BLOG/SLUG_BY_ROUTE']: dynamic(() => import('./_Fallback/Slug')),
  /**
   * @catchAll
   */
  _unsupported: dynamic(() => import('./_Fallback/Unsupported')),
}

export { getRouterNode }
