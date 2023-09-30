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
    id: 'about',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'About',
    url: '/about',
    icon: <IdCardIcon className="text-inherit" />,
    subtitle: 'About',
    keywords: 'social about',
    type: URL_TYPE.INTERNAL,
  },
  {
    active: isDev,
    id: 'books',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Books',
    url: '/books',
    icon: <BookOpenIcon className="text-inherit" />,
    subtitle: 'Books',
    keywords: 'social books',
    type: URL_TYPE.INTERNAL,
  },
  {
    active: true,
    id: 'colophon',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Colophon',
    url: '/colophon',
    icon: <InfoCircledIcon className="text-inherit" />,
    subtitle: 'Colophon',
    keywords: 'social colophon',
    type: URL_TYPE.INTERNAL,
  },
  {
    active: isDev,
    id: 'contact',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Contact',
    url: '/contact',
    icon: <EnvelopeOpenIcon className="text-inherit" />,
    subtitle: 'Contact',
    keywords: 'social contact',
    type: URL_TYPE.INTERNAL,
  },
  {
    active: true,
    id: 'events',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Events',
    url: '/events',
    icon: <CalendarIcon className="text-inherit" />,
    subtitle: 'Events',
    keywords: 'social events',
    type: URL_TYPE.INTERNAL,
  },
  {
    active: isDev,
    id: 'music',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Music',
    url: '/music',
    icon: <MusicalNoteIcon className="text-inherit" />,
    subtitle: 'Music',
    keywords: 'social music',
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
  {
    active: true,
    id: 'shows',
    className: 'hover:text-radix-pink11',
    // className: '',
    title: 'Shows',
    url: '/shows',
    icon: <StarIcon className="text-inherit" />,
    subtitle: 'Shows',
    keywords: 'social shows',
    type: URL_TYPE.INTERNAL,
  },
]
const socials = [
  {
    active: true,
    id: 'bluesky',
    className: 'hover:text-[#3399FF]', // #87CEEB
    title: 'Bluesky',
    url: 'https://bsky.app/profile/jeromefitzgerald.com',
    icon: <CloudIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jeromefitzgerald.com',
    keywords: 'social bluesky',
    type: URL_TYPE.EXTERNAL,
  },
  {
    active: true,
    id: 'github',
    className: 'hover:text-black/60 dark:hover:text-white/60',
    title: 'GitHub',
    url: 'https://github.com/JeromeFitz',
    icon: <GitHubLogoIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    keywords: 'social github gh git',
    type: URL_TYPE.EXTERNAL,
  },
  {
    active: true,
    id: 'instagram',
    className: 'hover:text-instagram',
    title: 'Instagram',
    url: 'https://instagram.com/JeromeFitz',
    icon: <InstagramLogoIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    keywords: 'social instagram ig',
    type: URL_TYPE.EXTERNAL,
  },
  {
    active: true,
    id: 'linkedin',
    className: 'hover:text-linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jeromefitzgerald',
    icon: <LinkedInLogoIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jeromefitzgerald',
    keywords: 'social linkedin',
    type: URL_TYPE.EXTERNAL,
  },
  {
    active: true,
    id: 'spotify',
    className: 'hover:text-spotify dark:hover:text-spotify-dark',
    title: 'Spotify',
    url: 'https://open.spotify.com/user/jyxdd2oc2koozvbs7gk7omnwc',
    icon: <SpotifyLogoIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: 'some wild username spotify is odd',
    keywords: 'social spotify',
    type: URL_TYPE.EXTERNAL,
  },
  {
    active: true,
    id: 'twitter',
    className: 'hover:text-twitter',
    title: 'Twitter',
    url: 'https://twitter.com/JeromeFitz',
    icon: <TwitterLogoIcon className="text-inherit" />,
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    keywords: 'social twitter',
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
                  <li className={cx('mb-2 md:mb-0.5', 'flex')}>
                    <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
                      <span className="">
                        v{isBranchMain ? version : `${version}-${prerelease}`}
                      </span>
                      <span className="mr-2 h-4 w-4">
                        <ArchiveIcon className="text-inherit" />
                      </span>
                    </span>
                  </li>
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
