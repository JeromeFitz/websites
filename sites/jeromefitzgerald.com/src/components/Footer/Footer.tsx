import {
  Avatar,
  Box,
  BoxLink,
  Flex,
  Grid,
  Link,
  Paragraph,
  Separator,
  Text,
} from '@jeromefitz/design-system/components'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import { IconLink } from '@jeromefitz/shared/src/components'
import {
  ExternalLinkIcon,
  // ChatBubbleIcon,
  GitHubLogoIcon,
  InfoCircledIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import * as React from 'react'
import { useSound } from 'use-sound'

/**
 * @note ignore this file for CI linting (created on next build)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildInfo from '~config/buildInfo.json'
import useStore from '~store/useStore'

const { branch, isBranchMain, prerelease, version } = buildInfo

const Emoji = dynamic(
  () =>
    import('@jeromefitz/design-system/custom/Emoji').then((mod: any) => mod.Emoji),
  {
    ssr: false,
  }
)

const NowPlaying = dynamic(
  () => import('~components/Music').then((mod: any) => mod.NowPlaying),
  {
    ssr: false,
  }
)

/**
 * @note inline navigation data
 */
const pages = [
  {
    url: '/about',
    title: 'About',
    tooltip: true,
    tooltipContent: 'Little more about ol’ Jerome',
  },
  {
    url: '/books',
    title: 'Books',
    tooltip: false,
    tooltipContent: 'What is Jerome reading?',
  },
  {
    url: '/music',
    title: 'Music',
    tooltip: false,
    tooltipContent: 'What is Jerome listening to?',
  },
  {
    url: '/podcasts',
    title: 'Podcasts',
    tooltip: false,
    tooltipContent: 'Podcasts Jerome does/did',
  },
  {
    url: '/events',
    title: 'Upcoming Events',
    tooltip: true,
    tooltipContent: 'Live on Stage',
  },
]
const shows = [
  {
    url: '/shows/alex-o-jerome',
    title: 'Alex O’Jerome',
    tooltip: false,
    tooltipContent: 'Little more about ol’ Jerome',
  },
  {
    url: '/shows/jerome-and',
    title: 'Jerome &',
    tooltip: false,
    tooltipContent: 'What is Jerome reading?',
  },
  {
    url: '/shows/jfle',
    title: 'JFLE (Jesse LE & Jerome)',
    tooltip: false,
    tooltipContent: 'What is Jerome reading?',
  },
  {
    url: '/shows/justin-and-jerome-experience',
    title: 'Justin & Jerome Experience',
    tooltip: false,
    tooltipContent: 'What is Jerome listening to?',
  },
  {
    url: '/shows',
    title: '... View All',
    tooltip: false,
    tooltipContent: 'Podcasts Jerome does/did',
  },
]
const socials = [
  {
    url: '/colophon',
    title: 'Colophon',
    tooltip: false,
    tooltipContent: '',
    icon: <InfoCircledIcon />,
    isExternal: false,
  },
  // {
  //   url: '/contact',
  //   title: 'Contact',
  //   tooltip: false,
  //   tooltipContent: '',
  //   icon: <ChatBubbleIcon />,
  //   isExternal: false,
  // },
  {
    url: 'https://github.com/JeromeFitz',
    title: 'GitHub',
    tooltip: false,
    tooltipContent: '',
    icon: <GitHubLogoIcon />,
    isExternal: true,
  },
  {
    url: 'https://instagram.com/JeromeFitz',
    title: 'Instagram',
    tooltip: false,
    tooltipContent: '',
    icon: <InstagramLogoIcon />,
    isExternal: true,
  },
  {
    url: 'https://www.linkedin.com/in/jeromefitzgerald/',
    title: 'LinkedIn',
    tooltip: false,
    tooltipContent: '',
    icon: <LinkedInLogoIcon />,
    isExternal: true,
  },
  {
    url: 'https://twitter.com/JeromeFitz',
    title: 'Twitter',
    tooltip: false,
    tooltipContent: '',
    icon: <TwitterLogoIcon />,
    isExternal: true,
  },
]

const LinkFooter = ({ url, title, tooltip, tooltipContent }) => {
  const audio = useStore.use.audio()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()
  const [playPopDown] = useSound(sounds.popDown, {
    soundEnabled: audio,
    volume,
  })

  const handleClickLink = () => playPopDown()
  return (
    <li>
      <NextLink href={url} passHref>
        <Link
          variant="subtle"
          css={{ display: 'inline-flex' }}
          onClick={handleClickLink}
        >
          {tooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Text
                  as="span"
                  size="3"
                  css={{
                    mt: '$3',
                    lineHeight: '20px',
                  }}
                >
                  <>{title}</>
                </Text>
              </TooltipTrigger>
              <TooltipContent align="start" sideOffset={5}>
                {tooltipContent}
                <TooltipArrow offset={15} />
              </TooltipContent>
            </Tooltip>
          ) : (
            <Text as="span" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
              <>{title}</>
            </Text>
          )}
        </Link>
      </NextLink>
    </li>
  )
}

const FooterImpl = () => {
  const ref = React.useRef()
  const audio = useStore.use.audio()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()
  const [playPopDown] = useSound(sounds.popDown, {
    soundEnabled: audio,
    volume,
  })
  const handleClickLink = () => playPopDown()
  return (
    <>
      <Box css={{ width: '100%', my: '$6' }}>
        <Separator decorative size="full" />
      </Box>
      <NowPlaying />
      <Box as="footer" css={{ pb: '$9', mx: '$3' }}>
        <Grid
          css={{
            rowGap: '$7',
            columnGap: '$3',
            gridTemplateColumns: 'repeat(2, 1fr)',
            '@bp1': { gridTemplateColumns: 'repeat(3, 1fr)' },
            '@bp2': { gridTemplateColumns: 'repeat(4, 1fr)' },
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
        >
          {/* <Box>
          <Text as="p" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
            Upcoming Events
          </Text>
          <ul>
            <li>
              <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                No Events Scheduled
              </Text>
            </li>
            <li>
              <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                <NextLink href="/events/2021" passHref >
                  <Link variant="subtle">... View Past Events</Link>
                </NextLink>
              </Text>
            </li>
          </ul>
        </Box> */}
          <Box>
            <Text as="span" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
              Pages
            </Text>
            <ul>
              {pages.map((props, id) => (
                <LinkFooter key={`pages-${id}`} {...props} />
              ))}
            </ul>
          </Box>
          <Box>
            <Text as="span" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
              Shows
            </Text>
            <ul>
              {shows.map((props, id) => (
                <LinkFooter key={`shows-${id}`} {...props} />
              ))}
            </ul>
          </Box>
          <Box>
            <Text as="span" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
              Social
            </Text>
            <ul>
              {socials.map((item, itemIdx) => {
                const { icon, isExternal, title, url } = item
                return (
                  <li key={`socials--${itemIdx}`}>
                    <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                      <IconLink
                        href={url}
                        target={isExternal ? '_blank' : '_self'}
                        css={{ display: 'inline-flex', alignItems: 'center' }}
                        variant="subtle"
                        onClick={handleClickLink}
                      >
                        <Box as="span" css={{ mr: '$2' }}>
                          {icon}
                        </Box>
                        {title}
                        {isExternal && (
                          <Flex as="span" css={{ color: '$slate8', ml: '$1' }}>
                            <ExternalLinkIcon />
                          </Flex>
                        )}
                      </IconLink>
                    </Text>
                  </li>
                )
              })}
            </ul>
          </Box>
          <Flex
            align="start"
            direction="column"
            css={{
              justifyContent: 'center',
              gridColumn: '1 / -1',
              gridColumnStart: 'span 2',
              '@bp2': { gridColumn: 'auto', order: -1 },
            }}
          >
            <NextLink href={'/'} passHref>
              <BoxLink onClick={handleClickLink}>
                <Flex align="center" gap="3" css={{ mt: '$7' }}>
                  <Avatar
                    alt={`Avatar for Jerome (Bighead Dizzy)`}
                    size="5"
                    src={`/static/images/bighead--jerome--dizzy.svg`}
                    aria-describedby="logoFooter"
                    variant="violet"
                    border="solid"
                    ref={ref}
                  />
                  <Box id="logoFooter">
                    <Paragraph css={{ fontWeight: 700 }}>Jerome</Paragraph>
                    <Paragraph>Fitzgerald</Paragraph>
                  </Box>
                </Flex>
              </BoxLink>
            </NextLink>
            <Text
              as="p"
              size="1"
              css={{
                lineHeight: '20px',
                color: '$gray11',

                mt: '$5',
                '@bp1': { pr: '$8' },
              }}
            >
              (In-progress) Site by
              <br />
              <strong>Nice Group of People, LLC</strong>
              <Text
                size="1"
                as="span"
                css={{
                  color: '$gray11',
                  fontFamily: '$mono',
                  my: '$1',
                }}
              >
                {/* @types(emoji) dynamic import ability */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Emoji character={`🏷️`} margin={true} />
                {` `}v{version}
              </Text>
              {!isBranchMain && (
                <Text
                  size="1"
                  as="span"
                  css={{
                    color: '$gray11',
                    fontFamily: '$mono',
                    my: '$1',
                  }}
                >
                  {/* @types(emoji) dynamic import ability */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <Emoji character={`🧪️`} margin={true} />
                  {` `}
                  {!!prerelease ? prerelease : branch}
                </Text>
              )}
            </Text>
          </Flex>
        </Grid>
      </Box>
    </>
  )
}

const Footer = React.memo(FooterImpl)

export default Footer
