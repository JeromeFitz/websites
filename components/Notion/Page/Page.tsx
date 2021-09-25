import { AnimatePresence } from 'framer-motion'
import _map from 'lodash/map'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import Breadcrumb from '~components/Notion/Breadcrumb'
import NotionLayout, { ImageLead } from '~components/Notion/Layout'
// import NotionLayout from '~components/Notion/Layout'
import Listing from '~components/Notion/Listing'
import { MetaTags } from '~components/Notion/Meta'
import { Event } from '~components/Notion/Page'
import Relations from '~components/Notion/Relations'
// import Title from '~components/Notion/Title'
import getContentNodes from '~utils/notion/getContentNodes'

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

  const { icon, id, data: properties } = isInfoObjectPage ? info : info?.results[0]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emoji = !!icon?.emoji ? icon.emoji : ''

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, title } = properties

  // console.dir(`properties`)
  // console.dir(properties)

  // // console.dir(`id`)
  // // console.dir(id)

  // @todo(switch)

  /**
   * @tags
   */
  // @todo(notion) dry
  let tagParams
  switch (routeType) {
    case 'events':
      tagParams = `events=${id || ''}&shows=${
        info?.data?.shows?.join(',') || ''
      }&eventsLineupShowIds=${info?.data?.eventsLineupShowIds?.join(',') || ''}`
      break
    case 'shows':
      tagParams = `shows=${id || ''}`
      break
    default:
      break
  }

  // console.dir(`content`)
  // console.dir(content)
  // const nodes = getContentNodes({ content, images })

  return (
    <>
      <Breadcrumb isIndex={isIndex} title={title} />
      <NotionLayout id={id} data={properties} routeType={routeType} url={url}>
        <ImageLead
          description={properties?.seoImageDescription}
          image={properties?.seoImage}
          key={`image-lead--${id}`}
        />
        {/* Content */}
        <AnimatePresence key={`animate-presence--${id}`}>
          {routeType === 'events' && !isIndex ? <Event data={data} /> : null}
          {/* // node: NotionBlock (w/ id/type) */}
          {_map(getContentNodes({ content, images }), (node: any) => {
            if (node.type === 'ul') {
              return (
                <ul className="flex flex-col list-disc list-inside" key={node.id}>
                  {node.node}
                </ul>
              )
            }
            // if (node.type === 'image') {
            //   return (
            //     <>
            //       <h5 key="image-here">Image Here</h5>
            //       {node.node}
            //     </>
            //   )
            // }
            return node.node
          })}
        </AnimatePresence>
        {/* @note(switch) */}
        {isIndex && !isPage && (
          <Listing items={items} key={`listing--${id}`} routeType={routeType} />
        )}
        {/* {isEvent && showId && <Meta id={showId} />} */}
        <>
          {!isIndex && (
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
              {/* <div className="spacer--h" /> */}
            </>
          )}
          {!isIndex && (
            <Relations
              id={id}
              isIndex={isIndex}
              key={`relations--${id}`}
              properties={properties}
              relationsMap={
                routeType === 'events'
                  ? ['shows', 'eventsLineupShowIds']
                  : [
                      'peopleCast',
                      'peopleHost',
                      'peopleWriter',
                      'peopleProducer',
                      'peopleDirector',
                      'peopleDirectorMusical',
                      'peopleMusic',
                      'peopleDirectorTechnical',
                      'peopleCrew',
                      'peopleThanks',
                    ]
              }
              routeType={routeType}
              slug={slug}
            />
          )}
        </>
      </NotionLayout>
    </>
  )
}

export default Page
