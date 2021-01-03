import cx from 'clsx'
import { MdOpenInNew } from 'react-icons/md'
import lpad from '~utils/lpad'
import { Skeleton } from '~components/Music'
import SplitText from '~components/SplitText'

const Track = (item) => {
  const { album, artist, loading, ranking, track } = item
  const handleClick = () => {
    window.open(track.uri, '_blank', 'noopener,noreferrer')
  }

  return (
    <li
      className={cx(
        'flex flex-row items-center',
        'border-t last:border-b',
        'border-l-0 border-r-0 ',
        'w-full',
        'py-6',
        'border-gray-900 dark:border-gray-100',
        'even:bg-gray-400 dark:even:bg-gray-800',
        'odd:bg-gray-200 dark:odd:bg-gray-600',
        'group cursor-pointer',
        'hover:bg-white dark:hover:bg-black',
        'transition-all ease-out'
      )}
      onClick={() => handleClick}
    >
      <p
        className={cx(
          'text-sm font-bold',
          'text-gray-600 dark:text-gray-400',
          'ml-4',
          'group-hover:text-green-500 dark:group-hover:text-yellow-200',
          'delay-75'
        )}
      >
        {lpad(ranking)}.
      </p>
      {/* <Image
        alt={`Image of ${artist.name}`}
        height={64}
        width={64}
        src={artist.image}
        className={cx(
          'w-16 h-16 rounded-full pl-6 mr-2 border border-black bg-gray-100'
        )}
      /> */}
      <img
        alt={`Album cover image of “${album.name}” by ${artist.name}`}
        src={artist.loading ? '/static/images/placeholder.jpg' : album.imageUrl}
        className={cx(
          'w-16 h-16 md:w-24 md:h-24',
          'hidden md:inline-flex ml-6 mr-2',
          'rounded-md border border-gray-700 dark:border-gray-200 bg-gray-100',
          'group-hover:border-green-500 dark:group-hover:border-yellow-200',
          'transition-all ease-in-out delay-75'
        )}
      />
      <div className={cx('flex flex-col pl-3 my-4 w-60 md:w-full')}>
        {loading ? (
          <>
            <Skeleton />
            <Skeleton className="bg-gray-500 dark:bg-gray-400" />
          </>
        ) : (
          <>
            <a
              aria-label={track.name}
              className={cx(
                'text-gray-900 dark:text-gray-300',
                'group-hover:text-green-500 dark:group-hover:text-yellow-200',
                'underline underline-offset-sm underline-thickness-sm',
                'font-semibold text-lg md:text-2xl',
                'flex flex-row pt-1'
              )}
              href={track.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="max-w-lg truncate">
                <SplitText speed={3} splitBy="letter" text={track.name} />
              </span>
              <span className="ml-2 mt-1 text-base">
                <MdOpenInNew />
              </span>
            </a>
            <p
              className={cx(
                'text-gray-700 dark:text-gray-300',
                'group-hover:text-green-400 dark:group-hover:text-yellow-100',
                'delay-75',
                'text-base md:text-xl',
                'truncate'
              )}
            >
              {artist.name}
            </p>
          </>
        )}
      </div>
    </li>
  )
}

export default Track
