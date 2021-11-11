// import { useRouter } from 'next/router'
import _merge from 'lodash/merge'
import { NextSeo } from 'next-seo'
import { memo } from 'react'

import getNextSeo from '~config/getNextSeo'

const isDev = process.env.NODE_ENV !== 'production'
const url = isDev
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : 'https://jeromefitzgerald.com'

// @todo(s3) https://github.com/leerob/nextjs-aws-s3
// @todo(any)
const Seo = memo(({ ...seo }: any) => {
  let newSeo: any = {}
  if (!!seo.openGraph.images[0].url) {
    newSeo = _merge({}, getNextSeo, seo)
  } else {
    const title = seo?.title || 'Jerome'
    const oDomain = url
    const oFontSize = encodeURIComponent(48)
    const oMarkdown = encodeURIComponent(true)
    const oTheme = encodeURIComponent('dark')
    const oTitle = encodeURIComponent(`**${title}**`)
    const oImage = `${oDomain}/api/og/${oTitle}.png?theme=${oTheme}&md=${oMarkdown}&fontSize=${oFontSize}&text=${oTitle}`
    seo.image = oImage
    seo.openGraph.images[0].alt = title
    seo.openGraph.images[0].url = oImage
    seo.openGraph.images[0].width = 1600
    seo.openGraph.images[0].height = 900
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
