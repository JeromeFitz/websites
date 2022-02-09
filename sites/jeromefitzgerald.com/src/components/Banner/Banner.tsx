import {
  Banner,
  Container,
  Flex,
  // IconButton,
  Link,
  Separator,
  Text,
} from '@jeromefitz/design-system/components'
// import { ArrowRightIcon, CalendarIcon, Cross1Icon } from '@radix-ui/react-icons'
import { ArrowTopRightIcon, CalendarIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'
import * as React from 'react'

import { Media } from '~context/Media'

// @todo(dynamic) notion api, upcoming event or evergreen info
const meta = {
  left: 'FRI 02/25',
  leftExtended: 'FRI 02/25 09:30PM',
  leftIcon: <CalendarIcon />,
  right: 'The Playlist',
  rightExtended: 'The Playlist: Kalyani Singh',
  rightIcon: <ArrowTopRightIcon style={{ color: 'white' }} />,
  url: '/events/2022/02/25/the-playlist',
}

const _Banner = () => {
  const hasBanner = true
  if (!hasBanner) return null
  return (
    <Container breakout>
      <NextLink href={meta.url} passHref>
        <Link css={{ color: 'white', textDecorationColor: 'white' }}>
          <Banner
            css={{
              backgroundColor: '$colors$violet9',
              color: 'white',
              py: '1rem',
              // display: 'block',
              // position: 'relative',
              fontSize: '0.95rem',
              fontWeight: '700',
              lineHeight: '1.2',
              letterSpacing: '0.04rem',
              textTransform: 'uppercase',
              textDecoration: 'none',
              '@hover': {
                '&:hover': {
                  backgroundColor: '$colors$violet10',
                },
              },
            }}
            variant="green"
          >
            {meta.leftIcon}
            <Flex
              css={{
                '& svg': { display: 'inline', ml: '$1' },
              }}
            >
              <Media at="xs">
                <Text css={{ color: 'inherit', fontWeight: 500 }} size="2">
                  {meta.left}
                </Text>
              </Media>
              <Media greaterThan="xs">
                <Text css={{ color: 'inherit', fontWeight: 500 }} size="2">
                  {meta.leftExtended}
                </Text>
              </Media>
            </Flex>
            <Separator css={{ backgroundColor: 'white' }} orientation="vertical" />
            <Flex direction="row">
              <Flex
                css={{
                  '& svg': { display: 'inline', ml: '$1' },
                }}
              >
                <Media at="xs">
                  <Text css={{ color: 'inherit', fontWeight: 500 }} size="2">
                    {meta.right}
                  </Text>
                </Media>
                <Media greaterThan="xs">
                  <Text css={{ color: 'inherit', fontWeight: 500 }} size="2">
                    {meta.rightExtended}
                  </Text>
                </Media>
                {meta.rightIcon}
              </Flex>
            </Flex>
            {/* <IconButton
              css={{ color: 'inherit', position: 'fixed', mr: '$4', right: 0 }}
              variant="ghost"
            >
              <Cross1Icon />
            </IconButton> */}
          </Banner>
        </Link>
      </NextLink>
    </Container>
  )
}

export { _Banner as Banner }
