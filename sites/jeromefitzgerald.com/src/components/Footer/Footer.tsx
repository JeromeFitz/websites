'use client'
import {
  // EnvelopeOpenIcon as EnvelopeOpen,
  ExternalLinkIcon as ExternalLink,
  GitHubLogoIcon as GitHubLogo,
  InfoCircledIcon as InfoCircled,
  InstagramLogoIcon as InstagramLogo,
  LinkedInLogoIcon as LinkedInLogo,
  Pencil2Icon as PencilWithPaper,
  SpotifyLogoIcon as SpotifyLogo,
  TwitterLogoIcon as TwitterLogo,
} from '@jeromefitz/ds/components/Icon'
import * as Separator from '@radix-ui/react-separator'

import { Anchor } from '~components/Anchor'
import { NowPlaying } from '~components/Music'
/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/build-info.json'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '@jeromefitz/ds/components/Icon'
import { Tooltip } from '~ui/Tooltip'
import { cx } from '~utils/cx'

const { isBranchMain, prerelease, version } = buildInfo

const URL_TYPE = {
  EXTERNAL: 'url.external',
  INTERNAL: 'url.internal',
  AUDIO: 'audio',
  THEME: 'theme',
  SETTINGS: 'settings',
  SOCIAL: 'social',
}
const socials = [
  // {
  //   id: 'email',
  //   title: 'Email',
  //   url: 'mailto:j@jeromefitzgerald.com',
  //   icon: <EnvelopeOpen />,
  //   subtitle: 'j [at] jeromefitzgerald.com',
  //   keywords: 'social email mail',
  //   type: URL_TYPE.EXTERNAL,
  // },
  {
    id: 'colophon',
    className: 'hover:text-black/60 dark:hover:text-white/60',
    title: 'Colophon',
    url: '/colophon',
    icon: <InfoCircled className="text-inherit" />,
    subtitle: 'Colophon',
    keywords: 'social colophon',
    type: URL_TYPE.INTERNAL,
  },
  {
    id: 'github',
    className: 'hover:text-black/60 dark:hover:text-white/60',
    title: 'GitHub',
    url: 'https://github.com/JeromeFitz',
    icon: <GitHubLogo className="text-inherit" />,
    rightSlot: <ExternalLink />,
    subtitle: '@JeromeFitz',
    keywords: 'social github gh git',
    type: URL_TYPE.EXTERNAL,
  },
  {
    id: 'instagram',
    className: 'hover:text-instagram',
    title: 'Instagram',
    url: 'https://instagram.com/JeromeFitz',
    icon: <InstagramLogo className="text-inherit" />,
    rightSlot: <ExternalLink />,
    subtitle: '@JeromeFitz',
    keywords: 'social instagram ig',
    type: URL_TYPE.EXTERNAL,
  },
  {
    id: 'twitter',
    className: 'hover:text-twitter',
    title: 'Twitter',
    url: 'https://twitter.com/JeromeFitz',
    icon: <TwitterLogo className="text-inherit" />,
    rightSlot: <ExternalLink />,
    subtitle: '@JeromeFitz',
    keywords: 'social twitter',
    type: URL_TYPE.EXTERNAL,
  },
  {
    id: 'linkedin',
    className: 'hover:text-linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jeromefitzgerald',
    icon: <LinkedInLogo className="text-inherit" />,
    rightSlot: <ExternalLink />,
    subtitle: '@jeromefitzgerald',
    keywords: 'social linkedin',
    type: URL_TYPE.EXTERNAL,
  },
  {
    id: 'spotify',
    className: 'hover:text-spotify dark:hover:text-spotify-dark',
    title: 'Spotify',
    url: 'https://open.spotify.com/user/jyxdd2oc2koozvbs7gk7omnwc',
    icon: <SpotifyLogo className="text-inherit" />,
    rightSlot: <ExternalLink />,
    subtitle: 'some wild username spotify is odd',
    keywords: 'social spotify',
    type: URL_TYPE.EXTERNAL,
  },
]

function Footer() {
  return (
    <footer
      className={cx(
        // 'footer_footer__LV2HF',
        // 'bg-zinc-100 text-zinc-900',
        // 'dark:bg-zinc-800 dark:text-zinc-100',
        // 'mint-bg text-radix-mauve12',
        'transition-colors duration-150 ease-in-out',
        // 'bg-white dark:bg-black text-black',
        '',
        ''
      )}
    >
      <div
        className={cx(
          // 'layout-block-inner footer_inner__nOFwt',
          'relative z-10 ',
          // 'dark:bg-zinc-100 dark:text-zinc-900',
          // 'bg-zinc-800 text-zinc-100',
          'px-[6.4vw] pb-[8.2667vw] pt-[72vw]',
          // 'mt-[0.26667vw] md:mt-[-.0694444444vw]',
          'md:pb-[6.25vw] md:pl-[2.222vw] md:pr-[2.2222vw] md:pt-[23.3056vw]',
          'rounded-b-3xl md:rounded-b-2xl',
          '',
          'text-radix-mauve12',
          'bg-gradient-to-b',
          'to-radix-mint7 from-white',
          'dark:to-radix-mint7 dark:from-black',
          ''
        )}
      >
        <NowPlaying />
        {/* @todo(remove) at some point in the next few weeks would be cool to remove this haha */}
        <div id="footer--construction" className={cx('my-8 w-full py-8')}>
          <h1
            className={cx(
              'text-3xl font-black',
              'flex flex-row items-center',
              'mb-2 pb-2'
            )}
          >
            <span className="mr-2">
              <PencilWithPaper className="h-6 w-6" />
            </span>
            <span>
              {` `}
              Please Note
            </span>
          </h1>
          <p className="mx-0 mb-7 mt-5 text-lg">
            This site is being actively developed. So though it is nowhere perfect,
            it is shippable, heh. So consider this eternally under construction I
            guess.
          </p>
        </div>
      </div>
      <div
        className={cx(
          // 'footer_bottom__VigXf layout-grid',
          'sticky inset-x-0 bottom-0 z-0 overflow-hidden py-10',
          // 'bg-zinc-100 py-10 text-black',
          'md:w-screen md:py-[3.125vw]',
          // 'rounded-b-3xl md:rounded-b-2xl',
          'mx-auto grid w-full grid-cols-4 gap-7 px-12',
          // 'mix-blend-difference',
          'text-radix-mauve12',
          ''
        )}
      >
        <div
          className={cx(
            // 'footer_social__L0_TJ',
            'col-start-1 col-end-12 w-full text-start',
            'md:col-start-1 md:col-end-2 md:flex md:select-none',
            'gap-2',
            'flex flex-row',
            'items-center'
          )}
        >
          {socials.map((social) => {
            return (
              <Anchor
                aria-label={`A link to ${social?.subtitle} on ${social?.title}`}
                className={cx(
                  'cursor-pointer items-center justify-center',
                  // 'mr-[2.1333vw] height-[10.993vw] width-[10.993vw]',
                  // 'md:mr-[.5555555556vw] md:height-[2.7777777778vw] md:width-[2.7777777778vw]',
                  // 'h-[2rem] ',
                  'h-6 w-6',
                  'icon-custom',
                  'mr-5',
                  social?.className,
                  'transition-colors duration-200'
                )}
                href={social.url}
                key={`social-${social.id}`}
                // style={{ '& svg': 'inherit' }}
                // target="_blank"
                // rel="noopener noreferrer"
              >
                <Tooltip content={social.title} trigger={social.icon} />
              </Anchor>
            )
          })}
        </div>
        <div
          className={cx(
            // 'footer_social__L0_TJ',
            'mb-14 md:mb-0 ',
            'col-start-1 col-end-12 w-full',
            'md:col-start-9 md:col-end-[-1] md:row-start-1 md:row-end-auto md:text-end',
            'items-center text-center',
            ''
          )}
        >
          <p
            className={cx(
              // // 'footer_address__p_BIK p-s',
              // 'col-start-1 col-end-2 row-start-2 row-end-auto text-start',
              // 'md:col-end-[-1] md:col-start-9 md:row-start-1 md:row-end-auto md:text-end',
              '',
              ''
            )}
          >
            Nice Group of People, LLC
          </p>
          <p
            className={cx(
              // // 'footer_date__Nnwwa p-s',
              // 'col-start-3 col-end-3 row-start-2 row-end-auto text-start',
              // 'md:col-end-[-1] md:col-start-12 md:row-start-1 md:row-end-auto md:text-end',
              'flex flex-row md:items-center md:justify-end',
              'items-center justify-center text-center'
            )}
          >
            v{isBranchMain ? version : `${version}-${prerelease}`}
            <Separator.Root
              asChild
              className={cx(
                'bg-radix-mauve12',
                'data-[orientation=horizontal]:h-[1px]',
                'data-[orientation=horizontal]:w-full',
                'data-[orientation=vertical]:h-full',
                'data-[orientation=vertical]:w-[1px]',
                'mx-3 my-0 min-h-[0.75rem]'
              )}
              decorative
              orientation="vertical"
            >
              <span />
            </Separator.Root>
            ©2023
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
