import { NextSeo } from 'next-seo'

import Container from '~components/Container'
import Header from '~components/Header'
import { TopArtists, TopTracks } from '~components/Music'

const url = 'https://jeromefitzgerald.com/music'
const title = 'Music'
const description =
  'Jerome loves music. Here is what he is currently playing, and top artists and tracks (as per Spotify at least).'
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
      {/* This data needs to come from API */}
      <div className="mt-2 mb-4 text-gray-900 dark:text-gray-100">
        <p className="my-4 mt-0">
          I listen to music extensively on MP3s “old-school” style, and vinyl which
          is even more ancient.
        </p>
        <p className="my-4">
          All this data comes from{' '}
          <span className="text-green-600 dark:text-green-400 font-medium">
            Spotify
          </span>
          .
        </p>
        <p className="my-4">
          <span className="italic font-bold">
            Please...
            <br />
          </span>
          Buy music. Go to live online shows. Go to live shows when we can. Keep art
          alive.
        </p>
      </div>
      <div className="my-8">
        <h2 className="font-bold text-3xl mb-4 tracking-tight text-black dark:text-white">
          Top Artists
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          For 2020 my number one artist was <strong>Madlib</strong>.
        </p>
        <ul>
          <TopArtists />
        </ul>
      </div>
      <div className="my-8">
        <h2 className="font-bold text-3xl mb-4 tracking-tight text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          For 2020 my number one song was{' '}
          <strong>
            <em>“Oh La La (f. Greg Nice) (p. DJ Premier)”</em>
          </strong>{' '}
          by <strong>Run The Jewels</strong>.
        </p>
        <TopTracks />
      </div>
    </Container>
  )
}

export default Music
