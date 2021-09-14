import _map from 'lodash/map'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import NotionLayout, { ImageLead } from '~components/Notion/Layout'
import Listing from '~components/Notion/Listing'
import { Event } from '~components/Notion/Page'
import Relations from '~components/Notion/Relations'
import Tags from '~components/Notion/Tags'
import Title from '~components/Notion/Title'
import { NotionBlock } from '~utils/notion'
import getContentType from '~utils/notion/getContentType'

const Page = ({ data, props }) => {
  const {
    // content: contentFallback,
    // info: infoFallback,
    images: imagesFallback,
    // items: itemsFallback,
    // hasMeta,
    isPage,
    isIndex,
    // meta,
    routeType,
    slug,
    url,
  } = props

  /**
   * @images
   */
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  useEffect(() => {
    void mutate('images', { ...images, ...imagesFallback }, false)
  }, [images, imagesFallback, mutate])

  /**
   * @data
   */
  const { info = null, content = null, items = null } = data

  const isInfoObjectPage = !!info && info?.object === 'page'

  const { icon, id, data: properties } = isInfoObjectPage ? info : info.results[0]
  const emoji = !!icon?.emoji ? icon.emoji : ''

  const { tags, title } = properties

  // console.dir(`properties`)
  // console.dir(properties)

  // // console.dir(`id`)
  // // console.dir(id)

  // @todo(switch)

  return (
    <>
      {/* Template Content */}
      <Title emoji={emoji} id={id} title={title} />
      {/* Breadcrumb Content */}
      {/* {!isIndex && <Breadcrumb title={title} />} */}
      <NotionLayout id={id} data={properties} url={url}>
        <ImageLead
          description={properties?.seoImageDescription}
          image={properties?.seoImage}
        />
        <Tags data={tags} />
        {/* Dynamic */}
        {/* Content */}
        {/* @todo(key) */}
        {routeType === 'events' && !isIndex ? (
          <Event data={data} />
        ) : (
          _map(content.results, (contentItem: NotionBlock) =>
            getContentType(contentItem, images)
          )
        )}
        {/* @note(switch) */}
        {isIndex && !isPage && <Listing items={items} routeType={routeType} />}
        {/* {isEvent && showId && <Meta id={showId} />} */}
        <Relations
          isIndex={isIndex}
          properties={properties}
          routeType={routeType}
          slug={slug}
        />
      </NotionLayout>
    </>
  )
}

export default Page
