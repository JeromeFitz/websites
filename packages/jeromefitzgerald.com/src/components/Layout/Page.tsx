import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import Layout, { ImageLead } from '~components/Layout'
import Meta from '~components/Meta'
import { ContentNodes } from '~components/Notion'
import { notionConfig } from '~config/websites'

const { NOTION } = notionConfig

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
    _size(meta) > 0 &&
    [NOTION.BLOG.routeType, NOTION.EVENTS.routeType].includes(routeType)

  // console.dir(`> hasMeta: ${hasMeta}`)

  /**
   * @images
   */
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  useEffectOnce(() => {
    void mutate('images', { ...images, ...imagesFallback }, true)
  })

  // console.dir(`images`)
  // console.dir(images)

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
  const isEventListing = routeType === NOTION.EVENTS.routeType && !isIndex
  const isEpisodeListing = routeType === NOTION.PODCASTS.routeType && !isIndex
  const isShowListing = routeType === NOTION.SHOWS.routeType && !isIndex

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
        {/* @hack(notion) no ListingBlog so this circumvents*/}
        {isEventListing || (hasMeta && isIndex) ? null : (
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
