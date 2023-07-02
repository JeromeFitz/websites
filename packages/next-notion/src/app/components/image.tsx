// import { darkTheme, keyframes, Box, Caption } from '@jeromefitz/design-system'
// import Slugger from 'github-slugger'
import _filter from 'lodash/filter'
import _size from 'lodash/size'
import _startsWith from 'lodash/startsWith'
import Image from 'next/image'

// @todo(notion) yea this is nasty haha
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { notionConfig } from '../../../../../sites/old.jeromefitzgerald.com/src/config/index'
import { getNotion } from '../../helper'

// import { notionConfig } from '~config/index'
// // import { IMAGE__PLACEHOLDER } from '~lib/constants'

// @todo(types)
const notion: any = getNotion(notionConfig)

// const focusInNonNext = keyframes({
//   '0%': {
//     filter: 'blur(50px)',
//     transform: 'scale(0.5)',
//   },
//   '50%': {
//     filter: 'blur(25px)',
//     transform: 'scale(0.75)',
//   },
//   '100%': {
//     filter: 'blur(0)',
//     transform: 'scale(1)',
//   },
// })

// const image = ({ images, item }) => {
//   const contentHack = item.image
//   const imageSrc =
//     contentHack?.type === 'external'
//       ? contentHack?.external.url
//       : contentHack?.file.url
//   const slugger = new Slugger()
//   const imageSlug = slugger.slug(imageSrc)
//   const imageData = !!imageSlug && !!images && images[imageSlug]
//   const caption =
//     (_size(contentHack?.caption) > 0 && contentHack?.caption[0]?.plain_text) || ''
//   // console.dir(`getContentType`)
//   // console.dir(`imageSlug: ${imageSlug}`)
//   // console.dir(images)
//   // console.dir(`imageData`)
//   // console.dir(imageData)

//   return !!imageData ? (
//     <Box
//       css={{
//         height: '100%',
//         mx: 'auto',
//         overflow: 'hidden',
//         width: '66.6667%',
//         // maxWidth: '100%',
//         // height: 'auto',
//       }}
//     >
//       <NextImage
//         alt={caption}
//         blurDataURL={imageData.base64}
//         key={imageSlug}
//         placeholder="blur"
//         {...imageData.img}
//       />
//       {!!caption && <Caption>{caption}</Caption>}
//     </Box>
//   ) : (
//     <Box
//       css={{
//         height: '100%',
//         mx: 'auto',
//         overflow: 'hidden',
//         width: '66.6667%',
//         img: {
//           animation: `${focusInNonNext} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
//           maxWidth: '100%',
//           height: 'auto',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: '100%',
//           // backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64})`,
//           backgroundImage: `linear-gradient(45deg,$colors$blackA7,$colors$blackA12)`,
//           // backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64}),linear-gradient(45deg,$colors$blackA7,$colors$blackA12)`,
//           [`.${darkTheme} &`]: {
//             // backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64})`,
//             backgroundImage: `linear-gradient(45deg,$colors$whiteA7,$colors$whiteA12)`,
//             // backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64}),linear-gradient(45deg,$colors$whiteA7,$colors$whiteA12)`,
//           },
//         },
//       }}
//     >
//       {/* // eslint-disable-next-line @next/next/no-img-element */}
//       <img
//         alt={caption}
//         className="nonNextNoStaticProps"
//         src={contentHack?.external?.url}
//       />
//       {!!caption && <Caption>{caption}</Caption>}
//     </Box>
//   )
// }

const FIND_ALT = 'ALT: '

function getImageAlt(comments) {
  const comment = comments[0]
  // console.dir(`> getImageAlt`)
  // console.dir(comment)
  //
  const c = _filter(comments, (comment) =>
    _startsWith(comment?.rich_text[0]?.plain_text, FIND_ALT)
  )
  // console.dir(`> c..`)
  // console.dir(c)

  return !!c && c.length > 0
    ? c[0]?.rich_text[0]?.plain_text.slice(FIND_ALT.length)
    : !!comment
    ? comment?.rich_text[0]?.plain_text
    : ''
}

async function getImage(url): Promise<any> {
  const { getPlaiceholder } = await import('plaiceholder')
  return await getPlaiceholder(url)
}

async function getComments(blockId): Promise<any[]> {
  // console.dir(`> getComments`)
  // console.dir(`blockId: ${blockId}`)
  // const res = await fetch(`/api/v1/cms/comments/${blockId}`)
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  // return res.json()

  return await notion?.comments?.list({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    block_id: blockId,
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
}

// @todo(lint), @todo(complexity) 11
// eslint-disable-next-line @typescript-eslint/no-unused-vars, complexity
const image: any = async ({ images, item, priority = false, order = 99 }) => {
  const isPriority = priority ? priority : order < 6 ? true : false
  // console.dir(`> images`)
  // console.dir(images)
  // console.dir(`> item`)
  // console.dir(item)
  // console.dir(`> order`)
  // console.dir(order)
  // console.dir(`> isPriority`)
  // console.dir(isPriority)

  // const contentHack = item.image
  // const imageSrc =
  //   contentHack?.type === 'external'
  //     ? contentHack?.external.url
  //     : contentHack?.file.url
  // const slugger = new Slugger()
  // const imageSlug = slugger.slug(imageSrc)
  // const imageData = !!imageSlug && !!images && images[imageSlug]
  const caption =
    (_size(item?.image?.caption) > 0 && item?.image?.caption[0]?.plain_text) || ''
  // console.dir(`getContentType`)
  // console.dir(`imageSlug: ${imageSlug}`)
  // console.dir(images)
  // console.dir(`imageData`)
  // console.dir(imageData)
  // console.dir(`caption`)
  // console.dir(caption)

  // const img2 = {
  //   src: item.image.external.url,
  //   width: 800,
  //   height: 800,
  //   type: 'jpg',
  // }

  const { base64, img }: { base64: string; img: any } = await getImage(
    item.image.type === 'external' ? item.image.external.url : item.image.file.url
  )

  const image = {
    blurDataURL: base64,
    ...img,
  }

  // const imageBlockId = `d345c795-e2ca-4167-854a-9ae5662141b0`
  const imageBlockId = item?.id
  const altData: any = await getComments(imageBlockId)
  // console.dir(`> altData`)
  // console.dir(altData)
  image.alt = (!!altData && getImageAlt(altData?.results)) || ''
  image.priority = isPriority
  image.fetchPriority = isPriority ? 'high' : 'auto'
  // image.loading = isPriority ? 'eager' : 'lazy'
  image.quality = 90
  const preload = `/_next/image?url=${encodeURIComponent(image.src)}&w=1920&q=${
    image.quality
  }`

  return (
    <>
      {/* @hack(next) NEXT-811 */}
      {/* https://github.com/vercel/next.js/issues/43134 */}
      {!!image.priority && <link rel="preload" href={preload} as="image" />}
      <Image placeholder="blur" className="flex w-full justify-center" {...image} />
      {!!caption && (
        <p className="my-4 ml-2 rounded border-l-4 border-l-orange-500 py-4 pl-4 font-mono text-sm font-bold">
          {caption}
        </p>
      )}
    </>
  )
}

export default image
