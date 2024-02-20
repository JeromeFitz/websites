import {
  ArchiveIcon,
  // ArrowTopRightIcon,
  ExternalLinkIcon,
} from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Button } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Grid } from '~app/playground/2024/_components/Grid'
import { WIPFooter } from '~components/WIP'
/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/build-info.json'
import { socials } from '~data/socials'

import { FooterCmdkClient } from './Footer.Cmdk.client'
import { TooltipWrapper } from './Footer.client'

const { isBranchMain, prerelease, version } = buildInfo

function Footer() {
  return (
    <Grid
      as="div"
      className={cx(
        'top-0 z-10 mx-auto w-full ',
        'col-span-4',
        'bg-white dark:bg-black',
        'border-t-1 border-[var(--gray-a3)]',
        '',
        'md:py-12',
      )}
    >
      <div className="col-span-4 my-8 flex items-center justify-between">
        <WIPFooter />
      </div>
      <div
        className={cx(
          'flex items-center justify-start',
          'col-span-4 my-2 py-2',
          'md:col-span-1 md:my-1 md:mr-4 md:py-1 md:pr-4',
        )}
      >
        <ul
          className={cx(
            'flex flex-row flex-wrap',
            'place-items-baseline items-start justify-between',
          )}
        >
          {socials.map((social) => {
            if (!social.active) return null

            return (
              <li className={cx('my-2')} key={`footer--social--${social.id}`}>
                <TooltipWrapper
                  description={
                    social?.tooltipDescription || 'I barely use social media'
                  }
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
                        'hover:cursor-pointer md:flex',
                        'text-[var(--slate12)] hover:text-[var(--slate12)]',
                        'dark:text-[var(--slate1)] dark:hover:text-[var(--slate1)]',
                        'duration-250 transition-colors',
                        'place-content-start items-center justify-items-start md:w-full',
                        social.className,
                      )}
                      href={social.url}
                      target="_blank"
                    >
                      {social.icon}
                      <p className="text-inherit">{social.title}</p>{' '}
                      <ExternalLinkIcon className="text-[var(--gray-12)]" />
                    </a>
                  </Button>
                </TooltipWrapper>
              </li>
            )
          })}
        </ul>
      </div>
      <div
        className={cx(
          'flex items-center justify-center md:items-end md:justify-end',
          'col-span-4 my-2 py-2',
          'md:col-span-3 md:my-1 md:py-1',
        )}
      >
        <div className="flex flex-col items-end justify-start gap-3 py-4 align-text-bottom md:py-0">
          <div className={cx('md:flex md:items-center', 'gap-2', 'group')}>
            <TooltipWrapper description={'Go to Colophon'}>
              <Button asChild highContrast radius="medium" size="3" variant="ghost">
                <NextLink
                  className="gap-2 group-hover:cursor-pointer md:flex"
                  href={'/colophon'}
                >
                  <ArchiveIcon className="text-[var(--gray-12)]" />
                  <p className="text-[var(--gray-12)]">
                    v{isBranchMain ? version : `${version}-${prerelease}`}
                  </p>
                </NextLink>
              </Button>
            </TooltipWrapper>
          </div>
          <div className={cx('md:flex md:items-center', 'gap-2', 'group')}>
            <FooterCmdkClient />
          </div>
          <div>
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

export { Footer }
