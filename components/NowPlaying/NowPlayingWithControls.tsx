import cx from 'clsx'
import Image from 'next/image'
import useSWR from 'swr'

import fetcher from '~lib/fetcher'

import {
  MdPause,
  // MdPlayArrow,
  MdRepeat,
  // MdReplay30,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  // MdStop,
} from 'react-icons/md'

// import styles from './NowPlaying.module.css'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require('./NowPlaying.module.css')

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const HEIGHT = 150
const WIDTH = HEIGHT

const isPlayable = false

/**
 * @todo(spotify) Randomize with Nice Rec joints when not playing
 */
const initialData = {
  album: 'Spilligion',
  albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273230d88bf27d6ca322fb59eb4',
  artist: 'Spillage Village, JID, EARTHGANG',
  isPlaying: false,
  songUrl: 'https://open.spotify.com/track/7f6CWizFGRfpyOstAbyxy1',
  title: 'Mecca (with JID & EARTHGANG)',
  year: '2020',
}

const NowPlaying = () => {
  const { data } = useSWR('/api/spotify/now-playing', fetcher, {
    initialData,
    refreshInterval: HOUR,
    revalidateOnFocus: true,
  })

  return (
    <>
      <div className={cx(styles.container)}>
        <div className={cx('bg-transparent shadow-2xl h-auto')}>
          <Image
            alt={`Album Cover for ${data?.album}`}
            className="rounded-sm"
            height={HEIGHT}
            src={data?.albumImageUrl}
            title={data?.album}
            width={WIDTH}
          />
        </div>
        <div className={cx('flex flex-col ml-4', styles.test)}>
          <a
            className={cx(styles.link)}
            href={data?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data?.title ?? 'Not Playing'}
          </a>
          <p className={cx(styles.text)}>{data?.artist}</p>
          <p className={cx(styles.text, 'italic')}>
            {data?.album} <span>({data?.year ?? '2020'})</span>
          </p>
          <p>Status: {data?.isPlaying ? 'Playing' : 'Not Playing'}</p>
        </div>
      </div>
      <hr className="w-full  border-gray-900 hidden sm:block" />
      <div className="flex flex-col justify-center px-8 bg-green-300">
        <div className="flex flex-col w-full p-2 md:p-8 my-0 md:my-8 mx-auto max-w-4xl">
          <h1>Listening To</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16">
            <div className="relative z-10 col-start-1 row-start-1 px-4 pt-32 pb-3 bg-gradient-to-t from-black sm:bg-none">
              <p className="text-sm md:text-2xl font-black text-white mb-2 sm:mb-1 sm:text-gray-900">
                {data?.artist}
              </p>
              <h2 className="text-xl font-semibold text-white mb-2 sm:mb-1 sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">
                {data?.title}
              </h2>
              <h3 className="text-sm font-sans text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">
                {data?.album}
                <span className="ml-1 italic">({data?.year})</span>
              </h3>
            </div>
            <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
              <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                {/* <div className="relative col-span-3 row-span-2 md:col-span-2"> */}
                <div className="relative col-span-3 row-span-2 md:col-span-3">
                  {/* <img
                    alt={`Album Cover for ${data?.album}`}
                    className="absolute inset-0 object-cover sm:rounded-lg"
                    height={450}
                    src={data?.albumImageUrl}
                    title={data?.album}
                    width={450}
                  /> */}
                  <Image
                    alt={`Album Cover for ${data?.album}`}
                    className="rounded-xl"
                    height={450}
                    src={data?.albumImageUrl}
                    title={data?.album}
                    width={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-gray-900 hidden sm:block" />
      <div className="w-full">
        <div className="h-2"></div>
        <div className="flex items-center justify-center">
          <div className="bg-transparent md:rounded-2xl">
            <div className="flex flex-col md:flex-row">
              <div className="">
                {/* <Image
                  alt={`Album Cover for ${data?.album}`}
                  height={450}
                  src={data?.albumImageUrl}
                  title={data?.album}
                  width={450}
                /> */}
                <img
                  alt={`Album Cover for ${data?.album}`}
                  // height={450}
                  src={data?.albumImageUrl}
                  title={data?.album}
                  // width={450}
                />
              </div>
              <div className="w-full p-8 bg-gray-300">
                <div className="flex">
                  <div>
                    <h3 className={cx(styles.title)}>{data?.title}</h3>
                    <p className={cx(styles.artist)}>{data?.artist}</p>
                    <p className="text-gray-500 font-normal italic">
                      {data?.album}
                      <span className="ml-1 italic">({data?.year})</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <div className={cx(styles.button)}>
                    <MdShuffle />
                  </div>
                  <div className={cx(styles.button)}>
                    <MdSkipPrevious />
                  </div>
                  <div className={cx(styles.button, styles.buttonPlay)}>
                    <MdPause />
                  </div>
                  <div className={cx(styles.button)}>
                    <MdSkipNext />
                  </div>
                  <div className={cx(styles.button)}>
                    <MdRepeat />
                  </div>
                </div>
              </div>
            </div>
            {!!isPlayable && (
              <div className="mx-8 py-4">
                <div className="flex justify-between text-sm text-grey-darker">
                  <p>0:40</p>
                  <p>4:20</p>
                </div>
                <div className="mt-1">
                  <div className="h-1 rounded-full">
                    <div className="w-1/5 h-1 rounded-full relative">
                      <span className="w-4 h-4 absolute pin-r pin-b -mb-1 rounded-full shadow"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NowPlaying
