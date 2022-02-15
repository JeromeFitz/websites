import {
  useToast,
  Box,
  Button,
  // uh
  DropdownMenuSeparator,
  Flex,
  Sheet,
  SheetContent,
  SheetTrigger,
  // SheetClose,
  // SheetTitle,
  // SheetDescription,
} from '@jeromefitz/design-system/components'
import { keyframes } from '@jeromefitz/design-system/stitches.config'
import {
  HamburgerMenuIcon,
  // MoonIcon,
  // SpeakerModerateIcon,
  // SpeakerOffIcon,
  // SunIcon,
} from '@radix-ui/react-icons'
import * as Portal from '@radix-ui/react-portal'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffectOnce } from 'react-use'
import { useSound } from 'use-sound'

import { navigation } from '~config/navigation'
import { useUI } from '~context/UI'

const slideIn = keyframes({
  from: { transform: '$$transformValue' },
  to: { transform: 'translate3d(0,0,0)' },
})

const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: '$$transformValue' },
})

const MenuMobile = () => {
  /**
   * @question can we lift this and not duplicate
   */
  // const kbar = useKBar()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const toasts = useToast()
  const { audio, toggleAudio } = useUI()

  const [playBleep] = useSound('/static/audio/bleep.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const [playDisableSound] = useSound('/static/audio/disable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })
  const [playEnableSound] = useSound('/static/audio/enable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })

  const handleToast = (props) => {
    const { title } = props
    if (toasts && toasts.current) {
      toasts.current.message({
        duration: 2000,
        text: `Routing to: ${title}`,
        type: 'default',
      })
    }
  }

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
    toggleAudio()
  }, [audio, playDisableSound, playEnableSound, toggleAudio])

  /**
   * @custom to sheet
   */
  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
  })
  const [open, openSet] = React.useState(false)

  const handleSelect = (event, item) => {
    console.dir(`> handleSelect`)
    console.dir(event)
    console.dir(item)
    void handleToast({ title: item?.titleExtended ?? item?.title })
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
    void openSet(false)
    console.dir(`open: ${open}`)
  }

  return (
    <>
      <Sheet open={open}>
        <SheetTrigger asChild>
          <Button
            css={{ '&:hover': { cursor: 'pointer' } }}
            size="1"
            onClick={() => openSet(true)}
          >
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <Portal.Root id="testing">
          <SheetContent
            aria-label="Menu"
            css={{
              // textAlign: 'center',
              borderTopLeftRadius: '$4',
              borderTopRightRadius: '$4',
              p: '$4',
              pb: '$6',
              height: 'auto',

              '&[data-state="open"]': {
                animation: `${slideIn} 250ms cubic-bezier(0.22, 1, 0.36, 1)`,
              },

              '&[data-state="closed"]': {
                animation: `${slideOut} 350ms cubic-bezier(0.22, 1, 0.36, 1)`,
              },
            }}
            id="testing-content"
            side="bottom"
            onInteractOutside={() => openSet(false)}
            onPointerDownOutside={() => openSet(false)}
          >
            {navigationNonMutated &&
              Object.keys(navigationNonMutated).map((k) => {
                const section = navigationNonMutated[k]
                const { items } = section
                const settings = section.settings.sheet
                if (!settings.active) {
                  return null
                }

                // console.dir(`> section`)
                // console.dir(section)

                return (
                  <React.Fragment key={`sheet-${k}`}>
                    <Box
                      as="li"
                      role="presentation"
                      css={{ listStyleType: 'none', m: 0, p: 0 }}
                    >
                      {settings.children ? (
                        <Box
                          as="span"
                          aria-hidden="true"
                          css={{
                            display: 'block',
                            color: '$slate11',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '$1',
                            // pt: '$2',
                            textTransform: 'uppercase',
                          }}
                        >
                          {section.title}
                        </Box>
                      ) : (
                        <Box as="ul" css={{ m: 0, px: '$1' }}>
                          <Box
                            as="li"
                            css={{ listStyleType: 'none', my: '$1', py: '$1' }}
                          >
                            <Flex align="center" justify="start" gap="2">
                              {/* <DialogClose> */}
                              <NextLink href={section.url} passHref>
                                <a onClick={(event) => handleSelect(event, section)}>
                                  {section.icon && section.icon}
                                  {section.title}
                                </a>
                              </NextLink>
                              {/* </DialogClose> */}
                            </Flex>
                          </Box>
                        </Box>
                      )}
                      {!!items && settings.children && (
                        <Box as="ul" css={{ m: 0, px: '$1' }}>
                          {items.map((item, itemIdx) => {
                            return (
                              <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                <Box
                                  as="li"
                                  css={{ listStyleType: 'none', my: '$1', py: '$1' }}
                                >
                                  <Flex
                                    align="center"
                                    justify="start"
                                    gap="2"
                                    // columns="2"
                                    // flow="row"
                                  >
                                    {/* <DialogClose> */}
                                    <NextLink href={item.url} passHref>
                                      <a
                                        onClick={(event) =>
                                          handleSelect(event, item)
                                        }
                                      >
                                        {item.icon && item.icon}
                                        <Box as="div">
                                          <Box
                                            as="span"
                                            css={{
                                              fontWeight: item.rightSlotExtended
                                                ? '700'
                                                : '400',
                                            }}
                                          >
                                            {item.titleExtended ?? item.title}
                                          </Box>
                                          {/* @hack only want first one */}
                                          {item.rightSlot && itemIdx === 0 && (
                                            <Box
                                              as="span"
                                              css={{
                                                display: 'block',
                                                // fontFamily: '$mono',
                                                fontSize: '0.8rem',
                                                mt: '$1',
                                              }}
                                            >
                                              {item.rightSlotExtended ??
                                                item.rightSlot}
                                            </Box>
                                          )}
                                        </Box>
                                      </a>
                                    </NextLink>
                                    {/* </DialogClose> */}
                                  </Flex>
                                </Box>
                                {item.separator && (
                                  <DropdownMenuSeparator css={{ my: '$2' }} />
                                )}
                              </React.Fragment>
                            )
                          })}
                        </Box>
                      )}
                    </Box>
                  </React.Fragment>
                )
              })}
            {/* <Flex direction="row" justify="between" align="center">
              <Label
                htmlFor="theme"
                css={{ fontWeight: 'bold', lineHeight: '35px', marginRight: 15 }}
              >
                Theme
              </Label>
              <Select
                css={{
                  width: '50%',
                  '& option': {
                    p: '$2',
                  },
                }}
                id="theme"
                value={theme}
                onChange={(e) => handleThemeSet(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </Flex> */}
          </SheetContent>
        </Portal.Root>
      </Sheet>
    </>
  )
}

export { MenuMobile }
