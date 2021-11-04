import { AnimatePresence } from 'framer-motion'
import _map from 'lodash/map'
import dynamic from 'next/dynamic'
// import { useEffect } from 'react'
import { useEffectOnce } from 'react-use'
import useSWR, { useSWRConfig } from 'swr'

import NotionLayout, { ImageLead } from '~components/Notion/Layout'
import { OL, UL } from '~components/Notion/Listing'
import { MetaTags } from '~components/Notion/Meta'
import { Event } from '~components/Notion/Page'
import getContentNodes from '~utils/notion/getContentNodes'

// const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})
const Listing = dynamic(() => import('~components/Notion/Listing'), {})
// const Relations = dynamic(() => import('~components/Notion/Relations'), {})
const Rollups = dynamic(() => import('~components/Notion/Rollups'), {})
// const RollupsTags = dynamic(
//   () => import('~components/Notion/Rollups/RollupsTags'),
//   {}
// )
// const ListingEpisodes = dynamic(
//   () => import('~components/Notion/Listing').then((mod) => mod.ListingEpisodes),
//   {}
// )

// @todo(complexity) 25
// eslint-disable-next-line complexity
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cache, mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  useEffectOnce(() => {
    // console.dir(`useEffectOnce`)
    void mutate('images', { ...images, ...imagesFallback }, true)
  })

  // // console.dir(`images`)
  // // console.dir(images)
  // console.dir(`cache`)
  // console.dir(cache)

  /**
   * @data
   */
  const { info = null, content = null, items = null } = data

  const isInfoObjectPage = !!info && info?.object === 'page'

  // console.dir(`isInfoObjectPage: ${isInfoObjectPage}`)
  // console.dir(`> info`)
  // console.dir(info)

  if (info === null) return null

  const { icon, id, data: properties } = isInfoObjectPage ? info : info?.results[0]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emoji = !!icon?.emoji ? icon.emoji : ''

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { spotifyShow, tags, title } = properties

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

  // console.dir(`data`)
  // console.dir(data)
  // console.dir(`content`)
  // console.dir(content)
  // // const nodes = getContentNodes({ content, images })

  const isEventListing = routeType === 'events' && !isIndex
  const isEpisodeListing = routeType === 'podcasts' && !isIndex

  return (
    <>
      {/* <Breadcrumb isIndex={isIndex} title={title} /> */}
      <NotionLayout id={id} data={properties} routeType={routeType} url={url}>
        <ImageLead
          description={properties?.seoImageDescription}
          image={properties?.seoImage}
          imagesFallback={imagesFallback}
          key={`image-lead--${id}`}
        />
        {/* Content */}
        {/* @todo(content) */}
        <AnimatePresence key={`animate-presence--${id}`}>
          {isEventListing ? <Event data={data} /> : null}
          {/* // node: NotionBlock (w/ id/type) */}
          {isEventListing
            ? null
            : _map(getContentNodes({ content, images }), (node: any) => {
                if (node.type === 'ul') {
                  return <UL key={node.id}>{node.node}</UL>
                }
                if (node.type === 'ol') {
                  return <OL key={node.id}>{node.node}</OL>
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
              {/* <RollupsTags key={`rollup-tags--${id}`} properties={properties} /> */}
              {/* <div className="spacer--h" /> */}
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
          )}
          {isEpisodeListing ? (
            <>
              {/* {!!spotifyShow && (
                <iframe
                  src={`https://open.spotify.com/embed/show/${spotifyShow}`}
                  width="100%"
                  height="232"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              )} */}
              <Listing
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
