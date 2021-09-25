import { AnimatePresence } from 'framer-motion'
import _map from 'lodash/map'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { v4 as uuid } from 'uuid'

import Breadcrumb from '~components/Notion/Breadcrumb'
import NotionLayout, { ImageLead } from '~components/Notion/Layout'
import Listing from '~components/Notion/Listing'
import { MetaTags } from '~components/Notion/Meta'
import { Event } from '~components/Notion/Page'
import Relations from '~components/Notion/Relations'
// import Title from '~components/Notion/Title'
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

  /**
   * @hack
   * (notion) this gets the job done for `ul=>li`
   * @todo
   * (notion) other elements that rely on parent element
   * (notion) can we lift the images out of this earlier for cache state?
   *
   */
  let listCurrentId = ''
  let listCurrentState = false
  const nodes = {}
  _map(content.results, (contentItem: NotionBlock) => {
    if (contentItem.type === 'bulleted_list_item') {
      if (!listCurrentState) {
        listCurrentId = uuid()
        nodes[listCurrentId] = {
          id: listCurrentId,
          type: 'ul',
          node: [],
        }
      }
      listCurrentState = true
      nodes[listCurrentId].node.push(getContentType(contentItem, images))
      return
    } else {
      listCurrentState = false
    }
    nodes[contentItem.id] = {
      id: contentItem.id,
      type: contentItem.type,
      node: getContentType(contentItem, images),
    }
  })

  // console.dir(`nodes`)
  // console.dir(nodes)

  return (
    <>
      {/* Template Content */}
      {/* <Title emoji={emoji} id={id} title={title} /> */}
      <Breadcrumb isIndex={isIndex} title={title} />
      {/* Breadcrumb Content */}
      {/* {!isIndex && <Breadcrumb title={title} />} */}
      <NotionLayout id={id} data={properties} routeType={routeType} url={url}>
        {/* ImageLead */}
        <ImageLead
          description={properties?.seoImageDescription}
          image={properties?.seoImage}
        />

        {/* Dynamic */}
        {/* Content */}
        <AnimatePresence>
          {routeType === 'events' && !isIndex ? <Event data={data} /> : null}
          {/* // node: NotionBlock (w/ id/type) */}
          {_map(nodes, (node: any) => {
            if (node.type === 'ul') {
              return (
                <ul className="flex flex-col list-disc list-inside" key={node.id}>
                  {node.node}
                </ul>
              )
            }
            return node.node
          })}
        </AnimatePresence>
        {/* @note(switch) */}
        {isIndex && !isPage && <Listing items={items} routeType={routeType} />}
        {/* {isEvent && showId && <Meta id={showId} />} */}
        <>
          {!isIndex && <h2 className="text-3xl md:text-4xl">Information</h2>}
          {!!tagParams && !isIndex && <div className="spacer--h mb-4" />}
          {!!tagParams && !isIndex && (
            <>
              <MetaTags tagParams={tagParams} />
              {/* <div className="spacer--h" /> */}
            </>
          )}
          {!isIndex && (
            <Relations
              id={id}
              isIndex={isIndex}
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
