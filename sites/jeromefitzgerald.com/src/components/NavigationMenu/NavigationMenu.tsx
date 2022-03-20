import { TicketIcon } from '@heroicons/react/outline'
import {
  Box,
  Flex,
  // Label,
  // TextField,
  // @core
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTriggerWithCaret,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuIndicatorWithArrow,
  // @custom
  NavigationMenuListContent,
  NavigationMenuListItem,
  NavigationMenuLinkTitle,
  NavigationMenuLinkText,
  NavigationMenuViewportPosition,
  Focused,
  Selected,
} from '@jeromefitz/design-system/components'
import { cssIconHeroToRadix2 } from '@jeromefitz/shared/src/lib/constants'
import { LayoutGroup } from 'framer-motion'
import NextLink from 'next/link'
import * as React from 'react'

const NavigationMenuContentContainer = ({ id, items, layout }) => {
  const [focused, setFocused] = React.useState(null)
  const [selected, setSelected] = React.useState(null)

  const isCallout = id === 'events'
  const calloutId = 'callout-id'

  return (
    <NavigationMenuListContent
      layout={layout}
      css={{ flexDirection: 'column' }}
      onMouseLeave={() => setFocused(null)}
    >
      <LayoutGroup id={`nmlc-${id}`}>
        {isCallout && (
          <NavigationMenuListItem
            css={{
              gridRow: 'span 3',
            }}
            key={calloutId}
          >
            <NextLink href="/" passHref>
              <NavigationMenuLink
                onClick={() => setSelected(calloutId)}
                onKeyDown={(event: { key: string }) =>
                  event.key === 'Enter' ? setSelected(calloutId) : null
                }
                onFocus={() => setFocused(calloutId)}
                onMouseEnter={() => setFocused(calloutId)}
                focus
                type="callout"
              >
                <Box as="span" css={{ mx: '$1' }}>
                  <NavigationMenuLinkTitle
                    css={{
                      fontSize: '1.125rem',
                      color: '$loContrast',
                      my: '$2',
                    }}
                  >
                    <>
                      <TicketIcon
                        className="hi2ri"
                        style={{ ...cssIconHeroToRadix2, marginBottom: '1rem' }}
                      />
                      Upcoming Event Title
                    </>
                  </NavigationMenuLinkTitle>
                  <NavigationMenuLinkText
                    css={{
                      fontSize: '0.875rem',
                      color: '$hiContrast',
                      lineHeight: 1.3,
                    }}
                  >
                    FRI 03/04 08:00PM
                  </NavigationMenuLinkText>
                </Box>
                {focused === calloutId ? (
                  <Focused color="violet" layoutId="highlight" type="callout" />
                ) : null}
                {selected === calloutId ? <Selected layoutId="underline" /> : null}
              </NavigationMenuLink>
            </NextLink>
          </NavigationMenuListItem>
        )}
        {items.map((item) => (
          <NavigationMenuListItem css={{ mb: '$2' }} key={item.id}>
            <NextLink passHref href={item.url}>
              <NavigationMenuLink
                onClick={() => setSelected(item.id)}
                onKeyDown={(event: { key: string }) =>
                  event.key === 'Enter' ? setSelected(item.id) : null
                }
                onFocus={() => setFocused(item.id)}
                onMouseEnter={() => setFocused(item.id)}
                focus
              >
                <span>
                  <NavigationMenuLinkTitle>
                    <Flex align="center" direction="row" gap="1" justify="start">
                      {!!item?.icon && item.icon} {item.title}
                    </Flex>
                  </NavigationMenuLinkTitle>
                  <NavigationMenuLinkText>
                    {item.subtitle ?? item.description}
                  </NavigationMenuLinkText>
                </span>
                {focused === item.id ? (
                  <Focused color="violet" layoutId="highlight" />
                ) : null}
                {selected === item.id ? <Selected layoutId="underline" /> : null}
              </NavigationMenuLink>
            </NextLink>
          </NavigationMenuListItem>
        ))}
      </LayoutGroup>
    </NavigationMenuListContent>
  )
}

const NavigationMenuImpl = ({ navigationNonMutated }) => {
  // console.dir(`> navigationNonMutated`)
  // console.dir(navigationNonMutated)
  const menu = [
    // {
    //   id: 'events',
    //   url: '/',
    //   layout: 'one',
    //   title: 'Upcoming Events',
    //   items: [
    //     // {
    //     //   id: 'title-1',
    //     //   url: '/about',
    //     //   title: 'Title 1',
    //     //   subtitle: 'Description of Event Title 1.',
    //     // },
    //     {
    //       id: 'title-2',
    //       url: '/about',
    //       title: 'Title 2',
    //       subtitle: 'Description of Event Title 2.',
    //     },
    //     {
    //       id: 'title-3',
    //       url: '/about',
    //       title: 'View All',
    //       subtitle: 'Listing of all Upcoming Events',
    //     },
    //   ],
    // },
    {
      id: 'pages',
      url: '/',
      layout: 'two',
      title: 'Menu',
      items: navigationNonMutated?.pages?.items,
    },
    {
      id: 'shows',
      url: '/',
      layout: 'two',
      title: 'Shows',
      items: navigationNonMutated?.shows?.items,
    },
    { id: 'events', url: '/events', layout: null, title: 'Events' },
  ]
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* <Flex
          css={{
            flexWrap: 'wrap',
            alignItems: 'center',
            '@bp1': { maxWidth: '25%' },
          }}
          direction="row"
        >
          <Label
            htmlFor="title"
            css={{
              display: 'inline-flex',
              fontWeight: 'bold',
              lineHeight: '35px',
              marginRight: 15,
            }}
          >
            Title
          </Label>
          <TextField
            css={{
              display: 'inline-flex',
              fontFamily: '$mono',
              padding: '$3 $2',
              my: '$1',
            }}
            type="text"
            id="title"
          />
        </Flex> */}
        {menu.map((menuItem) => {
          const { id, url, layout, title, items } = menuItem
          const hasChildren = !!items

          return hasChildren ? (
            <NavigationMenuItem key={`kmi-${id}`}>
              <NavigationMenuTriggerWithCaret>
                {title}
              </NavigationMenuTriggerWithCaret>
              <NavigationMenuContent>
                <NavigationMenuContentContainer
                  id={id}
                  items={items}
                  layout={layout}
                />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={`kmi-${id}`}>
              <NavigationMenuLink href={url}>{title}</NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}

        <NavigationMenuIndicatorWithArrow />
      </NavigationMenuList>

      <NavigationMenuViewportPosition>
        <NavigationMenuViewport />
      </NavigationMenuViewportPosition>
    </NavigationMenu>
  )
}

export { NavigationMenuImpl as NavigationMenu }
