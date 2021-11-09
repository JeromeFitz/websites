import {
  ArrowTopRightIcon,
  GitHubLogoIcon,
  ImageIcon,
  InfoCircledIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import React from 'react'

import BoxLink from '~components/BoxLink'
import IconLink from '~components/IconLink'
// import Logo from '~components/Logo'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '~components/Tooltip'
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Link,
  Paragraph,
  Separator,
  Text,
} from '~styles/system/components'

const NowPlayingWithNoSSR = dynamic(() => import('~components/NowPlaying'), {
  ssr: false,
})

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
]
const shows = [
  {
    url: '/shows/alex-o-jerome',
    title: 'Alex O’Jerome',
    tooltip: false,
    tooltipContent: 'Little more about ol’ Jerome',
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

const LinkFooter = ({ url, title, tooltip, tooltipContent }) => {
  return (
    <li>
      <NextLink href={url} passHref>
        <Link variant="subtle" css={{ display: 'inline-flex' }}>
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

const Footer = () => {
  return (
    <>
      <Box css={{ width: '100%', my: '$6' }}>
        <Separator css={{ margin: '0', width: '100% !important' }} />
      </Box>
      {process.env.NEXT_PUBLIC__SITE === 'jeromefitzgerald.com' && (
        <NowPlayingWithNoSSR />
      )}
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
          <Text as="h6" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
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
                <NextLink href="/events/2021" passHref>
                  <Link variant="subtle">... View Past Events</Link>
                </NextLink>
              </Text>
            </li>
          </ul>
        </Box> */}
          <Box>
            <Text as="h6" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
              Pages
            </Text>
            <ul>
              {pages.map((props, id) => (
                <LinkFooter key={`pages-${id}`} {...props} />
              ))}
            </ul>
          </Box>
          <Box>
            <Text as="h6" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
              Shows
            </Text>
            <ul>
              {shows.map((props, id) => (
                <LinkFooter key={`shows-${id}`} {...props} />
              ))}
            </ul>
          </Box>
          <Box>
            <Text as="h6" size="3" css={{ fontWeight: 700, lineHeight: '20px' }}>
              Social
            </Text>
            <ul>
              <li>
                <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                  <IconLink
                    href="/colophon"
                    css={{ display: 'inline-flex', alignItems: 'center' }}
                    variant="subtle"
                  >
                    <Box as="span" css={{ mr: '$2' }}>
                      <InfoCircledIcon />
                    </Box>
                    Colophon
                  </IconLink>
                </Text>
              </li>
              <li>
                <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                  <IconLink
                    href="https://github.com/JeromeFitz"
                    target="_blank"
                    css={{ display: 'inline-flex', alignItems: 'center' }}
                    variant="subtle"
                  >
                    <Box as="span" css={{ mr: '$2' }}>
                      <GitHubLogoIcon />
                    </Box>
                    GitHub
                    <Flex as="span" css={{ color: '$slate8', ml: '$1' }}>
                      <ArrowTopRightIcon />
                    </Flex>
                  </IconLink>
                </Text>
              </li>
              <li>
                <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                  <IconLink
                    href="https://instagram.com/JeromeFitz"
                    target="_blank"
                    css={{ display: 'inline-flex', alignItems: 'center' }}
                    variant="subtle"
                  >
                    <Box as="span" css={{ mr: '$2' }}>
                      <ImageIcon />
                    </Box>
                    Instagram
                    <Flex as="span" css={{ color: '$slate8', ml: '$1' }}>
                      <ArrowTopRightIcon />
                    </Flex>
                  </IconLink>
                </Text>
              </li>
              <li>
                <Text as="p" size="3" css={{ mt: '$3', lineHeight: '20px' }}>
                  <IconLink
                    href="https://twitter.com/JeromeFitz"
                    target="_blank"
                    css={{ display: 'inline-flex', alignItems: 'center' }}
                    variant="subtle"
                  >
                    <Box as="span" css={{ mr: '$2' }}>
                      <TwitterLogoIcon />
                    </Box>
                    Twitter
                    <Flex as="span" css={{ color: '$slate8', ml: '$1' }}>
                      <ArrowTopRightIcon />
                    </Flex>
                  </IconLink>
                </Text>
              </li>
            </ul>
          </Box>
          <Flex
            align="start"
            direction="column"
            css={{ gridColumn: '1 / -1', '@bp2': { gridColumn: 'auto', order: -1 } }}
          >
            <NextLink href={'/'} passHref>
              <BoxLink>
                <Flex align="center" gap="3" css={{ mt: '$7' }}>
                  <Avatar
                    size="5"
                    src={`/static/images/bighead--jerome--dizzy.svg`}
                    aria-describedby="logoFooter"
                  />
                  <Box id="logoFooter">
                    <Paragraph css={{ fontWeight: 700 }}>Jerome</Paragraph>
                    <Paragraph>Fitzgerald</Paragraph>
                  </Box>
                </Flex>
              </BoxLink>
            </NextLink>
            <Text
              as="h6"
              size="1"
              css={{
                lineHeight: '20px',
                color: '$gray10',
                pr: '$8',
                mt: '$5',
              }}
            >
              (In-progress) Site by
              <br />
              <strong>Nice Group of People, LLC</strong>
            </Text>
          </Flex>
        </Grid>
      </Box>
    </>
  )
}

export default Footer
