// import Image from 'next/image'
import cx from 'clsx'
import { MdOpenInNew } from 'react-icons/md'
import lpad from '~utils/lpad'
import { Skeleton } from '~components/Music'

const Artist = (artist) => {
  return (
    <li
      className={cx(
        'flex flex-row items-center',
        'border-t first:border-t-0',
        'border-l-0 border-r-0 ',
        'w-full',
        'py-6',
        'border-cool-gray-900 dark:border-cool-gray-100',
        'odd:bg-cool-gray-200 dark:odd:bg-cool-gray-800'
      )}
    >
      <p
        className={cx(
          'text-sm font-bold',
          'text-cool-gray-600 dark:text-cool-gray-400',
          'ml-4'
        )}
      >
        {lpad(artist.ranking)}.
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
        alt={`Image of ${artist.name}`}
        src={artist.image}
        className={cx(
          'w-16 h-16 md:w-24 md:h-24',
          'hidden md:inline-flex ml-6 mr-2',
          'rounded-md border border-cool-gray-700 dark:border-cool-gray-200 bg-gray-100'
        )}
      />
      <div className="flex flex-col pl-3 w-60 sm:w-96 md:w-full">
        {artist.loading ? (
          <Skeleton />
        ) : (
          <a
            className={cx(
              'text-cool-gray-900 dark:text-cool-gray-300',
              'font-semibold text-lg md:text-2xl',
              'flex flex-row'
            )}
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="md:max-w-lg truncate">{artist?.name}</span>
            <span className="ml-2 mt-0.5 text-base">
              <MdOpenInNew />
            </span>
          </a>
        )}
      </div>
    </li>
  )
}

export default Artist
