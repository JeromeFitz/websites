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

  return <NextSeo {...newSeo} />

  // return <NextSeo {...seo} />
})

export default Seo
