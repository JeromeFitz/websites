import {
  Box,
  Command,
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
import { useCommandState } from 'cmdk'
// import _filter from 'lodash/filter'
// import _merge from 'lodash/merge'
// import { fetcher, fetcherMulti } from 'next-notion/src/lib/fetcher'
import { fetcher } from 'next-notion/src/lib/fetcher'
// import { getNextPageStatus } from 'next-notion/src/utils'
import { useRouter } from 'next/router'
import React from 'react'
import useSWRImmutable from 'swr/immutable'
import _title from 'title'

import useStore from '~store/useStore'

import { ListDynamic } from './ListDynamic'
import { Settings } from './Settings'
// import { SubItem } from './SubItem'

/**
 * @todo(cmdk) come on dood, haha
 */
const menuPages = [
  { id: 'about', icon: <Icon.IdCard />, hasSubItems: false },
  { id: 'books', icon: <Icon.BookOpen />, hasSubItems: false },
  { id: 'colophon', icon: <Icon.InfoCircled />, hasSubItems: false },
  { id: 'events', icon: <Icon.Calendar />, hasSubItems: false },
  { id: 'homepage', icon: <Icon.Home />, hasSubItems: false },
  { id: 'music', icon: <Icon.MusicNote />, hasSubItems: false },
  { id: 'podcasts', icon: <Icon.Microphone />, hasSubItems: true },
  { id: 'shows', icon: <Icon.Star />, hasSubItems: true },
]

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

  if (!search || props?.page === 'shows') return null

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

  const router = useRouter()
  const handleRouteInternal = (url) => {
    void router.push(url)
  }
  const commandMenuOpenSet = useStore.use.commandMenuOpenSet()

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

  const searchProps = {
    searchShows: () => setPages([...pages, 'shows']),
    searchPodcasts: () => setPages([...pages, 'podcasts']),
  }

  const { data: _shows } = useSWRImmutable<any>(
    [`/api/v1/cms/shows`],
    (url) => fetcher(url),
    {}
  )
  const shows = _shows?.items?.results
  const { data: _podcasts } = useSWRImmutable<any>(
    [`/api/v1/cms/podcasts`],
    (url) => fetcher(url),
    {}
  )
  const podcasts = _podcasts?.items?.results
  const items = React.useMemo(() => {
    return { podcasts, shows }
  }, [podcasts, shows])

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
      <Command
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
        <div>
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
        </div>
        <CommandInput
          autoFocus
          placeholder="Type a command or search…"
          onValueChange={(value) => {
            setInputValue(value)
          }}
        />
        <CommandLoader cmdk-loader="" />
        <CommandList css={{ maxHeight: '100%', '@bp1': { maxHeight: '400px' } }}>
          {activePage === 'home' && (
            <Home
              // searchSettings={() => setPages([...pages, 'settings'])}
              {...searchProps}
            />
          )}
          {activePage === 'shows' && (
            <ListDynamic icon={<Icon.Star />} routeType="shows" />
          )}
          <ListSubItems
            icon={<Icon.Star />}
            items={items?.shows}
            page={activePage}
            routeType="shows"
            handleRouteInternal={handleRouteInternal}
            commandMenuOpenSet={commandMenuOpenSet}
          />
          {activePage === 'podcasts' && (
            <ListDynamic icon={<Icon.Microphone />} routeType="podcasts" />
          )}
          <ListSubItems
            icon={<Icon.Microphone />}
            items={items?.podcasts}
            page={activePage}
            routeType="podcasts"
            handleRouteInternal={handleRouteInternal}
            commandMenuOpenSet={commandMenuOpenSet}
          />
          {/* {menuPages?.map((item) => {
            const { icon, id, hasSubItems } = item
            if (hasSubItems) {
              console.dir(`hasSubItems: ${id} (${icon})`)
              const _items = items[id]
              console.dir(`_items`)
              console.dir(_items)
              _items?.map((_item) => {
                const { id, properties } = _item
                const { slug, title } = properties
                console.dir(`_item`)
                console.dir(_item)
                return (
                  <SubItemTest
                    key={`cmd-sub-item-${id}`}
                    onSelect={() => {
                      handleRouteInternal(`/${id}/${slug}`)
                      commandMenuOpenSet()
                    }}
                    page={activePage}
                    value={title}
                  >
                    <Flex gap="3">
                      {icon}
                      {title}
                    </Flex>
                  </SubItemTest>
                )
              })
              // return <SubItems key={`sub-item--${id}`} icon={icon} routeType={id} />
            }
            return null
          })} */}

          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    </Box>
  )
}

/* eslint-disable @typescript-eslint/ban-types */
const Home = ({
  searchPodcasts,
  searchShows,
}: {
  searchPodcasts: Function
  searchShows: Function
}) => {
  const router = useRouter()

  const handleRouteInternal = (url) => {
    void router.push(url)
  }

  const commandMenuOpenSet = useStore.use.commandMenuOpenSet()

  return (
    <>
      <CommandGroup heading="Search">
        <CommandMenuItem
          onSelect={() => {
            searchShows()
          }}
          value="search-shows"
        >
          <Flex gap="3">
            <Icon.MagnifyingGlass />
            Shows…
          </Flex>
        </CommandMenuItem>
        <CommandMenuItem
          onSelect={() => {
            searchPodcasts()
          }}
          value="search-podcasts"
        >
          <Flex gap="3">
            <Icon.MagnifyingGlass />
            Podcasts…
          </Flex>
        </CommandMenuItem>
      </CommandGroup>
      <CommandGroup heading="Pages">
        {menuPages?.map((item) => {
          const { icon, id } = item
          const title = _title(id)
          const url = id === 'homepage' ? '' : id
          return (
            <CommandMenuItem
              key={id}
              value={id}
              onSelect={() => {
                handleRouteInternal(`/${url}`)
                commandMenuOpenSet()
              }}
            >
              <Flex gap="3">
                {icon}
                {title}
              </Flex>
            </CommandMenuItem>
          )
        })}
      </CommandGroup>
      <CommandGroup heading="Settings">
        <Settings />
      </CommandGroup>
    </>
  )
}

export { CommandMenuData }
