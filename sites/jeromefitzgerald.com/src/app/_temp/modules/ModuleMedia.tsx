import { Caption } from '@jeromefitz/ds/components/Caption'
import { cx } from '@jeromefitz/ds/utils/cx'

import NextImage from 'next/image'
import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'

const imageProps = {
  alt: '',
  blurDataURL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAIAAAAYbLhkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyUlEQVR4nAG+AEH/ADMzOm9vcWVmaGRjZXt7eyQkLQAgGCBQQUWUioiUj5InJS8OBRQA9cC786+tvaeh/+3jLhYgKBEaAJqHiVI/RTkqMZp5d7ynpGNcZQAXBBIUBRP/wL7Nj5D1187lxcAAQjI3clhb/+vjvKWmGxQfOywzAP/Lx/StqpmIg//v4j0kKggAAACKf4JXTVI3Nz1MREpCO09sf2wAHR8lMzM6Ojg+Eg8cSkdXe4d7AB4bJSUkKxkXIgQBEicnLAcAE/8qRPMGMLIJAAAAAElFTkSuQmCC',
  height: 1632,
  quality: 90,
  sizes: '(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 70vw',
  src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2019/12/_original/jje--cover--william-lardinois.jpg',
  width: 1056,
}

function ModuleMedia() {
  const id = 'image-caption-test'
  const imageCaption = 'testing testing testing'
  return (
    <>
      <div
        className={cx(
          'mb-[var(--mbm-media)] mt-[var(--mtm-media)] pb-[var(--pbm-media)] pt-[var(--ptm-media)]',
          'md:mb-[var(--mbd-media)] md:mt-[var(--mtd-media)] md:pb-[var(--pbd-media)] md:pt-[var(--ptd-media)]',
          'flex gap-[var(--grid-gap)] self-baseline',
          'overflow-hidden',
          '',
          '',
        )}
      >
        <div
          className={cx(
            '[--object-fit:cover] [--object-position:50%_50%]',
            'size-full bg-no-repeat [background-position:var(--object-position)] [background-size:var(--object-fit)]',
            'overflow-hidden',
          )}
        >
          {/* <img
            className={cx(
              'flex h-full w-full [background-position:var(--object-position)] [background-size:var(--object-fit)]'
            )}
            src={imageUrl}
          /> */}
          <NextImage
            className={cx(
              'flex size-full [background-position:var(--object-position)] [background-size:var(--object-fit)]',
            )}
            fill={false}
            placeholder="blur"
            // src={imageUrl}
            {...imageProps}
          />
          {!!imageCaption && (
            <div className="mx-auto w-full max-w-7xl">
              <Caption>
                <EmojiWrapper id={id} text={`${imageCaption}`} />
                {/* {imageCaption} */}
              </Caption>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export { ModuleMedia }
