import { ExternalLinkIcon } from '@heroicons/react/solid'
import cx from 'clsx'
// import NextImage from 'next/image'

// import { Skeleton } from '~components/Music'
// import { CardWithGlow } from '~components/NowPlaying/NowPlaying'
// import lpad from '~utils/lpad'
import { CardWithGlow, CardWithGlowProps } from '~components/Card'
import lpad from '~utils/lpad'

const Track = (item) => {
  const { album, artist, genres, loading, ranking, track } = item
  const handleClick = () => {
    window.open(track.uri, '_blank', 'noopener,noreferrer')
  }
  // const handleClick = () => {
  //   window.open(artist.uri, '_blank', 'noopener,noreferrer')
  // }

  // console.dir(`item`)
  // console.dir(item)

  if (loading) return null

  // const tags = []
  const tags = genres.slice(0, 3)

  return (
    <>
      <div className="">
        <div className="flex align-center my-6 w-full" onClick={() => handleClick}>
          <CardWithGlow>
            <CardWithGlowProps
              reverse={ranking % 2 == 0}
              headline={`${lpad(ranking)}. ${artist.name}`}
              subline={`“${track.name}”`}
              tags={tags}
              description={
                <>
                  Off of “<span className={cx('font-bold')}>{album.name}</span>”
                  released in <span className={cx('font-bold')}>{album.year}</span>.
                  .
                </>
              }
              share={
                <>
                  <a
                    aria-label={`Link to ${track.name}`}
                    className={cx(
                      'underline-style-solid underline-offset-md underline-thickness-md',
                      '_text-black'
                    )}
                    href={track.uri}
                    target="_blank"
                    title={`Link to ${track.name}`}
                    rel="noopener noreferrer"
                  >
                    Peep the track here.
                    <ExternalLinkIcon className="h-4 w-4 ml-2 mb-1 inline-flex _text-black" />
                  </a>
                </>
              }
              slug={album?.meta?.slug}
              meta={album}
            />
          </CardWithGlow>
        </div>
      </div>
    </>
  )
}

export default Track
