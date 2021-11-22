import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import Layout, { ImageLead } from '~components/Layout'
import Meta from '~components/Meta'
import ContentNodes from '~components/Notion/ContentNodes'
import { ROUTE_TYPES } from '~utils/notion/helper'

const Listing = dynamic(() => import('~components/Notion/Listing'), {})
const ListingEvent = dynamic(
  () => import('~components/Notion/Listing/ListingEvent'),
  {
    ssr: true,
  }
)

// @todo(complexity) 18
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

  // @refactor(confusing)
  const isEventListing = routeType === ROUTE_TYPES.events && !isIndex
  const isEpisodeListing = routeType === ROUTE_TYPES.podcasts && !isIndex
  const isShowListing = routeType === ROUTE_TYPES.shows && !isIndex

  return (
    <>
      <Layout id={id} properties={properties} routeType={routeType} url={url}>
        {isEventListing ? null : (
          // @note(notion) this is based off of seoImage only at the moment
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
            <Meta data={data} key={`${id}--meta`} routeType={routeType} />
          )}
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
      </Layout>
    </>
  )
}

export default Page
