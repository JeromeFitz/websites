import {
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
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as Portal from '@radix-ui/react-portal'
import * as React from 'react'
import { useEffectOnce } from 'react-use'

import { navigation } from '~config/navigation'

const MenuMobile = () => {
  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
  })

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
            {navigationNonMutated &&
              Object.keys(navigationNonMutated).map((k) => {
                const section = navigationNonMutated[k]
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

export { MenuMobile }
