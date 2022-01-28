import {
  Box,
  Flex,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Emoji,
} from '@jeromefitz/design-system/components'
import { PlusIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

import { navigationHeader } from '~config/websites'

import { HighlightLink } from './Header.styles'

const isDev = process.env.NODE_ENV !== 'production'

const PopoverDev = () => {
  const router = useRouter()
  return (
    <>
      {isDev && (
        <Popover>
          <PopoverTrigger asChild>
            <Link
              variant={router.asPath.includes('/playground') ? 'contrast' : 'subtle'}
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
            >
              <Text css={{ display: 'flex', gap: '$1', ai: 'center' }}>
                DEV
                <PlusIcon />
              </Text>
            </Link>
          </PopoverTrigger>
          <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
            <Box css={{ p: '$1' }}>
              {navigationHeader?.dev.map((show, showId) => (
                <NextLink
                  key={`header-playground-${showId}`}
                  href={show.url}
                  passHref
                >
                  <HighlightLink
                    variant={
                      show.url !== '/playground' && router.asPath.includes(show.url)
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
    </>
  )
}

export default PopoverDev
