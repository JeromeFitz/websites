import { memo } from 'react'
// import { useRouter } from 'next/router'
import _merge from 'lodash/merge'
import { NextSeo } from 'next-seo'

import { getNextSeo } from '~config/notion/website'

const Seo = memo(({ ...seo }) => {
  const newSeo = _merge({}, getNextSeo, seo)

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

  // newSeo.canonical = `https://jeromefitzgerald.com${router.asPath}`
  // newSeo.canonical = `https://jeromefitzgerald.com${router.pathname}`
  // newSeo.canonical = `https://jeromefitzgerald.com${router.route}`

  return <NextSeo {...newSeo} />
})

export default Seo
