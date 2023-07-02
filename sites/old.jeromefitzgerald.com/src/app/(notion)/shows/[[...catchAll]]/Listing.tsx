import type { Show } from '@jeromefitz/notion/schema'
import { cx } from '@jeromefitz/shared/src/utils'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Item } from './Item'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Listing({ data, pathVariables }) {
  const items = data?.items?.results
  // log(`${DEBUG_KEY} items`, items)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const image = {}
  return (
    <>
      <div
        id="wrapper"
        className={cx(
          'grid gap-[30px] p-[30px]',
          'grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(2,1fr)]'
        )}
      >
        {items &&
          items.map((item: any) => {
            const { properties }: { properties: Show } = item
            // const { base64, img }: { base64: string; img: any } = await getImage(
            //   item.image.type === 'external'
            //     ? item.image.external.url
            //     : item.image.file.url
            // )

            // const image = {
            //   blurDataURL: base64,
            //   ...img,
            // }

            return (
              <NextLink
                className={cx('group no-underline')}
                href={`/shows/${properties.slug}`}
                key={`link-${item?.id}`}
              >
                <div
                  className={cx(
                    'cursor-pointer rounded-[5px]',
                    'bg-radix-slate2 hover:bg-radix-slate1 shadow',
                    'transition-colors duration-200'
                  )}
                >
                  {/* image */}
                  <div
                    className={cx('relative block', 'pt-[100%] ', 'md:pt-[69.6%] ')}
                  >
                    <div
                      className={cx(
                        'absolute left-0 top-0 flex h-full w-full items-start justify-start'
                      )}
                    >
                      <div className={cx('m-auto w-full')}>
                        <div
                          className={cx(
                            // 'overflow-hidden',
                            'm-auto rounded-[5px] shadow-lg',
                            'w-full',
                            // 'max-w-[50%]',
                            'bg-[var(--whiteA5)] ',
                            ''
                          )}
                        >
                          <div
                            className={
                              cx()
                              // 'relative',
                              // // 'pt-[62.5%]',
                              // 'pt-[68.6%]',
                              // // 'group-hover:origin-[33%_75%]',
                            }
                            // whileHover={{ scale: 1.1, x: -20 }}
                          >
                            {/* @todo(types) Promise in JSX Async */}
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <Item item={item} />
                            {/* <Image
                                {...image}
                                placeholder="blur"
                                className={cx(
                                  'overflow-hidden inline-block align-top',
                                  'h-full w-full left-0 top-0',
                                  '!absolute'
                                )}
                              /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* content */}
                  <div className={cx('flex p-6 pt-0')}>
                    <div className={cx('relative m-0')}>
                      <p className={cx('text-xl font-bold')}>
                        {item.properties.title}
                      </p>
                      <p className={cx('text-lg font-normal')}>
                        {item.properties.seoDescription}
                      </p>
                    </div>
                    {/* <div className={cx('m-0 ml-auto')}>
                      <p
                        className={cx(
                          'text-sm rounded-full bg-black text-white p-2'
                        )}
                      >
                        improv
                      </p>
                    </div> */}
                  </div>
                </div>
              </NextLink>
            )
          })}
      </div>
    </>
  )
}

export { Listing }
