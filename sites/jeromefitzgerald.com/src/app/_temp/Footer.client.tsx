'use client'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  ArchiveIcon,
  ExternalLinkIcon,
  InfoCircledIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import dynamic from 'next/dynamic.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Grid } from '@/components/Grid/index'
/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '@/config/build-info.json'
import { socials } from '@/data/socials'

// import { FooterCmdkClient } from './Footer.Cmdk.client'

const { isBranchMain, prerelease, version } = buildInfo

const FooterCmdkClient = dynamic(
  async () => {
    const { FooterCmdkClient: Component } = await import('./Footer.Cmdk.client')
    return { default: Component }
  },
  { ssr: true },
)

function FooterClient() {
  return (
    <Grid
      as="div"
      className={cx(
        'top-0 z-10 mx-auto w-full ',
        'col-span-full',
        'bg-white dark:bg-black',
        'border-t-1 border-grayA-3',
        '',
        'lg:py-12',
      )}
    >
      <div className="col-span-full my-8 flex items-end justify-start">
        <Callout
          className={cx('m-2 max-w-screen-sm p-4')}
          icon={InfoCircledIcon}
          size="1"
          variant="surface"
        >
          <Box asChild display="block">
            <Text as="span" size="2">
              This site is being actively developed.
            </Text>
          </Box>
          <Box asChild display="block">
            <Text as="span" size="2">
              So though it is nowhere near perfect, it is shippable, heh.
            </Text>
          </Box>
          <Box asChild display="block">
            <Text as="span" size="2">
              Consider this eternally under construction.
            </Text>
          </Box>
        </Callout>
      </div>
      <div
        className={cx(
          // 'flex items-center justify-start',
          'flex items-center justify-center lg:items-end lg:justify-start',
          'col-span-full my-2 py-2',
          'lg:col-span-4 lg:my-1 lg:mr-4 lg:py-1 lg:pr-4',
        )}
      >
        <ul
          className={cx(
            'flex flex-row flex-wrap lg:flex-col',
            'place-items-baseline items-start justify-between',
          )}
        >
          <li>
            <span className="text-gray-11 tracking-1 mb-2 pb-2 font-bold uppercase">
              Social
            </span>
          </li>
          {socials.map((social) => {
            if (!social.active) return null

            return (
              <li
                className={cx('my-2 basis-1/2 lg:basis-0')}
                key={`footer--social--${social.id}`}
              >
                <Button
                  asChild
                  highContrast
                  radius="medium"
                  size="3"
                  variant="ghost"
                >
                  <a
                    className={cx(
                      'hover:cursor-pointer lg:flex',
                      'text-gray-11 hover:text-gray-12',
                      'duration-250 transition-colors',
                      'place-content-start items-center justify-items-start lg:w-full',
                      social.className,
                    )}
                    href={social.url}
                    target="_blank"
                  >
                    {social.icon}
                    <p className="text-inherit">{social.title}</p>{' '}
                    <ExternalLinkIcon className="text-gray-12" />
                  </a>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
      <div
        className={cx(
          'flex items-center justify-end lg:items-end lg:justify-end',
          'col-span-full my-1 py-1',
          'lg:col-span-8 lg:my-1 lg:py-1',
        )}
      >
        <div className="flex flex-col items-end justify-start gap-3 py-4 align-text-bottom lg:py-0">
          <div className={cx('lg:flex lg:items-center', 'gap-2', 'group')}>
            <Button asChild highContrast radius="medium" size="3" variant="ghost">
              <NextLink
                className="gap-2 group-hover:cursor-pointer lg:flex"
                href={'/colophon'}
              >
                <ArchiveIcon className="text-gray-12" />
                <p className="text-gray-12 font-mono">
                  v{isBranchMain ? version : `${version}-${prerelease}`}
                </p>
              </NextLink>
            </Button>
          </div>
          <div
            className={cx(
              'hidden font-mono lg:flex lg:items-center',
              'gap-2',
              'group',
            )}
          >
            <FooterCmdkClient />
          </div>
          <div className="font-mono">
            <span className="mr-2 size-4">©</span>
            <span>
              <span>Nice Group of People, LLC –&nbsp;</span>
              <span>{new Date().getFullYear()}</span>
            </span>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export { FooterClient }
