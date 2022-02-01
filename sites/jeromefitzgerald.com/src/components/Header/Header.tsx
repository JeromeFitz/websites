import {
  Avatar,
  Box,
  BoxLink,
  Container,
  Flex,
  Link,
  Paragraph,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@jeromefitz/design-system/components'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import { styled } from '@jeromefitz/design-system/stitches.config'
import { ArrowTopRightIcon, DropdownMenuIcon, PlusIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useSound } from 'use-sound'

import { ToggleAudio, ToggleTheme } from '~components/Toggle'
import { navigationHeader } from '~config/index'
import { Media } from '~context/Media'
import { useUI } from '~context/UI'

const Emoji = dynamic(
  () =>
    import('@jeromefitz/design-system/custom/Emoji').then((mod: any) => mod.Emoji),
  {
    ssr: false,
  }
)

const HighlightLink = styled('a', {
  display: 'block',
  color: '$hiContrast',
  textDecoration: 'none',
  outline: 0,
  p: '$2',
  br: '$2',
  '@hover': {
    '&:hover': {
      backgroundColor: '$slateA3',
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
        backgroundColor: '$slateA2',
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

// @todo(dynamic) notion api, upcoming event or evergreen info
const Banner = () => {
  const href = '/events/2021/11/20/the-playlist'
  const title = 'Next Show: SAT 11/20 09:30PM, The Playlist!'
  const textButton = 'Info'
  const hasBanner = false
  if (!hasBanner) return null
  return (
    <NextLink href={href} passHref prefetch={false}>
      <Box
        as="a"
        css={{
          backgroundColor: '$colors$violet9',
          color: 'white',
          py: '0.5rem',
          display: 'block',
          position: 'relative',
          fontSize: '0.95rem',
          fontWeight: '700',
          lineHeight: '1.4',
          letterSpacing: '0.04rem',
          textTransform: 'uppercase',
          textDecoration: 'none',
          '@hover': {
            '&:hover': {
              backgroundColor: '$colors$violet10',
            },
          },
        }}
      >
        <Container size="4">
          <Flex align="center" justify="between">
            <Box as="p">{title}</Box>
            <Flex css={{ ml: '20px', alignItems: 'center' }}>
              <Box
                as="p"
                css={{ display: 'none', '@bp1': { display: 'inline-block' } }}
              >
                {textButton}
              </Box>
              <Box css={{ ml: '2px' }}>
                <ArrowTopRightIcon />
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </NextLink>
  )
}

const NavSkip = () => {
  return (
    <Box
      as="a"
      href="#main"
      id="skip-link"
      css={{
        position: 'relative',
        left: '0',
        top: '0',
        right: 'auto',
        bottom: 'auto',
        zIndex: '10',
        display: 'block',
        width: '100%',
        height: '40px',
        marginTop: '-40px',
        padding: '8px',
        backgroundColor: '$colors$violet9',
        color: 'white',
        fontSize: '.9rem',
        lineHeight: '1.5',
        fontWeight: '500',
        textAlign: 'center',
        '&:focus': {
          mt: 0,
          outline: 0,
        },
        '&:focus:not(:focus-visible)': {
          outline: 0,
        },
      }}
    >
      Skip to main content
    </Box>
  )
}

const Header = () => {
  const router = useRouter()
  const isHompage = router.asPath === '/'

  const { audio } = useUI()
  const [playPopDown] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const handleClickLink = () => playPopDown()
  const [playPopUp] = useSound('/static/audio/pop.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const handleClickMenu = () => playPopUp()

  return (
    <Box
      as="header"
      css={{
        '&::before, &::after': {
          content: ' ',
          display: 'table',
          gridColumnStart: 1,
          gridRowStart: 1,
          gridColumnEnd: 2,
          gridRowEnd: 2,
        },
        '&::after': {
          clear: 'both',
        },
      }}
    >
      <NavSkip />
      <Banner />
      <Container size="4">
        <Flex align="center" justify="between" css={{ height: '$8' }}>
          <NextLink href={'/'} passHref prefetch={false}>
            <BoxLink>
              <Flex align="center" gap="3" css={{}}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Text
                      as="button"
                      css={{
                        backgroundColor: 'inherit',
                        boxShadow: 'none',
                        border: 'none',
                        m: 0,
                        p: 0,
                        '&:hover': { cursor: 'pointer' },
                      }}
                    >
                      <Avatar
                        alt={`Avatar for Jerome (Bighead Dizzy)`}
                        src={`/static/images/bighead--jerome--dizzy.svg`}
                        aria-describedby="logoHeader"
                        size="4"
                        css={{
                          '@bp1': { mr: '$1', width: '$7', height: '$7' },
                        }}
                        variant="violet"
                        border="solid"
                        onClick={handleClickLink}
                      />
                    </Text>
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
          <Flex align="center" gap={{ '@initial': 4, '@bp2': 5 }}>
            <Media at="xs">
              <Flex align="center" gap={{ '@initial': 4, '@bp2': 5 }}>
                <Box css={{ display: 'contents' }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Link
                        variant={
                          router.asPath.includes('/shows') ? 'contrast' : 'subtle'
                        }
                        as="button"
                        css={{
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          appearance: 'none',
                          fontFamily: '$untitled',
                          border: 0,
                          p: 0,
                          m: 0,
                          mr: '-$1',
                        }}
                        onClick={handleClickMenu}
                      >
                        <Text css={{ display: 'flex', gap: '$1', ai: 'center' }}>
                          Menu
                          <DropdownMenuIcon />
                        </Text>
                      </Link>
                    </PopoverTrigger>
                    <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
                      <Box css={{ p: '$1' }}>
                        {navigationHeader?.links.map((show, showId) => (
                          <NextLink
                            key={`header-popover-${showId}`}
                            href={show.url}
                            passHref
                            prefetch={false}
                          >
                            <HighlightLink
                              variant={
                                show.url !== '/shows' &&
                                router.asPath.includes(show.url)
                                  ? 'contrast'
                                  : 'subtle'
                              }
                              onClick={handleClickLink}
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
                                  {/* @types(emoji) dynamic import ability */}
                                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                  {/* @ts-ignore */}
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
                </Box>
              </Flex>
            </Media>
            <Media greaterThan="xs">
              <Flex align="center" gap={{ '@initial': 4, '@bp2': 5 }}>
                <Box css={{ display: 'contents' }}>
                  {navigationHeader?.links.map((link, linkId) => (
                    <NextLink
                      href={link.url}
                      key={`header-links-${linkId}`}
                      passHref
                      prefetch={false}
                    >
                      <Link
                        variant={
                          router.asPath.includes(link.url) ? 'contrast' : 'subtle'
                        }
                        onClick={handleClickLink}
                      >
                        <Text>{link.title}</Text>
                      </Link>
                    </NextLink>
                  ))}
                </Box>
              </Flex>
            </Media>
            <Popover>
              <PopoverTrigger asChild>
                <Link
                  variant={router.asPath.includes('/shows') ? 'contrast' : 'subtle'}
                  as="button"
                  css={{
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: '$untitled',
                    border: 0,
                    p: 0,
                    m: 0,
                    mr: '-$1',
                  }}
                  onClick={handleClickMenu}
                >
                  <Text css={{ display: 'flex', gap: '$1', ai: 'center' }}>
                    Shows
                    <PlusIcon />
                  </Text>
                </Link>
              </PopoverTrigger>
              <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
                <Box css={{ p: '$1' }}>
                  {navigationHeader?.popover.map((show, showId) => (
                    <NextLink
                      key={`header-popover-${showId}`}
                      href={show.url}
                      passHref
                      prefetch={false}
                    >
                      <HighlightLink
                        variant={
                          show.url !== '/shows' && router.asPath.includes(show.url)
                            ? 'contrast'
                            : 'subtle'
                        }
                        onClick={handleClickLink}
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
                            {/* @types(emoji) dynamic import ability */}
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
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
            <ToggleAudio />
            <ToggleTheme />
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
