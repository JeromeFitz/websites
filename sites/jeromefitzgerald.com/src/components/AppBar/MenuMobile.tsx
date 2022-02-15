import {
  // useToast,
  Box,
  Button,
  Flex,
  IconButton,
  Separator,
  Sheet,
  SheetContent,
  SheetTrigger,
  // SheetClose,
  // SheetTitle,
  // SheetDescription,
} from '@jeromefitz/design-system/components'
import {
  darkTheme,
  keyframes,
  styled,
} from '@jeromefitz/design-system/stitches.config'
import {
  Close as DialogClose,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from '@radix-ui/react-dialog'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  MoonIcon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  SunIcon,
} from '@radix-ui/react-icons'
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

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const StyledOverlay = styled(DialogOverlay, {
  backgroundColor: '$colors$blackA9',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})
const StyledCloseButton = styled(DialogClose, {
  backgroundColor: 'green',
  position: 'absolute',
  top: '$2',
  right: '$2',
  zIndex: '9999',
})
const StyledLink = styled('a', Flex, {
  py: '$1',
  textDecoration: 'none',
  width: '100%',
  '& span, & svg': {
    color: '$hiContrast',
  },
})

const MenuMobile = () => {
  /**
   * @question can we lift this and not duplicate
   */
  // const kbar = useKBar()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  // const toasts = useToast()
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
    void openSet(false)
  }

  return (
    <>
      <Sheet open={open}>
        <SheetTrigger asChild>
          <Button
            aria-label="Open Menu"
            css={{ '&:hover': { cursor: 'pointer' } }}
            size="1"
            onClick={() => openSet(true)}
          >
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <DialogPortal>
          <StyledOverlay />
          <SheetContent
            aria-label="Menu Content"
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
            side="bottom"
            onInteractOutside={() => openSet(false)}
            onPointerDownOutside={() => openSet(false)}
            onEscapeKeyDown={() => openSet(false)}
          >
            <StyledCloseButton asChild>
              <IconButton
                aria-label="Close Menu"
                variant="ghost"
                onClick={() => openSet(false)}
              >
                <Cross1Icon />
              </IconButton>
            </StyledCloseButton>
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
                            css={{
                              listStyleType: 'none',
                              my: '0',
                              py: '$1',
                            }}
                          >
                            <Flex align="center" justify="start" gap="2">
                              <NextLink href={section.url} passHref>
                                <StyledLink
                                  align="center"
                                  justify="start"
                                  gap="2"
                                  onClick={(event) => handleSelect(event, section)}
                                >
                                  {section.icon && section.icon}
                                  <Box as="span">{section.title}</Box>
                                </StyledLink>
                              </NextLink>
                            </Flex>
                          </Box>
                        </Box>
                      )}
                      {!!items && settings.children && (
                        <Box as="ul" css={{ m: 0, px: '$1' }}>
                          {/* @todo(complexity) 16 */}
                          {/* eslint-disable-next-line complexity */}
                          {items.map((item, itemIdx) => {
                            if (item.id === 'settings-theme') {
                              const icon =
                                theme === 'light' ? <MoonIcon /> : <SunIcon />
                              return (
                                <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                  <Box
                                    as="li"
                                    css={{
                                      listStyleType: 'none',
                                      my: '0',
                                      py: '$1',
                                    }}
                                  >
                                    <Flex align="center" justify="start" gap="2">
                                      {/* <NextLink href={item.url} passHref> */}
                                      <StyledLink
                                        align="center"
                                        justify="start"
                                        gap="2"
                                        onClick={(event) =>
                                          handleSelect(event, item)
                                        }
                                      >
                                        {/* {item.icon && item.icon} */}
                                        {item.icon && icon}
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
                                      </StyledLink>
                                      {/* </NextLink> */}
                                    </Flex>
                                  </Box>
                                  {item.separator && (
                                    <Separator margin="my1" size="full" />
                                  )}
                                </React.Fragment>
                              )
                            }
                            if (item.id === 'settings-audio') {
                              const icon = audio ? (
                                <SpeakerOffIcon />
                              ) : (
                                <SpeakerModerateIcon />
                              )
                              return (
                                <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                  <Box
                                    as="li"
                                    css={{
                                      listStyleType: 'none',
                                      my: '0',
                                      py: '$1',
                                    }}
                                  >
                                    <Flex align="center" justify="start" gap="2">
                                      {/* <NextLink href={item.url} passHref> */}
                                      <StyledLink
                                        align="center"
                                        justify="start"
                                        gap="2"
                                        onClick={(event) =>
                                          handleSelect(event, item)
                                        }
                                      >
                                        {/* {item.icon && item.icon} */}
                                        {item.icon && icon}
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
                                      </StyledLink>
                                      {/* </NextLink> */}
                                    </Flex>
                                  </Box>
                                  {item.separator && (
                                    <Separator margin="my2" size="full" />
                                  )}
                                </React.Fragment>
                              )
                            }
                            return (
                              <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                <Box
                                  as="li"
                                  css={{
                                    listStyleType: 'none',
                                    my: '0',
                                    py: '$1',
                                  }}
                                >
                                  <Flex align="center" justify="start" gap="2">
                                    <NextLink href={item.url} passHref>
                                      <StyledLink
                                        align="center"
                                        justify="start"
                                        gap="2"
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
                                      </StyledLink>
                                    </NextLink>
                                  </Flex>
                                </Box>
                                {item.separator && (
                                  <Separator margin="my2" size="full" />
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
        </DialogPortal>
      </Sheet>
    </>
  )
}

export { MenuMobile }
