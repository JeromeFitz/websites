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

import { navigation } from '~config/navigation'
import { Media } from '~context/Media'
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
/**
 * @hack ts-ignore
 *
 * Not sure why all of a sudden this is happening
 *  on custom `styled` components
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const DropdownMenuItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
//   position: 'absolute',
//   left: 0,
//   width: 25,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// })
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DropdownMenuTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: '$colors$violet4',
    color: '$colors$violet11',
  },
  ...itemStyles,
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  mx: '$3',
  fill: 'white',
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RightSlot = styled('div', {
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  color: '$colors$slate11',
  ':focus > &': { color: 'white' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

const MenuDesktop = () => {
  return (
    <Box>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="Customise options">
            <Button css={{ '&:hover': { cursor: 'pointer' } }} size="1">
              <HamburgerMenuIcon />
            </Button>
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent css={{ pl: '$1' }} alignOffset={-5} sideOffset={6}>
          {Object.keys(navigation).map((k) => {
            const section = navigation[k]
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
                      items?.map((item, itemIdx) => {
                        // console.dir(`item:`)
                        // console.dir(item)
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
                        {!!items &&
                          items.map((item, itemIdx) => {
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

const MenuMobile = () => {
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
            {Object.keys(navigation).map((k) => {
              const section = navigation[k]
              const { items } = section
              const settings = section.settings.sheet
              if (!settings.active) {
                return null
              }

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
            <Media at="xs">
              <MenuMobile />
            </Media>
            <Media greaterThan="xs">
              <MenuDesktop />
            </Media>
          </Flex>
        </Flex>
      </Flex>
    </AppBar>
  )
}

export { _AppBar as AppBar }
