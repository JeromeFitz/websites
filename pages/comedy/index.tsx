import { NextSeo } from 'next-seo'

import Container from '~components/Container'
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
    <Container>
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
    </Container>
  )
}

export default Music
