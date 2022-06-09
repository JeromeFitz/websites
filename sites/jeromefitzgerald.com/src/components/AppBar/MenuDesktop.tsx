import {
  Container,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Flex,
  Icon,
  IconButton,
} from '@jeromefitz/design-system'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useSound } from 'use-sound'

import { CommandKButton } from '~components/CommandKButton'
import { NavigationMenu } from '~components/NavigationMenu'
import { ToggleAudio, ToggleTheme } from '~components/Toggle'
import useStore from '~store/useStore'

import { RightSlot } from './Menu.styles'

const MenuDesktop = ({ handleSelect, navigationNonMutated }) => {
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
  // const [play, { stop }] = useSound(sounds.pop, {
  //   soundEnabled: audio,
  //   volume: 0.25,
  // })

  const handleMenuOpen = (open: boolean) => {
    open && switchOnPlay()
  }
  const handleMenuClose = () => {
    switchOffPlay()
  }

  return (
    <>
      <Container breakout>
        <NavigationMenu navigationNonMutated={navigationNonMutated} />
      </Container>
      <Flex gap="2">
        <CommandKButton />
        <ToggleTheme />
        <ToggleAudio />
        <DropdownMenu onOpenChange={handleMenuOpen}>
          <DropdownMenuTrigger asChild>
            <IconButton
              aria-label="Open Menu"
              css={{ '&:hover': { cursor: 'pointer' } }}
              size="1"
            >
              <Icon.HamburgerMenu />
            </IconButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            css={{ pl: '$1' }}
            alignOffset={-5}
            sideOffset={6}
            onEscapeKeyDown={handleMenuClose}
            onPointerDownOutside={handleMenuClose}
          >
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
                                  // onMouseEnter={() => play()}
                                  // onMouseLeave={() => stop()}
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
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger
                            // onMouseEnter={() => play()}
                            // onMouseLeave={() => stop()}
                            >
                              <Flex align="center" justify="start" gap="2">
                                {section.icon && section.icon}
                                {section.title}
                              </Flex>
                              <RightSlot>
                                <Icon.ChevronRight />
                              </RightSlot>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent alignOffset={-5} sideOffset={6}>
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
                                    const icon = item.icons[theme]
                                    const text =
                                      theme === 'light'
                                        ? 'Toggle Theme to Dark'
                                        : 'Toggle Theme to Light'
                                    return (
                                      <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                        <DropdownMenuItem
                                          // onMouseEnter={() => play()}
                                          // onMouseLeave={() => stop()}
                                          onSelect={(event) =>
                                            handleSelect(event, item)
                                          }
                                          textValue={item.title}
                                        >
                                          <Flex
                                            align="center"
                                            justify="start"
                                            gap="2"
                                          >
                                            {/* {item.icon && item.icon} */}
                                            {item.icon && icon}
                                            {text}
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
                                    const icon = item.icons[audio.toString()]
                                    const text = audio
                                      ? 'Toggle Sound Off'
                                      : 'Toggle Sound On'
                                    return (
                                      <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                        <DropdownMenuItem
                                          // onMouseEnter={() => play()}
                                          // onMouseLeave={() => stop()}
                                          onSelect={(event) =>
                                            handleSelect(event, item)
                                          }
                                          textValue={item.title}
                                        >
                                          <Flex
                                            align="center"
                                            justify="start"
                                            gap="2"
                                          >
                                            {/* {item.icon && item.icon} */}
                                            {item.icon && icon}
                                            {text}
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
                                        // onMouseEnter={() => play()}
                                        // onMouseLeave={() => stop()}
                                        onSelect={(event) =>
                                          handleSelect(event, item)
                                        }
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
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
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
      </Flex>
    </>
  )
}

export { MenuDesktop }
