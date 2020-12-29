import getEventsUrl from '~lib/notion/utils/getEventsUrl'

// const isDebug = false

export const getNotionLink = ({
  slug,
  routeType = 'blog',
  episode = null,
  itemDate = {
    year: null,
    month: null,
    date: null,
  },
}) => {
  let url
  // isDebug && console.dir(`> getNotionLink: ${routeType}`)
  // isDebug && console.dir(`> itemDate`)
  // isDebug && console.dir(itemDate)
  switch (routeType) {
    case 'pages': {
      url = `/${slug}`
      break
    }
    case 'blog':
    case 'events': {
      if (!itemDate) {
        break
      }
      url = getEventsUrl(`/${routeType}`, itemDate, slug)
      break
    }
    default: {
      url = `/${routeType}/${slug}`
      break
    }
  }

  /**
   * @todo `podcasts` has an `[episode]` slug... should we call this tertiary?
   */
  if (routeType === 'podcasts' && !!episode) {
    url = `/${routeType}/${slug}/${episode}`
  }

  return url
}

export const getDateStr = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}

export const postIsPublished = (post: any) => {
  // return process.env.NODE_ENV !== 'production' || post.Published === 'Yes'
  // @todo(published)
  return post.Published === 'Yes'
}

export const normalizeSlug = (slug) => {
  if (typeof slug !== 'string') return slug

  const startingSlash = slug.startsWith('/')
  const endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}
