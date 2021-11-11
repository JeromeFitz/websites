// import { useRouter } from 'next/router'
import _merge from 'lodash/merge'
import { NextSeo } from 'next-seo'
import { memo } from 'react'

import getNextSeo from '~config/getNextSeo'

/**
 * @ref
 * https://og.jeromefitzgerald.com/**Hello**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fcdn.jeromefitzgerald.com%2Fjeromefitzgerald.com%2Fimages%2F2021%2Fbighead--jerome--dizzy.svg&widths=300&heights=300
 */

const url = 'https://og.jeromefitzgerald.com'
const image =
  'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2021/bighead--jerome--dizzy.svg'

// @todo(any)
const Seo = memo(({ ...seo }: any) => {
  let newSeo: any = {}
  if (!!seo.openGraph.images[0].url) {
    newSeo = _merge({}, getNextSeo, seo)
  } else {
    const title = seo?.title || 'Jerome'
    const oDomain = url
    const oFontSize = encodeURIComponent('100px')
    const oMarkdown = encodeURIComponent('1')
    const oTheme = encodeURIComponent('dark')
    const oTitle = encodeURIComponent(`**${title}**`)
    const oImages = encodeURIComponent(`${image}`)
    const oWidths = encodeURIComponent(`300`)
    const oHeights = encodeURIComponent(`300`)
    const oImage = `${oDomain}/${oTitle}.png?theme=${oTheme}&md=${oMarkdown}&fontSize=${oFontSize}&images=${oImages}&widths=${oWidths}&heights=${oHeights}`
    seo.image = oImage
    seo.openGraph.images[0].alt = title
    seo.openGraph.images[0].url = oImage
    seo.openGraph.images[0].width = 2048
    seo.openGraph.images[0].height = 1170
    newSeo = _merge({}, getNextSeo, seo)
  }

  /**
   * @note This is stupid.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (newSeo?.noindex === 'No') {
    newSeo.noindex = false
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (newSeo?.noindex === 'Yes') {
    newSeo.noindex = true
  }

  // const router = useRouter()
  // console.dir(`> router`)
  // console.dir(router)
  // console.dir(`> newSeo`)
  // console.dir(newSeo)
  // console.dir(`> seo`)
  // console.dir(seo)

  // newSeo.canonical = `https://jeromefitzgerald.com${router.asPath}`
  // newSeo.canonical = `https://jeromefitzgerald.com${router.pathname}`
  // newSeo.canonical = `https://jeromefitzgerald.com${router.route}`

  return <NextSeo {...newSeo} />
})

export default Seo
