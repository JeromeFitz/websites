import { NextSeo } from 'next-seo'
import React from 'react'

const Seo = ({ seo = {} }) => {
  return <NextSeo {...seo} />
}

export default Seo
