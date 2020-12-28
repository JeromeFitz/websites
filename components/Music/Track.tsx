import { MdOpenInNew } from 'react-icons/md'
import lpad from '~utils/lpad'
import { Skeleton } from '~components/Music'

const Track = (item) => {
  const { artist, loading, ranking, track } = item
  return (
    <div className="flex flex-row items-baseline border-b border-gray-100 dark:border-gray-800 max-w-3xl w-full mt-8">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600">
        {lpad(ranking)}.
      </p>
      <div className="flex flex-col pl-3 mb-4 w-60 sm:w-96 md:w-full">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton className="bg-gray-500 dark:bg-gray-400" />
          </>
        ) : (
          <>
            <a
              className="font-medium text-gray-900 dark:text-gray-100 pt-1 flex flex-row"
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="truncate">{track.name}</span>
              <span className="ml-2 mt-1">
                <MdOpenInNew />
              </span>
            </a>
            <p className="text-gray-500 truncate" color="gray.500">
              {artist.name}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Track
