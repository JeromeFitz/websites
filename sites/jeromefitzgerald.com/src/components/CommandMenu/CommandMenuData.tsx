import {
  darkTheme,
  //
  Box,
  Command as CommandMenu,
  CommandInput,
  CommandTopShine,
  CommandBadge,
  CommandLoader,
  CommandList,
  // CommandSeparator,
  CommandGroup,
  CommandEmpty,
  // CommandShortCuts,
  CommandItem,
  CommandMenuItem,
  Flex,
  Icon,
} from '@jeromefitz/design-system'
import { useCommandState, Command } from 'cmdk'
// import _filter from 'lodash/filter'
import _map from 'lodash/map'
// import _merge from 'lodash/merge'
// import { fetcher, fetcherMulti } from 'next-notion/src/lib/fetcher'
import { fetcher } from 'next-notion/src/lib/fetcher'
// import { getNextPageStatus } from 'next-notion/src/utils'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffectOnce } from 'react-use'
import useSWRImmutable from 'swr/immutable'
import { useSound } from 'use-sound'

import { navigation } from '~config/navigation'
import { useThemeToggle } from '~hooks/useThemeToggle'
import useStore from '~store/useStore'

import { ListDynamic } from './ListDynamic'

// const SwrFetcher = () => {
//   return null
// }

// const SubItems = ({ icon, routeType }) => {
//   const getUrl = `/api/v1/cms/${routeType}`
//   const router = useRouter()
//   const handleRouteInternal = (url) => {
//     void router.push(url)
//   }
//   const commandMenuOpenSet = useStore.use.commandMenuOpenSet()
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { data, error, isValidating } = useSWRImmutable<any>(
//     [getUrl],
//     (url) => fetcher(url),
//     {}
//   )
//   const { isDataUndefined, isError, isLoading } = getNextPageStatus(
//     data,
//     error,
//     // url
//     getUrl
//   )

//   const items = data?.items?.results

//   // console.dir(`SubItems: ${routeType}`)
//   // console.dir(items)

//   if (isLoading && !isDataUndefined) return null
//   if (isError && isDataUndefined) return null
//   if (!!items) {
//     items?.map((item) => {
//       const { id, properties } = item
//       const { slug, title } = properties
//       // console.dir(`SubItem (Mapped): ${slug} (${routeType})`)
//       return null
//       return (
//         <SubItemTest
//           key={`sub-item-item-${id}`}
//           // onSelect={() => {
//           //   handleRouteInternal(`/${routeType}/${slug}`)
//           //   commandMenuOpenSet()
//           // }}
//           // value={slug}
//         >
//           {/* <Flex gap="3">
//             {icon}
//             {title}
//           </Flex> */}
//           {title}
//         </SubItemTest>
//       )
//       // return (
//       //   <SubItem
//       //     key={`sub-item-item-${id}`}
//       //     onSelect={() => {
//       //       handleRouteInternal(`/${routeType}/${slug}`)
//       //       commandMenuOpenSet()
//       //     }}
//       //     value={slug}
//       //   >
//       //     <Flex gap="3">
//       //       {icon}
//       //       {title}
//       //     </Flex>
//       //   </SubItem>
//       // )
//     })
//   } else {
//     // console.dir(`SubItems (none) => ${routeType}`)
//     return null
//   }
// }

const SubItemTest = (props) => {
  const commandState = useCommandState((state) => state)
  const { search } = commandState

  // console.dir(`SubItemTest: (${props.page})`)
  // console.dir(commandState)

  // @todo(cmdk) yuck
  if (!search || props?.page === 'podcasts' || props?.page === 'shows') return null

  return <CommandItem {...props} />
}

const ListSubItems = React.memo((props: any) => {
  const { commandMenuOpenSet, handleRouteInternal, icon, items, page, routeType } =
    props
  return (
    <>
      {!!items &&
        items?.map((item) => {
          const { id, properties } = item
          const { slug, title } = properties
          return (
            <SubItemTest
              key={`cmd-sub3-item-${id}`}
              onSelect={() => {
                handleRouteInternal(`/${routeType}/${slug}`)
                commandMenuOpenSet()
              }}
              page={page}
              value={title}
            >
              <Flex gap="3">
                {icon}
                {title}
              </Flex>
            </SubItemTest>
          )
        })}
    </>
  )
})

const CommandMenuData = () => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = React.useState('')

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
  const { resolvedTheme: theme, setTheme } = useTheme()
  const router = useRouter()

  const handleRouteInternal = (url) => {
    void router.push(url)
    void playBleep()
  }
  const handleRouteExternal = (url) => {
    void window.open(url)
    void playBleep()
  }
  const handleThemeToggle = useThemeToggle({ darkTheme, setTheme, theme })
  const handleAudioToggle = React.useCallback(() => {
    audio ? playDisableSound() : playEnableSound()
    audioToggle()
  }, [audio, audioToggle, playDisableSound, playEnableSound])

  const commandMenuOpenSet = useStore.use.commandMenuOpenSet()

  const [navigationNonMutated, navigationNonMutatedSet] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  useEffectOnce(() => {
    navigationNonMutatedSet(navigation)
    setLoading(false)
  })

  const [pages, setPages] = React.useState<string[]>(['home'])
  const activePage = pages[pages.length - 1]
  const isHome = activePage === 'home'

  const popPage = React.useCallback(() => {
    setPages((pages) => {
      const x = [...pages]
      x.splice(-1, 1)
      return x
    })
  }, [])

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = 'scale(0.96)'
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = ''
        }
      }, 100)

      setInputValue('')
    }
  }

  // const searchProps = {
  //   searchShows: () => setPages([...pages, 'shows']),
  //   searchPodcasts: () => setPages([...pages, 'podcasts']),
  // }

  const { data: _shows } = useSWRImmutable<any>(
    [`/api/v1/cms/shows`],
    (url) => fetcher(url),
    {}
  )
  const { data: _podcasts } = useSWRImmutable<any>(
    [`/api/v1/cms/podcasts`],
    (url) => fetcher(url),
    {}
  )
  const shows = _shows?.items?.results
  const podcasts = _podcasts?.items?.results
  const itemsDynamic = React.useMemo(() => {
    return { podcasts, shows }
  }, [podcasts, shows])

  // console.dir(`navigationNonMutated: ${loading}`)
  // console.dir(navigationNonMutated)

  return (
    <Box
      css={{
        margin: '0 auto',
        width: '100%',
        maxWidth: '100%',
        padding: '0 $3',
        height: '100%',
        '@bp1': {
          maxWidth: '640px',
          padding: '0',
        },
      }}
      cmdk-wrapper=""
    >
      <CommandMenu
        ref={ref}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            bounce()
          }

          if (isHome || inputValue.length) {
            return
          }

          if (e.key === 'Backspace') {
            e.preventDefault()
            popPage()
            bounce()
          }
        }}
        css={{
          height: 'inherit',
          '@bp1': {
            height: 'inherit',
          },
        }}
      >
        <CommandTopShine cmdk-top-shine="" />
        <Box as="div" cmdk-badge-container="">
          {pages.map((p) => {
            /**
             * @hack(cmdk) tidy this up please
             */
            const isLink = p === 'home' && pages?.length > 1
            return (
              <CommandBadge
                as={isLink ? 'a' : 'div'}
                css={{
                  '@hover': {
                    '&:hover': {
                      cursor: isLink ? 'pointer' : 'default',
                    },
                  },
                }}
                key={p}
                cmdk-badge=""
                onClick={() => {
                  isLink && popPage()
                }}
              >
                {p}
              </CommandBadge>
            )
          })}
        </Box>
        <CommandInput
          autoFocus
          placeholder="Type a command or search…"
          onValueChange={(value) => {
            setInputValue(value)
          }}
        />
        <CommandLoader cmdk-loader="" />
        <CommandList
          css={{
            maxHeight: '100%',
            '@bp1': {
              maxHeight: '400px',
            },
          }}
        >
          {loading && (
            <Command.Loading>
              <CommandMenuItem>
                <Flex gap="3">
                  <Icon.Clock />
                  One moment…
                </Flex>
              </CommandMenuItem>
            </Command.Loading>
          )}
          {activePage === 'home' ? (
            <CommandGroup heading="Search">
              <CommandMenuItem
                onSelect={() => setPages([...pages, 'shows'])}
                value="search-shows"
              >
                <Flex gap="3">
                  <Icon.MagnifyingGlass />
                  Shows…
                </Flex>
              </CommandMenuItem>
              <CommandMenuItem
                onSelect={() => setPages([...pages, 'podcasts'])}
                value="search-podcasts"
              >
                <Flex gap="3">
                  <Icon.MagnifyingGlass />
                  Podcasts…
                </Flex>
              </CommandMenuItem>
            </CommandGroup>
          ) : null}
          {activePage === 'home'
            ? _map(navigationNonMutated, (menuItem) => {
                // console.dir(`menuItem: ${menuItem?.id}`)
                // console.dir(menuItem)
                const {
                  hasDynamicSubItems,
                  // icon,
                  id,
                  items,
                  // settings,
                  // title,
                  // type,
                  // url,
                } = menuItem
                return (
                  <React.Fragment key={`cmdk-menu--${id}`}>
                    {!hasDynamicSubItems && (
                      <CommandGroup heading={menuItem?.title}>
                        {!!items &&
                          items?.map((item) => {
                            // @todo(cmdk) yuck turn into function return
                            const { icon, icons, id, title, type, url } = item
                            let iconNew = icon
                            let handleItemLink: () => void = () => {}
                            if (type === 'url.internal' && !!url) {
                              handleItemLink = () => {
                                void handleRouteInternal(url)
                                void commandMenuOpenSet()
                              }
                            }
                            if (type === 'url.external' && !!url) {
                              handleItemLink = () => {
                                void handleRouteExternal(url)
                                void commandMenuOpenSet()
                              }
                            }
                            if (type === 'audio') {
                              // Type 'boolean' cannot be used as an index type.ts(2538)
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              iconNew = !!icons ? icons[audio] : icon
                              handleItemLink = () => void handleAudioToggle()
                            }
                            if (type === 'theme') {
                              iconNew = !!icons ? icons[theme] : icon
                              handleItemLink = () => void handleThemeToggle()
                            }

                            return (
                              <CommandMenuItem
                                key={id}
                                value={id}
                                onSelect={() => {
                                  handleItemLink()
                                }}
                              >
                                <Flex gap="3">
                                  {iconNew}
                                  {title}
                                </Flex>
                              </CommandMenuItem>
                            )
                          })}
                      </CommandGroup>
                    )}
                  </React.Fragment>
                )
              })
            : null}
          {activePage === 'shows' && (
            <ListDynamic icon={<Icon.Star />} routeType="shows" />
          )}
          {activePage === 'podcasts' && (
            <ListDynamic icon={<Icon.Microphone />} routeType="podcasts" />
          )}
          <ListSubItems
            icon={<Icon.Star />}
            items={itemsDynamic?.shows}
            page={activePage}
            routeType="shows"
            handleRouteInternal={handleRouteInternal}
            commandMenuOpenSet={commandMenuOpenSet}
          />
          <ListSubItems
            icon={<Icon.Microphone />}
            items={itemsDynamic?.podcasts}
            page={activePage}
            routeType="podcasts"
            handleRouteInternal={handleRouteInternal}
            commandMenuOpenSet={commandMenuOpenSet}
          />
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </CommandMenu>
    </Box>
  )
}

export { CommandMenuData }
