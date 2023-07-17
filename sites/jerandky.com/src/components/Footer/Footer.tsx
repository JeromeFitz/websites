import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  ExternalLinkIcon,
  FileTextIcon,
  HomeIcon,
  InstagramLogoIcon,
  MicrophoneIcon,
} from '@jeromefitz/ds/components/Icon'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
} from '@jeromefitz/ds/components/Section'
import { cx } from '@jeromefitz/ds/utils/cx'
import { Fragment, Suspense } from 'react'

/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import buildInfo from '../../config/build-info.json'

import { ThemeToggle } from './Footer.client'

// const { isBranchMain, prerelease, version } = buildInfo

const URL_TYPE = {
  EXTERNAL: 'url.external',
  INTERNAL: 'url.internal',
  AUDIO: 'audio',
  THEME: 'theme',
  SETTINGS: 'settings',
  SOCIAL: 'social',
}

const pages = [
  {
    active: true,
    id: 'homepage',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: '/',
    url: '/',
    icon: <HomeIcon className="text-inherit" />,
    subtitle: '/',
    keywords: 'social homepage',
    type: URL_TYPE.INTERNAL,
  },
  {
    active: true,
    id: 'podcasts',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Podcasts',
    url: '/podcasts',
    icon: <MicrophoneIcon className="text-inherit" />,
    subtitle: 'Podcasts',
    keywords: 'social podcasts',
    type: URL_TYPE.INTERNAL,
  },
]
const socials = [
  {
    active: true,
    id: 'instagram',
    className: 'hover:text-instagram',
    title: 'Instagram',
    url: 'https://instagram.com/jerandkyandguest',
    icon: <InstagramLogoIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jerandkyandguest',
    keywords: 'social instagram ig',
    type: URL_TYPE.EXTERNAL,
  },
]

const menus = [
  { id: 'pages', items: pages, title: 'Pages' },
  { id: 'socials', items: socials, title: 'Social' },
]

function Footer() {
  return (
    <footer>
      <div className={cx('m-2 px-2 md:m-6')}>
        <SectionWrapper>
          <SectionHeader>
            <SectionHeaderTitle>Footer</SectionHeaderTitle>
          </SectionHeader>
          <SectionContent>
            <div
              className={cx(
                'grid w-full grid-cols-12 gap-x-4 gap-y-8',
                // 'md:[&>*:nth-child(2)]:col-start-9',
                ''
              )}
            >
              {menus.map((menu) => {
                return (
                  <div
                    className={cx('col-span-12', 'md:col-span-4', '')}
                    key={`menu-${menu.id}`}
                  >
                    <p
                      className={cx(
                        'pb-3 font-extrabold uppercase tracking-tight',
                        ''
                      )}
                    >
                      <strong>{menu?.title}</strong>
                    </p>
                    <ul>
                      {menu?.items.map((item) => {
                        return (
                          <li
                            className={cx(
                              'mb-2 md:mb-0.5',
                              item?.active && item?.className
                            )}
                            key={`menu-${menu?.id}-social-${item?.id}`}
                          >
                            {item?.active ? (
                              <Anchor
                                aria-label={`A link to ${item?.subtitle} on ${item?.title}`}
                                className={cx(
                                  'icon-custom',
                                  item?.className,
                                  '!align-middle',
                                  '!text-inherit',
                                  '!no-underline',
                                  'flex'
                                )}
                                href={item?.url}
                              >
                                <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                                  <span className="mr-2">{item?.title}</span>
                                  <span className="mr-2 h-4 w-4">{item?.icon}</span>
                                </span>
                              </Anchor>
                            ) : (
                              <span
                                // aria-label={`A link to ${item?.subtitle} on ${item?.title}`}
                                className={cx(
                                  'icon-custom',
                                  item?.className,
                                  '!align-middle',
                                  '!text-inherit',
                                  // '!no-underline',
                                  'flex',
                                  'line-through'
                                )}
                                // href={item?.url}
                              >
                                <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                                  <span className="mr-2">{item?.title}</span>
                                  <span className="mr-2 h-4 w-4">{item?.icon}</span>
                                </span>
                              </span>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
              <div className={cx('col-span-12', 'md:col-span-4', '')}>
                <p
                  className={cx('pb-3 font-extrabold uppercase tracking-tight', '')}
                >
                  <strong>Info</strong>
                </p>
                <ul>
                  {/* <li className={cx('mb-2 md:mb-0.5', 'flex')}>
                    <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                      <span className="">
                        v{isBranchMain ? version : `${version}-${prerelease}`}
                      </span>
                      <span className="mr-2 h-4 w-4">
                        <ArchiveIcon className="text-inherit" />
                      </span>
                    </span>
                  </li> */}
                  <li
                    className={cx(
                      'mb-2 md:mb-0.5',
                      'flex flex-row items-center gap-1 align-middle'
                    )}
                  >
                    <Suspense fallback={<Fragment />}>
                      <ThemeToggle />
                    </Suspense>
                  </li>
                </ul>
              </div>
            </div>
            <SectionWrapper>
              <SectionHeader className="hidden">Disclaimer</SectionHeader>
              <SectionContent className="w-full md:w-full">
                <div className="flex flex-row items-start justify-start gap-1 py-4 align-text-bottom md:py-0">
                  <span className="mr-2 mt-1 h-4 w-4">
                    <FileTextIcon className="text-inherit" />
                  </span>
                  <span>
                    <span className="font-bold">Please Note: </span>
                    This site is/was under development. But mostly propped up to
                    provide RSS feeds.
                  </span>
                </div>
              </SectionContent>
            </SectionWrapper>
            <SectionWrapper>
              <SectionHeader className="hidden">Copyright</SectionHeader>
              <SectionContent className="w-full pb-36 md:w-full md:pb-2">
                <div className="flex flex-row items-start justify-start gap-1 py-4 align-text-bottom md:py-0">
                  <span className="">© 2023 Nice Group of People, LLC</span>
                </div>
              </SectionContent>
            </SectionWrapper>
          </SectionContent>
        </SectionWrapper>
      </div>
    </footer>
  )
}

export { Footer }
