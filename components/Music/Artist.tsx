import Image from 'next/image'
import cx from 'clsx'
import { MdOpenInNew } from 'react-icons/md'
import lpad from '~utils/lpad'
import { Skeleton } from '~components/Music'
import SplitText from '~components/SplitText'

const Artist = (artist) => {
  const handleClick = () => {
    window.open(artist.uri, '_blank', 'noopener,noreferrer')
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
          'text-gray-800 dark:text-gray-400',
          'ml-4',
          'group-hover:text-green-500 dark:group-hover:text-yellow-200',
          'delay-75'
        )}
      >
        {lpad(artist.ranking)}.
      </p>
      <div
        className={cx(
          'ml-6 mr-2 hidden md:inline-flex',
          'hidden md:inline-flex',
          'w-24 h-24 md:w-32 md:h-30',
          'rounded-md border border-gray-700 dark:border-gray-200 bg-gray-100',
          'group-hover:border-green-500 dark:group-hover:border-yellow-200',
          'transition-all ease-in-out delay-75'
        )}
      >
        {artist.loading ? (
          <Skeleton type="image" />
        ) : (
          <Image
            alt={`Image of ${artist.name}`}
            height={128}
            width={128}
            src={artist.image}
            className={cx()}
          />
        )}
      </div>
      <div className="flex flex-col pl-3 w-60 md:w-full">
        {artist.loading ? (
          <Skeleton />
        ) : (
          <a
            aria-label={artist?.name}
            className={cx(
              'text-gray-900 dark:text-gray-300',
              'group-hover:text-green-500 dark:group-hover:text-yellow-200',
              'underline underline-offset-sm underline-thickness-sm',
              'font-semibold text-lg md:text-2xl',
              'flex flex-row'
            )}
            href={artist.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="md:max-w-lg truncate">
              <SplitText speed={3} splitBy="letter" text={artist?.name} />
            </span>
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
