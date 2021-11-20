/**
 * @hack
 * This choose what website we are using.
 *
 * [x] jeromefitzgerald.com
 * [ ] jerandky.com
 * [ ] arcadecomedytheater.com
 */

export {
  DB,
  // navigationFooter,
  navigationHeader,
  nextSeo,
  PAGES,
  ROUTE_TYPES,
  SEO,
  sitemapExcludes,
  SLUG__HOMEPAGE,
} from '~config/websites/test.com'

// @todo(notion) uh, make this dynamic please haha
export const TAGS = {
  '60dd326d-687e-4e64-a49b-46bfba218ffb': {
    id: '60dd326d-687e-4e64-a49b-46bfba218ffb',
    icon: {
      emoji: '🎭️',
    },
    slug: 'improv',
    title: 'Improv',
  },
  '9ae68a2d-44d0-44c2-8e73-81c3018bbc71': {
    id: '9ae68a2d-44d0-44c2-8e73-81c3018bbc71',
    icon: {
      emoji: '🎼️',
    },
    slug: 'music',
    title: 'Music',
  },
  'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8': {
    id: 'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8',
    icon: {
      emoji: '🧑‍🎤️',
    },
    slug: 'musical',
    title: 'Musical',
  },
  '7093497b-4869-4d2f-8803-a26f4fc871d6': {
    id: '7093497b-4869-4d2f-8803-a26f4fc871d6',
    icon: {
      emoji: '🖊️',
    },
    slug: 'sketch',
    title: 'Sketch',
  },
  '4bf09af2-078e-4101-8519-3500c2d68244': {
    id: '4bf09af2-078e-4101-8519-3500c2d68244',
    icon: {
      emoji: '🎤️',
    },
    slug: 'stand-up',
    title: 'Stand-Up',
  },
}
