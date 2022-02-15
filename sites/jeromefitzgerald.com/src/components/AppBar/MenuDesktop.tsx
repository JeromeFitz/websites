import {
  // useToast,
  Box,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  // DropdownMenuRadioItem,
  // DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  // DropdownMenuRadioGroup,
  // DropdownMenuGroup,
  Flex,
  IconButton,
} from '@jeromefitz/design-system/components'
import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  ChevronRightIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
// import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffectOnce } from 'react-use'
import { useSound } from 'use-sound'

import { navigation } from '~config/navigation'
import { useUI } from '~context/UI'

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: '$colors$violet11',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$colores$slate3',
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$colors$violet9',
    color: '$colors$violet1',
  },
}

// const DropdownMenuItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
//   position: 'absolute',
//   left: 0,
//   width: 25,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// })
const DropdownMenuTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: '$colors$violet4',
    color: '$colors$violet11',
  },
  ...itemStyles,
})
const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  mx: '$3',
  fill: '$panel',
})
const RightSlot = styled('div', {
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  color: '$colors$slate11',
  ':focus > &': { color: '$colors$hiContrast' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

const MenuDesktop = () => {
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
   * @custom to dropdown
   */
  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
  })

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

    if (item.id === 'settings-audio' || item.id === 'settings-theme') {
      event.preventDefault()
    }
  }

  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            aria-label="Open Menu"
            css={{ '&:hover': { cursor: 'pointer' } }}
            size="1"
            variant="raised"
          >
            <HamburgerMenuIcon />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent css={{ pl: '$1' }} alignOffset={-5} sideOffset={6}>
          {navigationNonMutated &&
            Object.keys(navigationNonMutated).map((k) => {
              const section = navigationNonMutated[k]
              const { items } = section
              const settings = section.settings.dropdown

              return (
                <React.Fragment key={`dml-${k}`}>
                  {settings.inline ? (
                    <>
                      {settings.label && (
                        <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
                      )}
                      {!!items &&
                        // @todo(complexity) 12
                        // eslint-disable-next-line complexity
                        items?.map((item, itemIdx) => {
                          // console.dir(`item:`)
                          // console.dir(item)
                          return (
                            <React.Fragment key={`dml-${k}-${itemIdx}`}>
                              <DropdownMenuItem
                                onSelect={(event) => handleSelect(event, item)}
                                textValue={item.title}
                              >
                                <Flex align="center" justify="start" gap="2">
                                  {item.icon && item.icon}
                                  {item.title}
                                </Flex>
                                {item.rightSlot && (
                                  <>
                                    <RightSlot>{item.rightSlot}</RightSlot>
                                  </>
                                )}
                              </DropdownMenuItem>
                              {item.separator && <DropdownMenuSeparator />}
                            </React.Fragment>
                          )
                        })}
                    </>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTriggerItem>
                          <Flex align="center" justify="start" gap="2">
                            {section.icon && section.icon}
                            {section.title}
                          </Flex>
                          <RightSlot>
                            <ChevronRightIcon />
                          </RightSlot>
                        </DropdownMenuTriggerItem>
                        <DropdownMenuContent alignOffset={-5} sideOffset={6}>
                          {!!items &&
                            // @todo(complexity) 12
                            // eslint-disable-next-line complexity
                            items.map((item, itemIdx) => {
                              // console.dir(`item:`)
                              // console.dir(item)
                              /**
                               * @hack until this is all dynamic
                               */
                              if (item.id === 'settings-theme') {
                                const icon =
                                  theme === 'light' ? <MoonIcon /> : <SunIcon />
                                return (
                                  <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                    <DropdownMenuItem
                                      onSelect={(event) => handleSelect(event, item)}
                                      textValue={item.title}
                                    >
                                      <Flex align="center" justify="start" gap="2">
                                        {/* {item.icon && item.icon} */}
                                        {item.icon && icon}
                                        {item.title}
                                      </Flex>
                                      {item.rightSlot && (
                                        <>
                                          <RightSlot>{item.rightSlot}</RightSlot>
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    {item.separator && <DropdownMenuSeparator />}
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
                                    <DropdownMenuItem
                                      onSelect={(event) => handleSelect(event, item)}
                                      textValue={item.title}
                                    >
                                      <Flex align="center" justify="start" gap="2">
                                        {/* {item.icon && item.icon} */}
                                        {item.icon && icon}
                                        {item.title}
                                      </Flex>
                                      {item.rightSlot && (
                                        <>
                                          <RightSlot>{item.rightSlot}</RightSlot>
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    {item.separator && <DropdownMenuSeparator />}
                                  </React.Fragment>
                                )
                              }
                              return (
                                <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                  <DropdownMenuItem
                                    onSelect={(event) => handleSelect(event, item)}
                                    textValue={item.title}
                                  >
                                    <Flex align="center" justify="start" gap="2">
                                      {item.icon && item.icon}
                                      {item.title}
                                    </Flex>
                                    {item.rightSlot && (
                                      <>
                                        <RightSlot>{item.rightSlot}</RightSlot>
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  {item.separator && <DropdownMenuSeparator />}
                                </React.Fragment>
                              )
                            })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  {settings.separator && <DropdownMenuSeparator />}
                </React.Fragment>
              )
            })}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  )
}

export { MenuDesktop }
