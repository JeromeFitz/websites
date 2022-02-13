import {
  AppBar,
  Avatar,
  Box,
  Button,
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
  // Grid,
  IconButton,
  // Kbd,
  // Label,
  // Select,
  // Separator,
  Sheet,
  SheetContent,
  SheetTrigger,
  // SheetClose,
  // SheetTitle,
  // SheetDescription,
  // Heading,
  // Text,
} from '@jeromefitz/design-system/components'
// import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'
import { styled } from '@jeromefitz/design-system/stitches.config'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  // CalendarIcon,
  // CheckIcon,
  ChevronRightIcon,
  // DotFilledIcon,
  // GitHubLogoIcon,
  HamburgerMenuIcon,
  // HomeIcon,
} from '@radix-ui/react-icons'
import * as Portal from '@radix-ui/react-portal'
// import { useKBar } from 'kbar'
// import { useTheme } from 'next-themes'
import * as React from 'react'
// import useSWRImmutable from 'swr/immutable'

import { navigationData, sections } from '~config/navigation'
// import fetcher from '~lib/fetcher'
import { Shadows } from '~styles/const'

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
  fill: 'white',
})
const RightSlot = styled('div', {
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  color: '$colors$slate11',
  ':focus > &': { color: 'white' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

export const DropdownMenuDemo = () => {
  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Customise options">
            {/* <HamburgerMenuIcon /> */}
            <Button css={{ '&:hover': { cursor: 'pointer' } }} size="1">
              <HamburgerMenuIcon />
            </Button>
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent css={{ pl: '$1' }} alignOffset={-5} sideOffset={6}>
          {/* <DropdownMenuLabel>Next Show</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenuItemIndicator>
              <CheckIcon />
            </DropdownMenuItemIndicator>
            The Playlist <RightSlot>FRI 02/25</RightSlot>
          </DropdownMenuCheckboxItem> */}
          {Object.keys(sections).map((k) => {
            const section = sections[k]
            const settings = section.settings.dropdown

            return (
              <React.Fragment key={`dml-${k}`}>
                {settings.inline ? (
                  <>
                    {settings.label && (
                      <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
                    )}
                    {!!navigationData[k] &&
                      navigationData[k].map((item, itemIdx) => {
                        return (
                          <React.Fragment key={`dml-${k}-${itemIdx}`}>
                            <DropdownMenuItem>
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
                        {!!navigationData[k] &&
                          navigationData[k].map((item, itemIdx) => {
                            return (
                              <React.Fragment key={`dml-${k}-${itemIdx}`}>
                                <DropdownMenuItem>
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
                        {/* <DropdownMenuItem>JerKy BoyZ</DropdownMenuItem> */}
                        {/* <DropdownMenuItem>Knockoffs</DropdownMenuItem> */}
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem>View All Podcasts</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
                {settings.separator && <DropdownMenuSeparator />}
              </React.Fragment>
            )
          })}

          {/* <DropdownMenuCheckboxItem
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownMenuItemIndicator>
              <CheckIcon />
            </DropdownMenuItemIndicator>
            Upcoming Events
          </DropdownMenuCheckboxItem> */}
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem>
            <Flex css={{ ml: '-1.25rem' }} gap="2">
              <HomeIcon />
              Home
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuItem>Books</DropdownMenuItem>
          <DropdownMenuItem disabled>Music</DropdownMenuItem> */}
          {/* <DropdownMenu>
            <DropdownMenuTriggerItem>
              Podcasts
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuTriggerItem>
            <DropdownMenuContent alignOffset={-5} sideOffset={6}>
              <DropdownMenuItem>JerKy BoyZ</DropdownMenuItem>
              <DropdownMenuItem>Knockoffs</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View All Podcasts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTriggerItem>
              Settings
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuTriggerItem>
            <DropdownMenuContent alignOffset={-5} sideOffset={6}>
              <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
                <DropdownMenuRadioItem value="light">
                  <DropdownMenuItemIndicator>
                    <DotFilledIcon />
                  </DropdownMenuItemIndicator>
                  Light Theme
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
                <DropdownMenuRadioItem value="enable">
                  <DropdownMenuItemIndicator>
                    <DotFilledIcon />
                  </DropdownMenuItemIndicator>
                  Sound Enabled
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTriggerItem>
              Shows
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuTriggerItem>
            <DropdownMenuContent alignOffset={-5} sideOffset={6}>
              <DropdownMenuItem>Alex O’Jerome</DropdownMenuItem>
              <DropdownMenuItem>JFLE (Jerome & Jesse LE)</DropdownMenuItem>
              <DropdownMenuItem>Justin & Jerome Experience</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View All Shows</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Pages</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenuRadioItem value="a">
              <DropdownMenuItemIndicator>
                <DotFilledIcon />
              </DropdownMenuItemIndicator>
              About
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">
              <DropdownMenuItemIndicator>
                <DotFilledIcon />
              </DropdownMenuItemIndicator>
              Books
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="c">
              <DropdownMenuItemIndicator>
                <DotFilledIcon />
              </DropdownMenuItemIndicator>
              Colophon
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="d">
              <DropdownMenuItemIndicator>
                <DotFilledIcon />
              </DropdownMenuItemIndicator>
              Home
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="d">
              <DropdownMenuItemIndicator>
                <DotFilledIcon />
              </DropdownMenuItemIndicator>
              Music
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup> */}
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenu>
    </Box>
  )
}

const MobileMenu = () => {
  // const { theme, setTheme } = useTheme()
  // // const  content = `Toggle Theme to: ${theme === 'light' ? 'Dark' : 'Light'}`

  // const handleThemeSet = React.useCallback(
  //   (theme) => {
  //     document.documentElement.style.setProperty('color-scheme', theme)
  //     setTheme(theme)
  //   },
  //   [setTheme]
  // )

  // const { data: _s } = useSWRImmutable<any>(
  //   [`/api/v1/cms/shows`],
  //   (url) => fetcher(url),
  //   {}
  // )
  // const showsItems = _s?.items?.results ?? []

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button css={{ '&:hover': { cursor: 'pointer' } }} size="1">
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <Portal.Root>
          <SheetContent
            css={{
              // textAlign: 'center',
              borderTopLeftRadius: '$4',
              borderTopRightRadius: '$4',
              p: '$4',
              pb: '$6',
              height: 'auto',
            }}
            side="bottom"
          >
            {/* <Flex direction="column" justify="start" align="start">
              <Label
                htmlFor="shows"
                css={{ fontWeight: 'bold', lineHeight: '35px', marginRight: 15 }}
              >
                Shows
              </Label>
              <Box
                as="ul"
                css={{ m: 0, p: 0, '& li': { listStyleType: 'none', my: '$2' } }}
                id="shows"
              >
                {showsItems.map((item, itemIdx) => {
                  const {
                    id,
                    // icon: { emoji },
                    properties,
                  } = item
                  const { rollupShows__Tags, slug, title } = properties
                  return (
                    <Box as="li" css={{}} key={`menu-shows-${itemIdx}`}>
                      <Text id="message">{title}</Text>
                    </Box>
                  )
                })}
              </Box>
            </Flex> */}
            {/* <Separator margin="my2" size="full" /> */}
            {Object.keys(sections).map((k) => {
              const section = sections[k]
              const settings = section.settings.sheet
              if (!settings.active) {
                return null
              }
              // console.dir(settings)

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
                            {section.icon && section.icon}
                            {section.title}
                          </Flex>
                        </Box>
                      </Box>
                    )}
                    {!!navigationData[k] && settings.children && (
                      <Box as="ul" css={{ m: 0, px: '$1' }}>
                        {navigationData[k].map((item, itemIdx) => {
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
                                        {item.rightSlotExtended ?? item.rightSlot}
                                      </Box>
                                    )}
                                  </Box>
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

const _AppBar = ({}) => {
  // const kbar = useKBar()

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
            <MobileMenu />
            <DropdownMenuDemo />
          </Flex>
        </Flex>
      </Flex>
    </AppBar>
  )
}

export { _AppBar as AppBar }
