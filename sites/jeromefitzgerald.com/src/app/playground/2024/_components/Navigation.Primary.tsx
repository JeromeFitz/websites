'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cx } from '@jeromefitz/ds/utils/cx'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'

// import { useHover } from '@mantine/hooks'
import { DotFilledIcon } from '@radix-ui/react-icons'
import { AspectRatio } from '@radix-ui/themes/dist/esm/components/aspect-ratio.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Inset } from '@radix-ui/themes/dist/esm/components/inset.js'
// import { useEffect, useState } from 'react'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import {
  // Close as PopoverClose,
  Content as PopoverContent,
  Root as PopoverRoot,
  Trigger as PopoverTrigger,
} from '@radix-ui/themes/dist/esm/components/popover.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { useState } from 'react'

import { useStore as _useStore, useShallow } from '@/store/index'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      isOverlay: store.isOverlay,
      isOverlaySet: store.isOverlaySet,
    })),
  )
}

const image = {
  alt: 'Jerome is wearing a black suit, with a paper mâché head of Charles Entertainment Cheese Junior. A blue duct-tap cap with a yellow “C” resides between two giant rat (mouse?) ears with a cut-out for his face. He is standing pointing an accusatory finger at two poor seated schlubs about to incur his wrath. Due to his stance and finger pointing you cannot see his face under the paper mâché rat head and just see his right ear and side cheek. There is an empty pizza box on a chair behind him.',
  blurDataURL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC',
  // className: 'rounded-3',
  height: 960,
  order: 0,
  // quality: 90,
  sizes:
    '(max-width: 768px) 90vw, (max-width: 1280px) 50vw, (max-width: 2560px) 61vw, 50vw',
  src: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  url: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  width: 1280,
}

function NavigationPrimary({ order = 0 }) {
  const { isOverlaySet } = useStore()
  const [isPopover, isPoperoverSet] = useState(false)

  return (
    <div
      className={cx('', 'relative h-auto w-min flex-none')}
      // ref={ref}
      style={{ opacity: 1, order }}
    >
      <div className={cx('contents')}>
        {/* @todo(radix) children */}
        {/* @ts-ignore */}
        <PopoverRoot
          modal={true}
          onOpenChange={() => {
            isOverlaySet()
            isPoperoverSet(!isPopover)
          }}
          open={isPopover}
        >
          <PopoverTrigger asChild>
            <Button
              aria-label="Jerome"
              className={cx(
                'bg-accent-1 hover:bg-accent-2 transition-colors',
                '[&>svg]:data-[state="open"]:animate-none',
                'flex flex-row gap-0',
              )}
              // color={isLoading ? 'accent' : 'gray'}
              color="gray"
              radius="full"
              size="3"
              variant="outline"
            >
              <DotFilledIcon
                className={cx(
                  'text-pink-11 size-6 animate-pulse transition-all delay-1000',
                  '',
                )}
              />
              <Text>
                <Strong>Jerome</Strong>
              </Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            asChild
            // className="!z-[999]"
            size="1"
            style={{ zIndex: '9999' }}
          >
            <Grid
              className={cx(
                'rounded-3 border-gray-7 !overflow-hidden border-1',
                'w-[calc(var(--radix-popper-available-width)_-_3px)] min-w-[unset]',
                'md:max-w-[309px]',
              )}
              m="0"
              p="0"
            >
              <Inset mb={{ initial: '6', md: '4' }} p="0" side="top">
                <AspectRatio ratio={4 / 3}>
                  <NextImage {...image} />
                </AspectRatio>
              </Inset>

              <Flex
                direction="column"
                display="flex"
                gap="6"
                mb={{ initial: '6', md: '4' }}
                px={{ initial: '3', md: '3' }}
              >
                <Text as="p" size="3" trim="both">
                  <Em>Hello, fellow human (or robot).</Em>
                </Text>
                <Text as="p" size="3" trim="both">
                  <Strong>
                    I‘m Jerome (he/him).
                    <br />
                    An actor, comedian, & writer.
                  </Strong>
                </Text>
                <Text as="p" size="3" trim="both">
                  My focus is mainly comedy with the occasional drama or musical
                  number.
                </Text>
                <Text as="p" size="3" trim="both">
                  Along with a healthy career in engineering leadership.
                </Text>
                <Text as="p" size="3" trim="both">
                  Well,{' '}
                  <Link
                    asChild
                    onClick={() => {
                      isOverlaySet()
                      isPoperoverSet(!isPopover)
                    }}
                  >
                    <NextLink href="/about">click around</NextLink>
                  </Link>{' '}
                  I guess.
                </Text>
              </Flex>
            </Grid>
          </PopoverContent>
        </PopoverRoot>
      </div>
    </div>
  )
}

export { NavigationPrimary }
