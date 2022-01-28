import {
  Box,
  Flex,
  PopoverContent,
  Text,
  Emoji,
} from '@jeromefitz/design-system/components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { navigationHeader } from '~config/websites'

import { HighlightLink } from './Header.styles'

const PopoverMenu = () => {
  const router = useRouter()
  return (
    <PopoverContent hideArrow sideOffset={15} alignOffset={-15}>
      <Box css={{ p: '$1' }}>
        {navigationHeader?.links.map((show, showId) => (
          <NextLink key={`header-popover-${showId}`} href={show.url} passHref>
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
                  <Text size="2" as="p" variant="gray" css={{ lineHeight: 1.4 }}>
                    {show.text}
                  </Text>
                </Box>
              </Flex>
            </HighlightLink>
          </NextLink>
        ))}
      </Box>
    </PopoverContent>
  )
}

export default PopoverMenu
