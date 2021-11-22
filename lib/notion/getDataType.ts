import getByListing from '~lib/notion/queries/getByListing'
import getByListingWithDate from '~lib/notion/queries/getByListingWithDate'
import getBySlug from '~lib/notion/queries/getBySlug'
import getBySlugWithRouteType from '~lib/notion/queries/getBySlugWithRouteType'

/**
 * @info
 *
 * 1 = /about, /colophon, /contact
 * 2 = /blog, /events, /podcasts
 * 3 = /blog/2020, /blog/2020/05, /blog/2020/05/09
 *     /events/2020, /events/2020/05, /events/2020/05/09,
 * 4 = /blog/2020/05/09/title, /events/2020/05/09/title,
 *     /podcasts/knockoffs/i-know-what-you-did-last-summer
 * 5 = /shows/alex-o-jerome, /events/2020/05/09/jerome-and,
 *     /podcasts/knockoffs
 */
class DATA_TYPES {
  constructor(private dataType: string) {}

  getDataType(): string {
    return this.dataType
  }

  async ['getBySlug']({ pathVariables, routeType, slug }) {
    // console.dir(`1|5 => getBySlug`)
    return await getBySlug({ pathVariables, routeType, slug })
  }
  1(props) {
    return this.getBySlug(props)
  }
  5(props) {
    return this.getBySlug(props)
  }

  async ['getByListing']({ pathVariables, routeType }) {
    console.dir(`2 => getByListing`)
    return await getByListing({ pathVariables, routeType })
  }
  2(props) {
    return this.getByListing(props)
  }

  async ['getByListingWithDate']({ meta, routeType, slug }) {
    // console.dir(`3 => getByListingWithDate`)
    return await getByListingWithDate({ meta, routeType, slug })
  }
  3(props) {
    return this.getByListingWithDate(props)
  }

  async ['getBySlugWithRouteType']({ meta, routeType, slug }) {
    // console.dir(`4 => getBySlugWithRouteType`)
    return await getBySlugWithRouteType({ meta, routeType, slug })
  }
  4(props) {
    return this.getBySlugWithRouteType(props)
  }
}

export { DATA_TYPES }
