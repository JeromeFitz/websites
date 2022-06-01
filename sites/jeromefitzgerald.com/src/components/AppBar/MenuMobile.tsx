import {
  Box,
  Button,
  Flex,
  Separator,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@jeromefitz/design-system'
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import * as React from 'react'
import { useSwipeable } from 'react-swipeable'
import { useSound } from 'use-sound'

import { CommandKButton } from '~components/CommandKButton'
import { ToggleAudio, ToggleTheme } from '~components/Toggle'
import useStore from '~store/useStore'

import { slideIn, slideOut, StyledCloseButton, StyledLink } from './Menu.styles'

const MenuMobile = ({ handleSelect, navigationNonMutated }) => {
  /**
   * @custom to sheet
   */
  const { theme } = useTheme()
  const audio = useStore.use.audio()

  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()

  const [switchOnPlay] = useSound(sounds.popUpOn, {
    soundEnabled: audio,
    volume,
  })
  const [switchOffPlay] = useSound(sounds.popUpOff, {
    soundEnabled: audio,
    volume,
  })

  const handleMenuOpen = (open: boolean) => {
    open && switchOnPlay()
  }
  const handleMenuClose = () => {
    switchOffPlay()
    openSet(false)
  }

  const [open, openSet] = React.useState(false)
  const handleSelectInternal = (event, item) => {
    void handleSelect(event, item)
    if (item?.type === 'audio' || item?.type === 'theme') {
      return
    }
    void openSet(false)
  }

  /**
   * @hack please instead do this correctly 🤣️
   */
  const [swipeDownTransitionTime, swipeDownTransitionTimeSet] =
    React.useState('250ms')
  const handlers = useSwipeable({
    // onSwiping: (event) => {
    //   if (event.dir === 'Down') {
    //     console.log('onSwiping: Down')
    //     console.dir(event)
    //   }
    // },
    onSwipedDown: () => {
      void swipeDownTransitionTimeSet(`350ms`)
      void openSet(false)
      void setTimeout(() => {
        void swipeDownTransitionTimeSet(`250ms`)
      }, 350)
    },
  })
  const myRef = React.useRef()
  const refPassthrough = (el) => {
    handlers.ref(el)
    myRef.current = el
  }

  return (
    <Flex gap="2">
      <CommandKButton />
      <ToggleTheme />
      <ToggleAudio />
      <Sheet open={open} onOpenChange={handleMenuOpen}>
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
              animation: `${slideOut} ${swipeDownTransitionTime} cubic-bezier(0.22, 1, 0.36, 1)`,
            },
          }}
          side="bottom"
          onPointerDownOutside={handleMenuClose}
          onEscapeKeyDown={handleMenuClose}
          ref={refPassthrough}
          {...handlers}
        >
          <StyledCloseButton asChild>
            <Button
              aria-label="Open Menu"
              css={{ '&:hover': { cursor: 'pointer' } }}
              size="1"
              onClick={() => openSet(false)}
            >
              <Cross1Icon />
            </Button>
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
                                onClick={(event) =>
                                  handleSelectInternal(event, section)
                                }
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
                            const icon = item.icons[theme]
                            const text =
                              theme === 'light'
                                ? 'Toggle Theme to Dark'
                                : 'Toggle Theme to Light'
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
                                        handleSelectInternal(event, item)
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
                                          {text}
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
                            const icon = item.icons[audio.toString()]
                            const text = audio
                              ? 'Toggle Sound Off'
                              : 'Toggle Sound On'
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
                                        handleSelectInternal(event, item)
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
                                          {text}
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
                                        handleSelectInternal(event, item)
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
      </Sheet>
    </Flex>
  )
}

export { MenuMobile }
