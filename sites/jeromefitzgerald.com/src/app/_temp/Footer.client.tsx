'use client'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  ExternalLinkIcon,
  InfoCircledIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import dynamic from 'next/dynamic.js'
import { useEffect, useState } from 'react'

import { Grid } from '@/components/Grid/index'
import { socials } from '@/data/socials'

const FooterCmdkClient = dynamic(
  async () => {
    const { FooterCmdkClient: Component } = await import('./Footer.Cmdk.client')
    return { default: Component }
  },
  { ssr: false },
)
const FooterThemeClient = dynamic(
  async () => {
    const { FooterThemeClient: Component } = await import('./Footer.Theme.client')
    return { default: Component }
  },
  { ssr: false },
)
const FooterVersionClient = dynamic(
  async () => {
    const { FooterVersionClient: Component } = await import(
      './Footer.Version.client'
    )
    return { default: Component }
  },
  { ssr: false },
)

function FooterClient() {
  const [isLoading, isLoadingSet] = useState(true)
  useEffect(() => isLoadingSet(false), [isLoading])
  return (
    <>
      <Separator size="4" />
      <Grid
        as="div"
        className={cx(
          'top-0 z-10 mx-auto w-full',
          'col-span-full',
          'bg-white dark:bg-black',
          '',
          'lg:pt-8 lg:pb-2',
        )}
      >
        <div className="col-span-full flex items-end justify-start">
          <Callout
            className={cx('m-0 max-w-screen-sm p-4 md:m-0')}
            icon={InfoCircledIcon}
            size="2"
            variant="surface"
          >
            <Box asChild display="block">
              <Text as="span" size="2">
                This site is nowhere near perfect, but it is shippable, heh.
              </Text>
            </Box>
            <Box asChild display="block">
              <Text as="span" size="2">
                Consider this eternally under construction.
              </Text>
            </Box>
          </Callout>
        </div>
      </Grid>
      <Grid
        as="div"
        className={cx(
          'top-0 z-10 mx-auto w-full md:min-h-[225px]',
          'col-span-full',
          '',
          'lg:py-12',
        )}
      >
        <Flex
          className="col-span-full"
          direction={{ initial: 'column-reverse', md: 'row' }}
          gap={{ initial: '6', md: '0' }}
          justify="between"
          width="100%"
        >
          <Flex
            align={{ initial: 'center', md: 'end' }}
            className="col-span-full md:col-span-5"
            gap="2"
            justify="start"
          >
            <Flex
              direction={{ initial: 'column', md: 'column' }}
              gap={{ initial: '6', md: '4' }}
              width="100%"
            >
              <ul
                className={cx(
                  'flex flex-row gap-4',
                  'justify-center',
                  'md:place-items-baseline md:items-center md:justify-start',
                )}
              >
                {socials.map((social) => {
                  if (!social.active) return null

                  return (
                    <li className={cx('')} key={`footer--social--${social.id}`}>
                      <Button
                        asChild
                        highContrast
                        radius="full"
                        size="2"
                        variant="ghost"
                      >
                        <a
                          className={cx(
                            'hover:cursor-pointer lg:flex',
                            'text-gray-12 hover:text-gray-12',
                            // 'duration-250 transition-colors',
                            'place-content-start items-center justify-items-start lg:w-full',
                            social.className,
                          )}
                          href={social.url}
                          target="_blank"
                        >
                          {social.icon}
                          <span
                            className={cx(
                              // 'flex flex-row items-center justify-center gap-2',
                              'hidden',
                              '',
                            )}
                          >
                            <span className="text-inherit">{social.title}</span>{' '}
                            <ExternalLinkIcon className="text-gray-12" />
                          </span>
                        </a>
                      </Button>
                    </li>
                  )
                })}
              </ul>
              <Text
                align={{ initial: 'center', md: 'left' }}
                className="font-mono"
                size={{ initial: '1', md: '2' }}
              >
                <Text className="mr-0 size-4 font-sans md:mr-2">
                  <EmojiWrapper id={`no-need-2`} text={`©`} />
                </Text>
                <Box as="span" display="inline">
                  <Text>Nice Group of People, LLC –&nbsp;</Text>
                  <Text className="">{new Date().getFullYear()}</Text>
                </Box>
              </Text>
            </Flex>
          </Flex>
          <Flex
            align={{ initial: 'center', md: 'end' }}
            className="col-span-full md:col-span-7"
            direction={{ initial: 'row', md: 'column' }}
            gap="4"
            justify={{ initial: 'between', md: 'end' }}
          >
            <Box className="min-h-9">
              <FooterThemeClient isLoading={isLoading} />
            </Box>
            <Box className="mr-2 min-h-9 md:mr-0 md:min-h-6">
              <FooterVersionClient isLoading={isLoading} />
            </Box>
            <Box className="hidden md:inline-flex md:min-h-6">
              <FooterCmdkClient isLoading={isLoading} />
            </Box>
          </Flex>
        </Flex>
      </Grid>
    </>
  )
}

export { FooterClient }
