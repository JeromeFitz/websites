import { DATA_TYPES as DT } from '@jeromefitz/notion/helper'
import getNotionListing from '@jeromefitz/notion/queries/getNotionListing'
import getNotionListingByDate from '@jeromefitz/notion/queries/getNotionListingByDate'
import getNotionSlug from '@jeromefitz/notion/queries/getNotionSlug'
import getNotionSlugByRoute from '@jeromefitz/notion/queries/getNotionSlugByRoute'

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

  async [DT.SLUG]({ pathVariables, routeType, slug }) {
    // console.dir(`1|5 => getNotionSlug`)
    return await getNotionSlug({ pathVariables, routeType, slug })
  }

  async [DT.LISTING]({ pathVariables, routeType }) {
    // console.dir(`2 => getNotionListing`)
    return await getNotionListing({ pathVariables, routeType })
  }

  async [DT.LISTING_BY_DATE]({ pathVariables, routeType, slug }) {
    // console.dir(`3 => getNotionListingByDate`)
    return await getNotionListingByDate({ pathVariables, routeType, slug })
  }

  async [DT.SLUG_BY_ROUTE]({ pathVariables, routeType, slug }) {
    // console.dir(`4 => getNotionSlugByRoute`)
    return await getNotionSlugByRoute({ pathVariables, routeType, slug })
  }
}

export { DATA_TYPES }
