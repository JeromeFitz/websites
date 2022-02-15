import { AppBar, Avatar, Flex } from '@jeromefitz/design-system/components'
import NextLink from 'next/link'
import * as React from 'react'

import { Media } from '~context/Media'
import { Shadows } from '~styles/const'

import { MenuDesktop } from './MenuDesktop'
import { MenuKBar } from './MenuKBar'
import { MenuMobile } from './MenuMobile'

const _AppBar = ({}) => {
  return (
    <AppBar
      css={{
        height: '$8',
        zIndex: '$4',

        /**
         * @mobile
         */
        '$$offset-bottom': '0px',
        bottom: 'calc($$offset-bottom)',
        left: 'calc(-50vw + 50%)',
        ml: 'auto',
        mr: 'auto',
        position: 'fixed',
        px: '9',
        width: '100vw',
        borderTopLeftRadius: '$4',
        borderTopRightRadius: '$4',

        '@bp1': {
          borderBottomLeftRadius: '$4',
          borderBottomRightRadius: '$4',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          boxShadow: Shadows[1],
          position: 'sticky',
          width: '100%',
          top: 0,
          left: 0,
        },
      }}
      size="2"
      color="loContrast"
      border
      glass
    >
      <Flex css={{ width: '100%' }} direction="row" justify="between" align="start">
        <Flex
          css={{
            ml: '$2',
            width: '100%',
            '@bp1': {
              ml: '$6',
            },
          }}
          justify="between"
        >
          <NextLink href="/" passHref>
            <a>
              <Avatar
                alt={`Avatar for Jerome (Bighead Dizzy)`}
                src={`/static/images/bighead--jerome--dizzy.svg`}
                aria-describedby="logoHeader"
                size="4"
                css={{
                  '@bp1': {
                    mr: '$1',
                    width: '$7',
                    height: '$7',
                    '& span': {
                      boxShadow: `inset ${Shadows[2]}`,
                    },
                  },
                }}
                variant="violet"
                border="solid"
                // onClick={handleClickLink}
              />
            </a>
          </NextLink>

          {/* <Flex direction="column" justify="center">
            <Button
              css={{
                py: '$2',
                mr: '$2',
                '@hover': {
                  '&:hover, &:hover + &': {
                    cursor: 'pointer',
                  },
                },
              }}
              size="1"
              onClick={kbar.query.toggle}
              ghost
            >
              Menu: KBar
            </Button>
          </Flex> */}
          <Flex
            css={{
              mr: '$2',
              '@bp1': {
                mr: '$6',
              },
            }}
            direction="column"
            justify="center"
          >
            <Media at="xs">
              <>
                {/* <h1>WUT</h1> */}
                <MenuMobile />
              </>
            </Media>
            <Media greaterThan="xs">
              <MenuDesktop />
            </Media>
            <MenuKBar />
          </Flex>
        </Flex>
      </Flex>
    </AppBar>
  )
}

export { _AppBar as AppBar }
