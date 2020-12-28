import { isPages, routeTypes } from '~config/notion/website'

const isDebug = false

const getCollectionView = ({ catchAll }) => {
  /**
   * @note These need to be within the function or they keep their value obviously.
   */
  let routeType: string
  let itemDate: any
  let id: any
  let slug: any = null
  // let episode: any = null
  let url: any
  let indexId: string, collectionId: string, collectionViewId: string

  isDebug && console.dir(`catchAll`)
  isDebug && console.dir(catchAll)

  const isPage = isPages(catchAll[0])
  // eslint-disable-next-line prefer-const
  routeType = isPage ? 'pages' : catchAll[0]

  const isIndex = !catchAll[1]
  isDebug && console.dir(`routeType: ${routeType}`)
  isDebug && console.dir(`isIndex:   ${isIndex}`)
  isDebug && console.dir(`> getCollectionView`)
  switch (routeType) {
    // case 'episodes':
    case 'people':
    case 'shows':
    case 'users':
    case 'venues':
      itemDate = null
      slug = !isIndex && catchAll[1]
      const {
        indexId: psuv__indexId,
        collectionId: psuv__collectionId,
        // collectionViewId: psuv__collectionViewId,
        collectionViewId__published: psuv__collectionViewId,
        collectionViewId__slug: psuv__collectionViewId__slug,
      } = routeTypes[routeType]
      /**
       * @uh
       */
      indexId = psuv__indexId
      collectionId = psuv__collectionId
      collectionViewId = isIndex
        ? psuv__collectionViewId
        : psuv__collectionViewId__slug
      break
    case 'blog':
      // @note Skip first array element as that is: routeType
      const [
        ,
        yearBlog = null,
        monthBlog = null,
        dateBlog = null,
        slugBlog = null,
      ] = catchAll
      url = `/${routeType}`
      itemDate = !isIndex && {
        year: yearBlog,
        month: monthBlog,
        date: dateBlog,
      }

      if (!isIndex) {
        if (yearBlog) url += `/${yearBlog}`
        if (monthBlog) url += `/${monthBlog}`
        if (dateBlog) url += `/${dateBlog}`
        if (slugBlog) url += `/${slugBlog}`
        if (slugBlog) slug = slugBlog
      }

      const {
        indexId: blog__indexId,
        collectionId: blog__collectionId,
        // collectionViewId: blog__collectionViewId,
        collectionViewId__published: blog__collectionViewId,
        collectionViewId__dateExactDate: blog__collectionViewId__dateExactDate,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        collectionViewId__slug: blog__collectionViewId__slug,
        collectionViewId__dateExactMonth: blog__collectionViewId__dateExactMonth,
      } = routeTypes[routeType]

      indexId = blog__indexId
      collectionId = blog__collectionId
      collectionViewId = isIndex
        ? blog__collectionViewId
        : slugBlog //|| dateBlog
        ? // ? blog__collectionViewId__slug
          blog__collectionViewId__dateExactDate
        : blog__collectionViewId__dateExactMonth

      isDebug && console.dir(`url:       ${url}`)
      isDebug && console.dir(`slug:      ${slug}`)
      isDebug && console.dir(`slugBlog: ${slugBlog}`)
      isDebug && console.dir(`itemDate`)
      isDebug && console.dir(itemDate)
      isDebug && console.dir(routeTypes[routeType])

      break
    case 'events':
      // @note Skip first array element as that is: routeType
      const [
        ,
        yearEvent = null,
        monthEvent = null,
        dateEvent = null,
        slugEvent = null,
      ] = catchAll
      url = `/${routeType}`
      itemDate = !isIndex && {
        year: yearEvent,
        month: monthEvent,
        date: dateEvent,
      }

      if (!isIndex) {
        if (yearEvent) url += `/${yearEvent}`
        if (monthEvent) url += `/${monthEvent}`
        if (dateEvent) url += `/${dateEvent}`
        if (slugEvent) url += `/${slugEvent}`
        if (slugEvent) slug = slugEvent
      }

      const {
        indexId: events__indexId,
        collectionId: events__collectionId,
        // collectionViewId: events__collectionViewId,
        collectionViewId__published: events__collectionViewId,
        collectionViewId__dateExactDate: events__collectionViewId__dateExactDate,
        collectionViewId__dateExactMonth: events__collectionViewId__dateExactMonth,
      } = routeTypes[routeType]

      indexId = events__indexId
      collectionId = events__collectionId
      collectionViewId = isIndex
        ? events__collectionViewId
        : slugEvent || dateEvent
        ? events__collectionViewId__dateExactDate
        : events__collectionViewId__dateExactMonth

      isDebug && console.dir(`url:       ${url}`)
      isDebug && console.dir(`slug:      ${slug}`)
      isDebug && console.dir(`slugEvent: ${slugEvent}`)
      isDebug && console.dir(`itemDate`)
      isDebug && console.dir(itemDate)

      break
    // case 'episodes':
    //   console.dir(`_ episodes: getCollectionView`)
    //   itemDate = null
    //   slug = !isIndex && catchAll[1]
    //   const {
    //     indexId: episodes__indexId,
    //     collectionId: episodes__collectionId,
    //     // collectionViewId: episodes__collectionViewId,
    //     // collectionViewId__published: episodes__collectionViewId,
    //     collectionViewId__slug: episodes__collectionViewId__slug,
    //     collectionViewId__podcast: episodes__collectionViewId__podcast,
    //   } = routeTypes[routeType]
    //   /**
    //    * @uh
    //    */
    //   indexId = episodes__indexId
    //   collectionId = episodes__collectionId
    //   collectionViewId = isIndex
    //     ? episodes__collectionViewId__podcast
    //     : episodes__collectionViewId__slug
    //   break
    case 'podcasts':
    case 'episodes':
      itemDate = null
      const routeTypeQuery = 'podcasts'
      // @note Skip first array element as that is: routeType
      const [, slugPodcast = null, episodePodcast = null] = catchAll
      isDebug && console.dir(`routeType: ${routeType}`)
      isDebug && console.dir(`slugPodcast: ${slugPodcast}`)
      isDebug && console.dir(`episodePodcast: ${episodePodcast}`)

      const isEpisode = !!episodePodcast
      const isPodcast = slugPodcast && !episodePodcast
      const isPodcastsIndex = !slugPodcast

      isDebug && console.dir(`isPodcastsIndex: ${isPodcastsIndex}`)
      isDebug && console.dir(`isPodcast: ${isPodcast}`)
      isDebug && console.dir(`isEpisode: ${isEpisode}`)

      /**
       * @note set url first, then determine the collectionView
       */
      url = `/${routeType}`
      if (!!slugPodcast) {
        url += `/${slugPodcast}`
        slug = slugPodcast
      }
      if (!!episodePodcast) {
        url += `/${episodePodcast}`
        slug = episodePodcast
        // episode = episodePodcast
      }

      if (isPodcastsIndex) {
        const {
          indexId: podcasts__indexId,
          collectionId: podcasts__collectionId,
          // collectionViewId: podcasts__collectionViewId,
          collectionViewId__published: podcasts__collectionViewId,
          collectionViewId__slug: podcasts__collectionViewId__slug,
        } = routeTypes[routeTypeQuery]

        indexId = podcasts__indexId
        collectionId = podcasts__collectionId
        collectionViewId = isPodcastsIndex
          ? podcasts__collectionViewId
          : podcasts__collectionViewId__slug
      }
      if (isPodcast) {
        const {
          indexId: episodes__indexId,
          collectionId: episodes__collectionId,
          collectionViewId: episodes__collectionViewId,
          // collectionViewId__published: episodes__collectionViewId,
          collectionViewId__slug: episodes__collectionViewId__slug,
          // collectionViewId__podcast: episodes__collectionViewId__podcast,
        } = routeTypes[routeType]
        indexId = episodes__indexId
        collectionId = episodes__collectionId
        collectionViewId = isIndex
          ? episodes__collectionViewId
          : episodes__collectionViewId__slug
      }
      if (isEpisode) {
        const {
          indexId: episode__indexId,
          collectionId: episode__collectionId,
          // collectionViewId: episode__collectionViewId,
          collectionViewId__published: episode__collectionViewId,
          collectionViewId__slug: episode__collectionViewId__slug,
        } = routeTypes['episodes']

        indexId = episode__indexId
        collectionId = episode__collectionId
        collectionViewId = isIndex
          ? episode__collectionViewId
          : episode__collectionViewId__slug
      }

      isDebug && console.dir(`url:         ${url}`)
      isDebug && console.dir(`slug:        ${slug}`)
      isDebug && console.dir(`slugPodcast: ${slugPodcast}`)

      break
    case 'pages':
    default:
      itemDate = null
      // slug = catchAll[0]
      slug = catchAll[0] === '500w' ? null : catchAll[0]
      isDebug && console.dir(`slug:      ${slug}`)
      const {
        indexId: pages__indexId,
        collectionId: pages__collectionId,
        // collectionViewId: pages__collectionViewId,
        // collectionViewId__published: pages__collectionViewId,
        collectionViewId__slug: pages__collectionViewId__slug,
      } = routeTypes[routeType]
      /**
       * @uh
       */
      indexId = pages__indexId
      collectionId = pages__collectionId
      collectionViewId = isIndex
        ? pages__collectionViewId__slug
        : pages__collectionViewId__slug
      break
  }

  return {
    collectionId,
    collectionViewId,
    // episode,
    id,
    indexId,
    itemDate,
    routeType,
    slug,
    url,
  }
}

export default getCollectionView
