import cx from 'clsx'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import NextImage from 'next/image'
import _title from 'title'

const CardWithGlowProps = ({
  description,
  headline,
  loading = false,
  meta,
  reverse = false,
  share,
  slug,
  subline,
  tags,
}) => {
  const slugger = new Slugger()
  // const imageSlug = slugger.slug(album?.imageUrl)
  // const imageData = !!imageSlug && !!images && images[imageSlug]
  const imageSlug = slug
  const imageData = meta?.meta

  return (
    <div
      className={cx(
        'flex flex-col md:flex-row w-full min-h-full',
        // 'h-80',
        reverse && 'md:flex-row-reverse'
        //'mb-0'
      )}
    >
      <div
        className={cx('flex flex-col md:w-2/5', 'px-5 py-5', 'md:px-10 md:py-10')}
      >
        <p
          className={cx(
            'font-black text-xl md:text-2xl _text-black',
            loading && 'flex flex-row justify-items-center'
          )}
        >
          <span>{headline}</span>
          {loading && (
            <span className="animate-pulse bg-black dark:bg-black rounded h-5/6 w-full inline-flex ml-1 mt-0.5" />
          )}
        </p>
        <div className={cx('spacer bg-gray-600 dark:bg-gray-300')} />
        <p
          className={cx(
            'font-medium text-lg md:text-xl pb-1 md:pb-2 _text-black',
            loading && 'flex flex-row justify-items-center'
          )}
        >
          <span>{subline}</span>
          {loading && (
            <span className="inline-flex animate-pulse ml-1 mt-0.5 h-16 w-full flex-col justify-between">
              <span className="bg-black dark:bg-black rounded h-4 w-5/6" />
              <span className="bg-black dark:bg-black rounded h-4 w-4/6" />
              <span className="bg-black dark:bg-black rounded h-4 w-3/6" />
            </span>
          )}
        </p>
        <ul className={cx('h-auto mb-1 md:mb-2')}>
          {_map(tags, (tag) => (
            <li className={cx(`badge-xs`)} key={slugger.slug(tag)}>
              {_title(tag)}
            </li>
          ))}
        </ul>
        {!loading && (
          <>
            <p className="font-normal text-base md:text-lg pb-1 md:pb-1 _text-black">
              {description}
            </p>
            <p className="text-sm md:text-base _text-black">{share}</p>
          </>
        )}
      </div>
      <div
        className={cx(
          'flex flex-col md:w-3/5 justify-center',
          'rounded-xl overflow-hidden',
          reverse ? 'rounded-r-none' : 'rounded-l-none'
          // 'md:drop-shadow-xl md:scale-105'
        )}
        style={{
          background: !loading && `url(${imageData.base64})`,
          backgroundSize: 'cover',
        }}
      >
        {!!imageData && !loading ? (
          <NextImage
            alt={`Image for ${meta?.name}`}
            blurDataURL={imageData.base64}
            className={cx('rounded')}
            key={imageSlug}
            layout="intrinsic"
            placeholder="blur"
            title={`Image for ${meta?.name}`}
            {...imageData.img}
          />
        ) : (
          <div
            className={cx('rounded animate-pulse bg-black')}
            style={{
              height: imageData.img.height,
              width: imageData.img.width,
            }}
          />
        )}
        {/* <ImageCaption caption={seoImageDescription} /> */}
      </div>
    </div>
  )
}

export default CardWithGlowProps
