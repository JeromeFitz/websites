import cx from 'clsx'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Container from '~components/Container'
import Header from '~components/Header'
import { TopArtists, TopTracks } from '~components/Music'
import SplitText from '~components/SplitText'

const url = 'https://jeromefitzgerald.com/music'
const title = 'Music'
const description =
  'Jerome loves music. Here is what he is currently playing, and top artists and tracks.'
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
      <div className="mb-4">
        {/* <p className="my-4">
          I listen to music extensively on MP3s “old-school” style, and vinyl which
          is even more ancient.
        </p>
        <p className="my-4">
          <span className="italic font-bold block">Please...</span>
          Buy music. Go to live online shows. Go to live shows when we can. Keep art
          alive.
        </p> */}
        <p className="my-4">
          <span className="italic font-bold block">Note:</span>
          <span className="block md:inline">Links will open in, and all </span>data
          comes from{' '}
          <span className="text-green-600 dark:text-green-400 font-medium">
            Spotify
          </span>
          . (Yes, I own a lot of vinyl and an utterly extensive back-up MP3
          collection. Please support artists by purchasing music, especially local
          and indie. Go to shows [when we can again].)
        </p>
      </div>
      <div className="my-4 md:my-6">
        <h2 aria-label="Top Artists">
          <SplitText text="Top Artists" />
        </h2>
        <p className="mb-6 md:mb-8">
          For 2020 my number one artist was{' '}
          <Link href="spotify:artist:5LhTec3c7dcqBvpLRWbMcf">
            <a
              className={cx(
                'underline underline-thickness-sm underline-offset-md font-semibold',
                'hover:text-green-500 dark:hover:text-yellow-200',
                'leading-relaxed'
              )}
              aria-label={'Madlib'}
            >
              <SplitText text={'Madlib'} />
            </a>
          </Link>
          .
        </p>
        <TopArtists />
      </div>
      <div className="my-8">
        <h2 aria-label="Top Tracks">
          <SplitText text="Top Tracks" />
        </h2>
        <p className="mb-6 md:mb-8 leading-relaxed">
          <span className="inline md:block">For 2020 my number one song was </span>
          <Link href="spotify:track:5taqLrLouA4vCjM7ZQpEtW">
            <a
              className={cx(
                'underline underline-thickness-sm underline-offset-md font-semibold',
                'block md:inline',
                'hover:text-green-500 dark:hover:text-yellow-200'
              )}
              aria-label={'“ooh la la (feat. Greg Nice & DJ Premier)”'}
            >
              <SplitText text={'“ooh la la (feat. Greg Nice & DJ Premier)”'} />
            </a>
          </Link>{' '}
          by <strong>Run The Jewels</strong>.
        </p>
        <TopTracks />
      </div>
    </Container>
  )
}

export default Music
