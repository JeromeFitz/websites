import {
  AppBar,
  Avatar,
  Container,
  Flex,
} from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffectOnce } from 'react-use'
import { useSound } from 'use-sound'

import { navigation } from '~config/navigation'
import { Media } from '~context/Media'
import useAudio from '~store/useAudio'
import { Shadows } from '~styles/const'

import { MenuDesktop } from './MenuDesktop'
import { MenuKBar } from './MenuKBar'
import { MenuMobile } from './MenuMobile'

const _AppBar = ({}) => {
  /**
   * @question can we lift this and not duplicate
   */
  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
  })
  // const kbar = useKBar()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  // const toasts = useToast()
  const audio = useAudio.use.audio()
  const audioToggle = useAudio.use.audioToggle()
  const sounds = useAudio.use.sounds()
  const volume = useAudio.use.volume()

  const [playBleep] = useSound(sounds.bleep, {
    soundEnabled: audio,
    volume,
  })
  const [playDisableSound] = useSound(sounds.disableSound, {
    soundEnabled: true,
    volume,
  })
  const [playEnableSound] = useSound(sounds.enableSound, {
    soundEnabled: true,
    volume,
  })

  // const handleToast = (props) => {
  //   const { title } = props
  //   if (toasts && toasts.current) {
  //     toasts.current.message({
  //       duration: 2000,
  //       text: `Routing to: ${title}`,
  //       type: 'default',
  //     })
  //   }
  // }

  const handleRouteInternal = (url) => {
    playBleep()
    void router.push(url)
  }

  const handleRouteExternal = (url) => {
    playBleep()
    void window.open(url)
  }

  const handleToggleTheme = React.useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle(darkTheme.className)
    document.documentElement.classList.toggle('light-theme')
    document.documentElement.style.setProperty('color-scheme', newTheme)
    setTheme(newTheme)
    playBleep()
  }, [playBleep, setTheme, theme])

  const handleToggleAudio = React.useCallback(() => {
    audio ? playDisableSound() : playEnableSound()
    audioToggle()
  }, [audio, audioToggle, playDisableSound, playEnableSound])

  const handleSelect = (event, item) => {
    // console.dir(`> handleSelect`)
    // console.dir(event)
    // console.dir(item)
    // void handleToast({ title: item?.titleExtended ?? item?.title })
    // @todo turn into function return
    if (item?.type === 'url.internal' && !!item.url) {
      void handleRouteInternal(item.url)
    }
    if (item?.type === 'url.external' && !!item.url) {
      void handleRouteExternal(item.url)
    }
    if (item?.type === 'audio') {
      void handleToggleAudio()
    }
    if (item?.type === 'theme') {
      void handleToggleTheme()
    }
    // event.preventDefault()
    if (item.id === 'settings-audio' || item.id === 'settings-theme') {
      event.preventDefault()
      return
    }
    // void openSet(false)
  }

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
      <Container size="4">
        <Flex
          css={{ width: '100%' }}
          direction="row"
          justify="between"
          align="start"
        >
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
                  <MenuMobile
                    handleSelect={handleSelect}
                    navigationNonMutated={navigationNonMutated}
                  />
                </>
              </Media>
              <Media greaterThan="xs">
                <MenuDesktop
                  handleSelect={handleSelect}
                  navigationNonMutated={navigationNonMutated}
                />
              </Media>
              <MenuKBar />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </AppBar>
  )
}

export { _AppBar as AppBar }
