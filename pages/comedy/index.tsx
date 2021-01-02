import { NextSeo } from 'next-seo'

import Layout from '~components/Layout'
import Header from '~components/Header'

const url = 'https://jeromefitzgerald.com/music'
const title = 'Comedy'
const description =
  'Jerome loves comedy. Here is what he is currently playing, and top artists and tracks (as per Spotify at least).'
const header = {
  description,
  title,
}

const Music = () => {
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Header {...header} />
    </Layout>
  )
}

export default Music
