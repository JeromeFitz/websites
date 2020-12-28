// import Image from 'next/image'
import { MdOpenInNew } from 'react-icons/md'
import lpad from '~utils/lpad'
import { Skeleton } from '~components/Music'

const Artist = (artist) => {
  return (
    <div className="flex flex-row items-baseline border-b border-gray-100 dark:border-gray-800 max-w-3xl w-full mt-8">
      {/* <Image
        alt={artist.name}
        height={150}
        width={150}
        src={artist.image}
      /> */}
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">
        {lpad(artist.ranking)}.
      </p>
      <div className="flex flex-col pl-3 mb-4 w-60 sm:w-96 md:w-full">
        {artist.loading ? (
          <Skeleton />
        ) : (
          <a
            className="font-medium text-gray-900 dark:text-gray-100 pt-1 flex flex-row"
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="truncate">{artist?.name}</span>
            <span className="ml-2 mt-0.5">
              <MdOpenInNew />
            </span>
          </a>
        )}
      </div>
    </div>
  )
}

export default Artist
