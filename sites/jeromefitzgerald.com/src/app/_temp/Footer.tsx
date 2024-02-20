import {
  ArchiveIcon,
  ArrowTopRightIcon,
  ExternalLinkIcon,
} from '@jeromefitz/ds/components/Icon'
import { Tooltip } from '@jeromefitz/ds/components/Tooltip'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Button } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { WIPFooter } from '~components/WIP'
/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/build-info.json'
import { socials } from '~data/socials'

import { FooterCmdkClient } from './Footer.Cmdk.client'

const { isBranchMain, prerelease, version } = buildInfo
const isReady = false

function Footer() {
  return (
    <footer
      className={cx(
        'relative w-full p-[var(--header-height)_0_1.5rem] pr-0',
        'mb-20 md:mb-0',
        // 'md:z-50',
        'font-sans',
        '',
      )}
    >
      <div className={cx('')} id="footer--widget-bar">
        <div className={cx('')} />
      </div>
      <div className={cx(!isReady && 'hidden')} id="footer--top">
        <div
          className={cx(
            'flex w-full flex-col justify-between gap-[2.5rem] px-[var(--grid-margin)]',
            'md:ml-auto md:flex-row md:pr-[var(--sidebar-width)]',
          )}
        >
          <div />
          <div className={cx('flex flex-col gap-[2.5rem]')}>
            <div
              className={cx(
                'md:w-[calc(var(--cols)*(min(var(--grid-cols),_6))_-_var(--gutter))]',
              )}
            >
              <h2 className={cx('whitespace-pre-line opacity-75')}>What up doe</h2>
              <p className={cx('mt-[1rem] text-base')}>Lorem10 </p>
            </div>
            <div
              className={cx(
                'md:w-[calc(var(--cols)*(min(var(--grid-cols),_6))_-_var(--gutter))]',
                'md:gap-[2.5rem]',
                'flex flex-row flex-wrap gap-[1.5rem]',
              )}
            >
              <div
                className={cx(
                  'relative flex flex-row items-center gap-[0.7rem]',
                  'max-w-[16rem]',
                )}
              >
                <ArrowTopRightIcon />
                <span>Contact</span>
              </div>
              <div
                className={cx(
                  'relative flex flex-row items-center gap-[0.7rem]',
                  'max-w-[16rem]',
                )}
              >
                <ArrowTopRightIcon />
                <span>Join Mailing List</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('')} id="footer--heading">
        <div
          className={cx(
            // '[--start:calc(100%_-_var(--sidebar-width))]',
            'relative w-full pl-[var(--grid-margin)]',
          )}
        >
          <div className={cx('flex w-fit items-end', 'md:whitespace-pre')}>
            <h1
              className={cx(
                'pb-[4rem] pt-[2.5rem]',
                'text-5xl font-black uppercase',
              )}
            >
              &nbsp;
            </h1>
          </div>
        </div>
      </div>

      <div className={cx('mb-2')} id="footer--row">
        <div
          className={cx(
            'w-full items-end gap-[var(--sidebar-margin)] px-[var(--grid-margin)]',
            'md:grid-cols-[calc(var(--cols)*12_-_var(--gutter))_1fr] md:pr-0',
            'mb-3 hidden md:grid',
          )}
        >
          <WIPFooter />
        </div>
        <div
          className={cx(
            'flex flex-col-reverse gap-[1.125rem] pl-[var(--grid-margin)]',
            // 'md:grid md:grid-cols-[calc(var(--cols)*4_-_var(--gutter))_auto] md:gap-[var(--grid-gap)]'
            'md:grid md:grid-cols-[calc(var(--cols)*6_-_var(--gutter))_calc(var(--cols)*6_-_var(--gutter))] md:items-end md:gap-[3rem_var(--grid-gap)]',
          )}
        >
          <div>
            <div className={cx('mb-3 inline md:hidden')}>
              <WIPFooter />
            </div>

            <div className="flex flex-row items-start justify-start gap-1 py-4 align-text-bottom md:py-0">
              <span className="mr-2 size-4">©</span>
              <span>
                <span>Nice Group of People, LLC –&nbsp;</span>
                <span>{new Date().getFullYear()}</span>
              </span>
            </div>
          </div>
          <ul
            className={cx(
              'mr-[var(--grid-margin)] gap-[1.75rem]',
              'md:mr-0 md:justify-end md:gap-[1.25rem]',
              'grid w-full grid-flow-row grid-cols-2 justify-self-center',
              'md:grid md:grid-flow-row md:grid-cols-3 md:justify-items-stretch',
              '',
            )}
          >
            {socials.map((social) => {
              if (!social.active) return null

              return (
                <li className={cx('')} key={`footer--social--${social.id}`}>
                  <Tooltip
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
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className={cx('')} id="footer--bottom">
        <div
          className={cx(
            'grid w-full items-end gap-[var(--sidebar-margin)] px-[var(--grid-margin)]',
            'md:grid-cols-[calc(var(--cols)*12_-_var(--gutter))_1fr] md:pr-0',
          )}
        >
          <div
            className={cx(
              'relative h-5 w-full rounded border border-[var(--accent-8)]',
              '',
              '[mask-image:linear-gradient(transparent_50%,#000000_0)]',
              '[-webkit-mask-image:linear-gradient(transparent_50%,#000000_0)]',
            )}
          />
        </div>
      </div>
      <div
        className={cx(
          'hidden md:flex md:flex-col md:items-end md:justify-start md:pr-6',
          'md:absolute md:bottom-0 md:right-0 md:mb-5 md:gap-2',
        )}
      >
        <div className={cx('md:flex md:items-center', 'gap-2', 'group')}>
          <FooterCmdkClient />
        </div>
        <div className={cx('md:flex md:items-center', 'gap-2', 'group')}>
          <Tooltip description={'Go to Colophon'}>
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
          </Tooltip>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
