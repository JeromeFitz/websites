import {
  AppBar,
  Avatar,
  Box,
  Container,
  Flex,
  SwitchIcon,
} from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { Shadows } from '@jeromefitz/shared/src/styles/const'
import {
  MoonIcon,
  SpeakerOffIcon,
  SpeakerModerateIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffectOnce } from 'react-use'
import { useSound } from 'use-sound'

import { CommandKButton } from '~components/CommandKButton'
import { NavigationMenu } from '~components/NavigationMenu'
import { navigation } from '~config/navigation'
import useStore from '~store/useStore'

// import { MenuDesktop } from './MenuDesktop'
import { MenuKBar } from './MenuKBar'
import { MenuMobile } from './MenuMobile'

const AppBarImpl = ({}) => {
  /**
   * @question can we lift this and not duplicate
   */
  // const [checkedTheme, checkedThemeSet] = React.useState(null)
  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
    // checkedThemeSet(theme === 'dark')
  })

  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const audio = useStore.use.audio()
  const audioToggle = useStore.use.audioToggle()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()

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
    // checkedThemeSet(newTheme === 'dark')
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
      <MenuKBar />
      <Container size="4">
        {/* equals="xs" */}
        <Box
          css={{
            '@initial': { display: 'none' },
            '@bp1': { display: 'none' },
          }}
        >
          <Flex
            css={{ width: '100%' }}
            direction="row"
            justify="between"
            align="center"
          >
            <Flex
              css={{
                ml: '$2',
                '@bp1': {
                  ml: '$6',
                },
              }}
            >
              <NextLink href="/" passHref>
                <a onClick={() => playBleep()}>
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
            </Flex>
            <Flex
              justify="end"
              css={{
                width: '100%',
              }}
            >
              <MenuMobile
                handleSelect={handleSelect}
                navigationNonMutated={navigationNonMutated}
              />
            </Flex>
          </Flex>
        </Box>
        {/* greaterThan="xs" */}
        <Box
          css={{
            display: 'none',
            '@initial': { display: 'none' },
            '@bp1': { display: 'flex' },
          }}
        >
          <Flex
            css={{ width: '100%' }}
            direction="row"
            justify="between"
            align="center"
          >
            <Flex
              css={{
                ml: '$2',
                '@bp1': {
                  ml: '$6',
                },
              }}
            >
              <NextLink href="/" passHref>
                <a onClick={() => playBleep()}>
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
            </Flex>
            <Flex
              css={{
                width: '100%',
              }}
            >
              <NavigationMenu navigationNonMutated={navigationNonMutated} />
            </Flex>
            <Flex
              css={{
                alignItems: 'center',
                mr: '$2',
                '@bp1': {
                  mr: '$6',
                  // mt: '$2',
                },
              }}
              gap="3"
            >
              <Flex>
                <CommandKButton />
              </Flex>
              <Flex>
                <SwitchIcon
                  checked={theme === 'dark' || theme == undefined}
                  onCheckedChange={() => handleToggleTheme()}
                  iconOn={<MoonIcon />}
                  iconOff={<SunIcon />}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  size="3"
                />
              </Flex>
              <Flex>
                <SwitchIcon
                  checked={audio}
                  onCheckedChange={() => audioToggle()}
                  iconOn={<SpeakerModerateIcon />}
                  iconOff={<SpeakerOffIcon />}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  size="3"
                />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </AppBar>
  )
}

export { AppBarImpl as AppBar }
