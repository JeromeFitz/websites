import {
  CloudIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  SpotifyLogoIcon,
  ThreadsLogoIcon,
  TwitterLogoIcon,
} from '@jeromefitz/ds/components/Icon/index'

const URL_TYPE = {
  AUDIO: 'audio',
  EXTERNAL: 'url.external',
  INTERNAL: 'url.internal',
  SETTINGS: 'settings',
  SOCIAL: 'social',
  THEME: 'theme',
}

// type Social = {
//   active: boolean
//   className: string
//   icon: any
//   id: string
//   keywords: string
//   rightSlot: any
//   subtitle: string
//   title: string
//   tooltipDescription: string
//   type: string
//   url: string
// }

const socials = [
  {
    active: true,
    className: 'hover:bg-bluesky',
    icon: <CloudIcon className="text-inherit" />,
    id: 'bluesky',
    keywords: 'social bluesky',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jeromefitzgerald.com',
    title: 'Bluesky',
    tooltipDescription: 'Uh... sure.',
    type: URL_TYPE.EXTERNAL,
    url: 'https://bsky.app/profile/jeromefitzgerald.com',
  },
  {
    active: true,
    className:
      'hover:bg-github border-0 hover:border-1 hover:border-github-dark dark:hover:bg-github-dark',
    icon: <GitHubLogoIcon className="text-inherit" />,
    id: 'github',
    keywords: 'social github gh git',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'GitHub',
    tooltipDescription: 'This I use, but still.',
    type: URL_TYPE.EXTERNAL,
    url: 'https://github.com/JeromeFitz',
  },
  {
    active: true,
    className: 'hover:bg-instagram',
    icon: <InstagramLogoIcon className="text-inherit" />,
    id: 'instagram',
    keywords: 'social instagram ig',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'Instagram',
    tooltipDescription: 'I forget about this.',
    type: URL_TYPE.EXTERNAL,
    url: 'https://instagram.com/JeromeFitz',
  },
  {
    active: true,
    className: 'hover:bg-linkedin',
    icon: <LinkedInLogoIcon className="text-inherit" />,
    id: 'linkedin',
    keywords: 'social linkedin',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@jeromefitzgerald',
    title: 'LinkedIn',
    tooltipDescription: 'Truly unhinged.',
    type: URL_TYPE.EXTERNAL,
    url: 'https://www.linkedin.com/in/jeromefitzgerald',
  },
  {
    active: true,
    className: 'hover:bg-spotify dark:hover:bg-spotify-dark',
    icon: <SpotifyLogoIcon className="text-inherit" />,
    id: 'spotify',
    keywords: 'social spotify',
    rightSlot: <ExternalLinkIcon />,
    subtitle: 'some wild username spotify is odd',
    title: 'Spotify',
    tooltipDescription: 'Who follows people this?',
    type: URL_TYPE.EXTERNAL,
    url: 'https://open.spotify.com/user/jyxdd2oc2koozvbs7gk7omnwc',
  },
  {
    active: false,
    className: 'hover:bg-threads',
    icon: <ThreadsLogoIcon className="text-inherit" />,
    id: 'threads',
    keywords: 'social threads instagram',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'Threads',
    tooltipDescription: 'Who uses this?',
    type: URL_TYPE.EXTERNAL,
    url: 'https://www.threads.net/@jeromefitz',
  },
  {
    active: false,
    className: 'hover:bg-twitter',
    icon: <TwitterLogoIcon className="text-inherit" />,
    id: 'x',
    keywords: 'social twitter x',
    rightSlot: <ExternalLinkIcon />,
    subtitle: '@JeromeFitz',
    title: 'X',
    tooltipDescription: 'Who uses this?',
    type: URL_TYPE.EXTERNAL,
    url: 'https://x.com/JeromeFitz',
  },
]

export { socials }
