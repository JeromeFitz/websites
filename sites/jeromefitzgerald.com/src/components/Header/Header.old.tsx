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
import { DropdownMenuIcon, PlusIcon } from '@radix-ui/react-icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useSound } from 'use-sound'

import { LinkHighlight } from '~components/Link'
import { NavSkip } from '~components/NavSkip'
import { ToggleAudio, ToggleTheme } from '~components/Toggle'
/**
 * @todo(deprecated) remove
 */
import { navigationHeader } from '~config/index'
import { Media } from '~context/Media'
import { useUI } from '~context/UI'

const Banner = dynamic(
  () => import('~components/Banner').then((mod: any) => mod.Banner),
  {
    ssr: true,
  }
)
const Emoji = dynamic(
  () =>
    import('@jeromefitz/design-system/custom/Emoji').then((mod: any) => mod.Emoji),
  {
    ssr: false,
  }
)

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
          <NextLink href={'/'} passHref>
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
                          >
                            <LinkHighlight
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
                            </LinkHighlight>
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
                    >
                      <LinkHighlight
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
                      </LinkHighlight>
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
