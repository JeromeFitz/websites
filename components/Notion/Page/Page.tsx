import _size from 'lodash/size'
import dynamic from 'next/dynamic'
// import { useEffect } from 'react'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import ContentNodes from '~components/Notion/ContentNodes'
import NotionLayout, { ImageLead } from '~components/Notion/Layout'
import { MetaShow } from '~components/Notion/Meta'
// import { MetaTags } from '~components/Notion/Meta'
// import { Event } from '~components/Notion/Page'
import { ROUTE_TYPES } from '~utils/notion/helper'

const Listing = dynamic(() => import('~components/Notion/Listing'), {})
const ListingEvent = dynamic(
  () => import('~components/Notion/Listing/ListingEvent'),
  {
    ssr: true,
  }
)
// // const Relations = dynamic(() => import('~components/Notion/Relations'), {})
// const Rollups = dynamic(() => import('~components/Notion/Rollups'), {})
// // const RollupsTags = dynamic(
// //   () => import('~components/Notion/Rollups/RollupsTags'),
// //   {}
// // )
// // const ListingEpisodes = dynamic(
// //   () => import('~components/Notion/Listing').then((mod) => mod.ListingEpisodes),
// //   {}
// // )

// @todo(complexity) 15
// eslint-disable-next-line complexity
const Page = ({ data, ...props }) => {
  const {
    // content: contentFallback,
    // info: infoFallback,
    images: imagesFallback,
    // items: itemsFallback,
    // hasMeta,
    isPage,
    isIndex,
    meta,
    routeType,
    // slug,
    url,
  } = props

  // console.dir(`> props`)
  // console.dir(props)

  const hasMeta =
    _size(meta) > 0 && [ROUTE_TYPES.blog, ROUTE_TYPES.events].includes(routeType)

  /**
   * @images
   */
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  useEffectOnce(() => {
    void mutate('images', { ...images, ...imagesFallback }, true)
  })

  /**
   * @data
   */
  const { info = null, content = null, items = null } = data

  const isInfoObjectPage = !!info && info?.object === 'page'

  // console.dir(`isInfoObjectPage: ${isInfoObjectPage}`)
  // console.dir(`> info`)
  // console.dir(info)

  if (info === null) return null

  const { id, properties } = isInfoObjectPage ? info : info?.results[0]
  // console.dir(`> properties`)
  // console.dir(properties)

  // @todo(switch)
  /**
   * @tags
   */
  // @todo(notion) dry
  // let tagParams
  // switch (routeType) {
  //   case 'events':
  //     tagParams = `events=${id || ''}&shows=${
  //       info?.properties?.shows?.join(',') || ''
  //     }&eventsLineupShowIds=${info?.properties?.eventsLineupShowIds?.join(',') || ''}`
  //     break
  //   case 'shows':
  //     tagParams = `shows=${id || ''}`
  //     break
  //   default:
  //     break
  // }

  // console.dir(`content`)
  // console.dir(content)
  // // const nodes = getContentNodes({ content, images })

  // @refactor(confusing)
  const isEventListing = routeType === ROUTE_TYPES.events && !isIndex
  const isEpisodeListing = routeType === ROUTE_TYPES.podcasts && !isIndex
  const isShowListing = routeType === ROUTE_TYPES.shows && !isIndex

  return (
    <>
      <NotionLayout id={id} properties={properties} routeType={routeType} url={url}>
        {isEventListing ? null : (
          <ImageLead
            description={properties?.seoImageDescription || ''}
            image={properties?.seoImage}
            imagesFallback={imagesFallback}
            key={`image-lead--${id}`}
          />
        )}
        {isEventListing ? <ListingEvent data={data} /> : null}
        {/* // node: NotionBlock (w/ id/type) */}
        {isEventListing || hasMeta ? null : (
          <ContentNodes content={content} images={images} />
        )}

        {/* @note(switch) */}
        {isIndex && !isPage && (
          <Listing
            images={images}
            items={items}
            key={`listing--${id}`}
            routeType={routeType}
          />
        )}
        <>
          {(isEventListing || isShowListing) && (
            <MetaShow data={data} key={`${id}--metashow`} routeType={routeType} />
          )}
          {/* {!isIndex && (
            <h2 className="text-3xl md:text-4xl" key={`h2-information--${id}`}>
              Information
            </h2>
          )}
          {!!tagParams && !isIndex && (
            <div className="spacer--h mb-4" key={`spacer-0--${id}`} />
          )}
          {!!tagParams && !isIndex && (
            <>
              <MetaTags key={`meta-tags--${id}`} tagParams={tagParams} />
            </>
          )}
          {!isIndex && (
            <Rollups
              id={id}
              isIndex={isIndex}
              key={`relations--${id}`}
              properties={properties}
              routeType={routeType}
              slug={slug}
            />
          )} */}
          {isEpisodeListing ? (
            <>
              <Listing
                images={images}
                items={items}
                key={`listing--episodes--${id}`}
                routeType={routeType}
              />
            </>
          ) : null}
        </>
      </NotionLayout>
    </>
  )
}

export default Page
