import cx from 'clsx'
// import NextImage from 'next/image'

// import { Skeleton } from '~components/Music'
// import { CardWithGlow } from '~components/NowPlaying/NowPlaying'
// import lpad from '~utils/lpad'
import { CardWithGlow, CardWithGlowProps } from '~components/Card'
import Icon from '~components/Icon'
import { IMAGE__PLACEHOLDER } from '~lib/constants'
import lpad from '~utils/lpad'

const Artist = (artist) => {
  const { loading, ranking } = artist
  const handleClick = () => {
    window.open(artist.url, '_blank', 'noopener,noreferrer')
  }

  // console.dir(`artistd`)
  // console.dir(artist)

  if (loading)
    return (
      <>
        <div className="">
          <div className="flex align-center my-6 w-full" onClick={() => handleClick}>
            <CardWithGlow blurDataURL={IMAGE__PLACEHOLDER.meta.base64}>
              <CardWithGlowProps
                loading={loading}
                reverse={ranking % 2 == 0}
                headline={`${lpad(ranking)}.`}
                subline={``}
                tags={[]}
                description={<></>}
                share={
                  <>
                    <p
                      className={cx(
                        'underline-style-solid underline-offset-md underline-thickness-md',
                        '_text-black'
                      )}
                    >
                      Loading.
                      <Icon
                        className="h-4 w-4 ml-2 mb-1 inline-flex _text-black"
                        icon={'ExternalLinkIcon'}
                      />
                    </p>
                  </>
                }
                slug={IMAGE__PLACEHOLDER?.meta?.slug}
                meta={IMAGE__PLACEHOLDER}
              />
            </CardWithGlow>
          </div>
        </div>
      </>
    )

  // const tags = []
  // const tags = artist.genres.slice(0, 3)
  const tags = artist.genres

  return (
    <>
      <div className="">
        <div className="flex align-center my-6 w-full" onClick={() => handleClick}>
          <CardWithGlow blurDataURL={artist.meta.base64}>
            <CardWithGlowProps
              reverse={ranking % 2 == 0}
              headline={`${lpad(ranking)}. ${artist.name}`}
              subline={``}
              tags={tags}
              description={<>{artist?.biography?.text}</>}
              share={
                <>
                  <a
                    aria-label={`Link to ${artist.name}`}
                    className={cx(
                      'underline-style-solid underline-offset-md underline-thickness-md',
                      '_text-black'
                    )}
                    href={artist.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={`Link to ${artist.name}`}
                  >
                    See full bio here.
                    <Icon
                      className="h-4 w-4 ml-2 mb-1 inline-flex _text-black"
                      icon={'ExternalLinkIcon'}
                    />
                  </a>
                </>
              }
              slug={artist?.meta?.slug}
              meta={artist}
            />
          </CardWithGlow>
        </div>
      </div>
    </>
  )
}

export default Artist
