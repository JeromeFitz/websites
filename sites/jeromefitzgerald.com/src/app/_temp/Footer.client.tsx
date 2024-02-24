'use client'
import {
  ArchiveIcon,
  // ArrowTopRightIcon,
  ExternalLinkIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Grid } from '@/components/Grid/index'
import { WIPFooter } from '@/components/WIP/WIP'
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
  { ssr: false },
)

function FooterClient() {
  return (
    <Grid
      as="div"
      className={cx(
        'top-0 z-10 mx-auto w-full ',
        'col-span-full',
        'bg-white dark:bg-black',
        'border-t-1 border-[var(--mauve-a3)]',
        '',
        'lg:py-12',
      )}
    >
      <div className="col-span-full my-8 flex items-center justify-between">
        <WIPFooter />
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
            <span className="mb-2 pb-2 font-bold uppercase tracking-tight text-[var(--gray-11)]">
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
                      'text-[var(--slate12)] hover:text-[var(--slate12)]',
                      'dark:text-[var(--slate1)] dark:hover:text-[var(--slate1)]',
                      'duration-250 transition-colors',
                      'place-content-start items-center justify-items-start lg:w-full',
                      social.className,
                    )}
                    href={social.url}
                    target="_blank"
                  >
                    {social.icon}
                    <p className="text-inherit">{social.title}</p>{' '}
                    <ExternalLinkIcon className="text-[var(--mauve-12)]" />
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
                <ArchiveIcon className="text-[var(--mauve-12)]" />
                <p className="font-mono text-[var(--mauve-12)]">
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
