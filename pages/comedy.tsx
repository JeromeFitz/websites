import { NextSeo } from 'next-seo'

import Container from '~components/Container'

const url = 'https://jeromefitzgerald.com/music'
const title = 'Comedy'
const description =
  'Jerome loves comedy. Here is what he is currently playing, and top artists and tracks (as per Spotify at least).'

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
      <>
        <h1>{title}</h1>
        <div className="mt-2 mb-4 text-gray-900 dark:text-gray-100">
          <p className="my-4 mt-0">
            Placeholder until Notion normalizer and routing is in place.
          </p>
        </div>
      </>
    </Container>
  )
}

export default Music
