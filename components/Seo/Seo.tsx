import { memo } from 'react'
// import { useRouter } from 'next/router'
import _merge from 'lodash/merge'
import { NextSeo } from 'next-seo'

import { getNextSeo } from '~config/notion/website'

const Seo = memo(({ ...seo }) => {
  const newSeo = _merge({}, getNextSeo, seo)

  // const router = useRouter()
  // console.dir(`> router`)
  // console.dir(router)
  // console.dir(`> newSeo`)
  // console.dir(newSeo)

  /**
   * @note This is stupid.
   */
  if (newSeo?.noindex === 'No') {
    newSeo.noindex = false
  }
  if (newSeo?.noindex === 'Yes') {
    newSeo.noindex = true
  }

  return <NextSeo {...newSeo} />
})

export default Seo
