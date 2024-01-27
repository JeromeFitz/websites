import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  ArchiveIcon,
  BookOpenIcon,
  CalendarIcon,
  CloudIcon,
  EnvelopeOpenIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  SpotifyLogoIcon,
  StarIcon,
  TwitterLogoIcon,
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

import { WIPFooter } from '~components/WIP'
/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/build-info.json'

import { ThemeToggle } from './Footer.client'

const isDev = process.env.NODE_ENV === 'development'
const { isBranchMain, prerelease, version } = buildInfo

const URL_TYPE = {
  AUDIO: 'audio',
  EXTERNAL: 'url.external',
  INTERNAL: 'url.internal',
  SETTINGS: 'settings',
  SOCIAL: 'social',
  THEME: 'theme',
}

const pages = [
  {
    active: true,
    className: 'hover:text-radix-pink11',
    icon: <HomeIcon className="text-inherit" />,
    id: 'homepage',
    keywords: 'social homepage',
    subtitle: '/',
    // className: '',
    title: '/',
    type: URL_TYPE.INTERNAL,
    url: '/',
  },
  {
    active: true,
    className: 'hover:text-radix-pink11',
    icon: <IdCardIcon className="text-inherit" />,
    id: 'about',
    keywords: 'social about',
    subtitle: 'About',
    // className: '',
    title: 'About',
    type: URL_TYPE.INTERNAL,
    url: '/about',
  },
  {
    active: isDev,
    className: 'hover:text-radix-pink11',
    icon: <BookOpenIcon className="text-inherit" />,
    id: 'books',
    keywords: 'social books',
    subtitle: 'Books',
    // className: '',
    title: 'Books',
    type: URL_TYPE.INTERNAL,
    url: '/books',
  },
  {
    active: true,
    className: 'hover:text-radix-pink11',
    icon: <InfoCircledIcon className="text-inherit" />,
    id: 'colophon',
    keywords: 'social colophon',
    subtitle: 'Colophon',
    // className: '',
    title: 'Colophon',
    type: URL_TYPE.INTERNAL,
    url: '/colophon',
  },
  {
    active: isDev,
    className: 'hover:text-radix-pink11',
    icon: <EnvelopeOpenIcon className="text-inherit" />,
    id: 'contact',
    keywords: 'social contact',
    subtitle: 'Contact',
    // className: '',
    title: 'Contact',
    type: URL_TYPE.INTERNAL,
    url: '/contact',
  },
  {
    active: true,
    className: 'hover:text-radix-pink11',
    icon: <CalendarIcon className="text-inherit" />,
    id: 'events',
    keywords: 'social events',
    subtitle: 'Events',
    // className: '',
    title: 'Events',
    type: URL_TYPE.INTERNAL,
    url: '/events',
  },
  {
    active: isDev,
    className: 'hover:text-radix-pink11',
    icon: <MusicalNoteIcon className="text-inherit" />,
    id: 'music',
    keywords: 'social music',
    subtitle: 'Music',
    // className: '',
    title: 'Music',
    type: URL_TYPE.INTERNAL,
    url: '/music',
  },
  {
    active: true,
    className: 'hover:text-radix-pink11',
    icon: <MicrophoneIcon className="text-inherit" />,
    id: 'podcasts',
    keywords: 'social podcasts',
    subtitle: 'Podcasts',
    // className: '',
    title: 'Podcasts',
    type: URL_TYPE.INTERNAL,
    url: '/podcasts',
  },
  {
    active: true,
    className: 'hover:text-radix-pink11',
    icon: <StarIcon className="text-inherit" />,
    id: 'shows',
    keywords: 'social shows',
    subtitle: 'Shows',
    // className: '',
    title: 'Shows',
    type: URL_TYPE.INTERNAL,
    url: '/shows',
  },
]
const socials = [
  {
    active: true,
    className: 'hover:text-[#3399FF]', // #87CEEB
    icon: <CloudIcon className="text-inherit" />,
    id: 'bluesky',
    keywords: 'social bluesky',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jeromefitzgerald.com',
    title: 'Bluesky',
    type: URL_TYPE.EXTERNAL,
    url: 'https://bsky.app/profile/jeromefitzgerald.com',
  },
  {
    active: true,
    className: 'hover:text-black/60 dark:hover:text-white/60',
    icon: <GitHubLogoIcon className="text-inherit" />,
    id: 'github',
    keywords: 'social github gh git',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'GitHub',
    type: URL_TYPE.EXTERNAL,
    url: 'https://github.com/JeromeFitz',
  },
  {
    active: true,
    className: 'hover:text-instagram',
    icon: <InstagramLogoIcon className="text-inherit" />,
    id: 'instagram',
    keywords: 'social instagram ig',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'Instagram',
    type: URL_TYPE.EXTERNAL,
    url: 'https://instagram.com/JeromeFitz',
  },
  {
    active: true,
    className: 'hover:text-linkedin',
    icon: <LinkedInLogoIcon className="text-inherit" />,
    id: 'linkedin',
    keywords: 'social linkedin',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jeromefitzgerald',
    title: 'LinkedIn',
    type: URL_TYPE.EXTERNAL,
    url: 'https://www.linkedin.com/in/jeromefitzgerald',
  },
  {
    active: true,
    className: 'hover:text-spotify dark:hover:text-spotify-dark',
    icon: <SpotifyLogoIcon className="text-inherit" />,
    id: 'spotify',
    keywords: 'social spotify',
    rightSlot: <ExternalLinkIcon />,
    subtitle: 'some wild username spotify is odd',
    title: 'Spotify',
    type: URL_TYPE.EXTERNAL,
    url: 'https://open.spotify.com/user/jyxdd2oc2koozvbs7gk7omnwc',
  },
  {
    active: true,
    className: 'hover:text-twitter',
    icon: <TwitterLogoIcon className="text-inherit" />,
    id: 'twitter',
    keywords: 'social twitter',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'Twitter',
    type: URL_TYPE.EXTERNAL,
    url: 'https://twitter.com/JeromeFitz',
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
                '',
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
                        '',
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
                              item?.active && item?.className,
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
                                  'flex',
                                )}
                                href={item?.url}
                              >
                                <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                                  <span className="mr-2">{item?.title}</span>
                                  <span className="mr-2 size-4">{item?.icon}</span>
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
                                  'line-through',
                                )}
                                // href={item?.url}
                              >
                                <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                                  <span className="mr-2">{item?.title}</span>
                                  <span className="mr-2 size-4">{item?.icon}</span>
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
                  <li className={cx('mb-2 md:mb-0.5', 'flex')}>
                    <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                      <span className="">
                        v{isBranchMain ? version : `${version}-${prerelease}`}
                      </span>
                      <span className="mr-2 size-4">
                        <ArchiveIcon className="text-inherit" />
                      </span>
                    </span>
                  </li>
                  <li
                    className={cx(
                      'mb-2 md:mb-0.5',
                      'flex flex-row items-center gap-1 align-middle',
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
                <WIPFooter />
              </SectionContent>
            </SectionWrapper>
            <SectionWrapper>
              <SectionHeader className="hidden">Copyright</SectionHeader>
              <SectionContent className="w-full pb-36 md:w-full md:pb-2">
                <div className="flex flex-row items-start justify-start gap-1 py-4 align-text-bottom md:py-0">
                  <span className="">
                    © {new Date().getFullYear()} Nice Group of People, LLC
                  </span>
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
