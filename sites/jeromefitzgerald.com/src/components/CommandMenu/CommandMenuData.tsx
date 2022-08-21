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
  // CommandItem,
  CommandMenuItem,
  Flex,
  Icon,
} from '@jeromefitz/design-system'
import { useRouter } from 'next/router'
import React from 'react'
import _title from 'title'

import useStore from '~store/useStore'

import { ListDynamic } from './ListDynamic'
import { Settings } from './Settings'

/**
 * @todo(cmdk) come on dood, haha
 */
const menuPages = [
  { id: 'about', icon: <Icon.IdCard /> },
  { id: 'books', icon: <Icon.BookOpen /> },
  { id: 'colophon', icon: <Icon.InfoCircled /> },
  { id: 'events', icon: <Icon.Calendar /> },
  { id: 'homepage', icon: <Icon.Home /> },
  { id: 'music', icon: <Icon.MusicNote /> },
  { id: 'podcasts', icon: <Icon.Microphone /> },
  { id: 'shows', icon: <Icon.Star /> },
]

function CommandMenuData() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = React.useState('')

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
              searchShows={() => setPages([...pages, 'shows'])}
              searchPodcasts={() => setPages([...pages, 'podcasts'])}
            />
          )}
          {activePage === 'shows' && (
            <ListDynamic icon={<Icon.Star />} routeType="shows" />
          )}
          {activePage === 'podcasts' && (
            <ListDynamic icon={<Icon.Microphone />} routeType="podcasts" />
          )}
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    </Box>
  )
}

/* eslint-disable @typescript-eslint/ban-types */
function Home({
  searchPodcasts,
  searchShows,
}: {
  searchPodcasts: Function
  searchShows: Function
}) {
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
