import { PlusIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import BoxLink from '~components/BoxLink'
import Emoji from '~components/Notion/Emoji'
import { ToggleAudio, ToggleTheme } from '~components/Toggle'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '~components/Tooltip'
import {
  Avatar,
  Box,
  Container,
  Flex,
  Link,
  Paragraph,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '~styles/system/components'
import { styled } from '~styles/system/stitches.config'

const HighlightLink = styled('a', {
  display: 'block',
  color: '$hiContrast',
  textDecoration: 'none',
  outline: 0,
  p: '$2',
  br: '$2',
  '@hover': {
    '&:hover': {
      bc: '$slateA3',
    },
  },
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$slateA8',
  },
  '&:focus:not(:focus-visible)': {
    boxShadow: 'none',
  },
  variants: {
    variant: {
      contrast: {
        bc: '$slateA2',
        boxShadow: '0 0 0 2px $colors$slateA7',
        // color: '$slate12',
      },
      subtle: {
        // color: '$hiContrast',
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
})

const links = [
  { emoji: '', url: '/events', title: 'Upcoming Events', text: '' },
  { emoji: '', url: '/books', title: 'Books', text: '' },
  { emoji: '', url: '/music', title: 'Music', text: '' },
]

const shows = [
  { emoji: '🤮️', url: '/shows/alex-o-jerome', title: 'AOJ', text: 'Alex O’Jerome' },
  { emoji: '🐭️', url: '/shows/jfle', title: 'JFLE', text: 'Jerome & Jesse LE' },
  {
    emoji: '😆️',
    url: '/shows/justin-and-jerome-experience',
    title: 'JJE',
    text: 'Justin & Jerome Experience',
  },
  {
    emoji: '🎭️',
    url: '/shows',
    title: 'View All',
    text: 'Improv, Musical, Sketch...',
  },
]

const isDev = process.env.NODE_ENV !== 'production'
const dev = [
  { emoji: '▶️', url: '/playground', title: 'P', text: 'Playground' },
  {
    emoji: '🛁️',
    url: '/playground/kitchen-sink',
    title: 'KS',
    text: 'Kithcen Sink',
  },
  {
    emoji: '⏸️',
    url: '/playground/loading',
    title: 'L',
    text: 'Loading',
  },
  ,
  {
    emoji: '🟧️',
    url: '/playground/grid',
    title: 'G',
    text: 'Grid',
  },
]

// @todo(complexity) 11
// eslint-disable-next-line complexity
const Header = () => {
  const router = useRouter()
  const isHompage = router.asPath === '/'

  return (
    <Box as="header">
      <Container size="4">
        <Flex align="center" justify="between" css={{ height: '$8' }}>
          <NextLink href={'/'} passHref>
            <BoxLink>
              <Flex align="center" gap="3" css={{}}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar
                      src={`/static/images/bighead--jerome--dizzy.svg`}
                      aria-describedby="logoHeader"
                      size="4"
                      css={{
                        '@bp1': { mr: '$1', width: '$7', height: '$7' },
                      }}
                    />
                  </TooltipTrigger>
                  {!isHompage && (
                    <TooltipContent align="start" sideOffset={5}>
                      {`Go back to homepage`}
                      <TooltipArrow offset={15} />
                    </TooltipContent>
                  )}
                </Tooltip>
                <VisuallyHidden.Root>
                  <Box id="logoHeader">
                    <Paragraph css={{ fontWeight: 700 }}>Jerome</Paragraph>
                  </Box>
                </VisuallyHidden.Root>
              </Flex>
            </BoxLink>
          </NextLink>
          <Flex
            align="center"
            gap={{ '@initial': 4, '@bp2': 5 }}
            // Baseline align with the logo
            css={{ mb: -2 }}
          >
            <Box css={{ display: 'none', '@bp1': { display: 'contents' } }}>
              {links.map((link, linkId) => (
                <NextLink href={link.url} key={`header-links-${linkId}`} passHref>
                  <Link
                    variant={
                      router.asPath.includes(link.url) ? 'contrast' : 'subtle'
                    }
                  >
                    <Text>{link.title}</Text>
                  </Link>
                </NextLink>
              ))}
            </Box>
            <Popover>
              <PopoverTrigger asChild>
                <Link
                  variant={router.asPath.includes('/shows') ? 'contrast' : 'subtle'}
                  as="button"
                  css={{
                    bc: 'transparent',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: '$untitled',
                    border: 0,
                    p: 0,
                    m: 0,
                    mr: '-$1',
                  }}
                >
                  <Text css={{ display: 'flex', gap: '$1', ai: 'center' }}>
                    Shows
                    <PlusIcon />
                  </Text>
                </Link>
              </PopoverTrigger>
              <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
                <Box css={{ p: '$1' }}>
                  {shows.map((show, showId) => (
                    <NextLink
                      key={`header-shows-${showId}`}
                      href={show.url}
                      passHref
                    >
                      <HighlightLink
                        variant={
                          show.url !== '/shows' && router.asPath.includes(show.url)
                            ? 'contrast'
                            : 'subtle'
                        }
                      >
                        <Flex gap="3">
                          <Text
                            size="3"
                            as="span"
                            css={{
                              fontSize: '1.5rem',
                              lineHeight: 1.5,
                            }}
                            style={{ flex: 'none', marginTop: 2 }}
                          >
                            <Emoji character={show.emoji} margin={true} />
                          </Text>
                          <Box>
                            <Text
                              size="3"
                              as="h3"
                              css={{
                                fontWeight: 700,
                                lineHeight: 1.5,
                                letterSpacing: '-0.02em',
                              }}
                            >
                              {show.title}
                            </Text>
                            <Text
                              size="2"
                              as="p"
                              variant="gray"
                              css={{ lineHeight: 1.4 }}
                            >
                              {show.text}
                            </Text>
                          </Box>
                        </Flex>
                      </HighlightLink>
                    </NextLink>
                  ))}
                </Box>
              </PopoverContent>
            </Popover>
            {isDev && (
              <Popover>
                <PopoverTrigger asChild>
                  <Link
                    variant={
                      router.asPath.includes('/playground') ? 'contrast' : 'subtle'
                    }
                    as="button"
                    css={{
                      bc: 'transparent',
                      cursor: 'pointer',
                      appearance: 'none',
                      fontFamily: '$untitled',
                      border: 0,
                      p: 0,
                      m: 0,
                      mr: '-$1',
                    }}
                  >
                    <Text css={{ display: 'flex', gap: '$1', ai: 'center' }}>
                      DEV
                      <PlusIcon />
                    </Text>
                  </Link>
                </PopoverTrigger>
                <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
                  <Box css={{ p: '$1' }}>
                    {dev.map((show, showId) => (
                      <NextLink
                        key={`header-shows-${showId}`}
                        href={show.url}
                        passHref
                      >
                        <HighlightLink
                          variant={
                            show.url !== '/shows' && router.asPath.includes(show.url)
                              ? 'contrast'
                              : 'subtle'
                          }
                        >
                          <Flex gap="3">
                            <Text
                              size="3"
                              as="span"
                              css={{
                                fontSize: '1.5rem',
                                lineHeight: 1.5,
                              }}
                              style={{ flex: 'none', marginTop: 2 }}
                            >
                              <Emoji character={show.emoji} margin={true} />
                            </Text>
                            <Box>
                              <Text
                                size="3"
                                as="h3"
                                css={{
                                  fontWeight: 700,
                                  lineHeight: 1.5,
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                {show.title}
                              </Text>
                              <Text
                                size="2"
                                as="p"
                                variant="gray"
                                css={{ lineHeight: 1.4 }}
                              >
                                {show.text}
                              </Text>
                            </Box>
                          </Flex>
                        </HighlightLink>
                      </NextLink>
                    ))}
                  </Box>
                </PopoverContent>
              </Popover>
            )}
            <ToggleAudio />
            <ToggleTheme />
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
