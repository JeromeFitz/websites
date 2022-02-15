import { TicketIcon } from '@heroicons/react/outline'
import { Box, Flex } from '@jeromefitz/design-system/components'
import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'
import {
  MoonIcon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  StarIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import { useKBar } from 'kbar'
import _pick from 'lodash/pick'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import * as React from 'react'
import useSWRImmutable from 'swr/immutable'
import { useSound } from 'use-sound'

import { navigation } from '~config/navigation'
import { useUI } from '~context/UI'
import { cssIconHeroToRadix } from '~lib/constants'
import fetcher from '~lib/fetcher'

const RightSlot = styled('div', {
  verticalAlign: 'center',
  display: 'inline-flex',
  marginLeft: 'auto',
  marginRight: '$1',
  paddingLeft: 16,
  color: '$colors$slate11',
  ':focus > &': { color: '$colors$hiContrast' },
  '[data-disabled] &': { color: '$colors$slate8' },
})

const KBarActions = () => {
  const kbar = useKBar()
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
   * @note for each picked section move to different useEffect
   * @refactor create a `type` to filter by instead please
   */
  const navigationStatic = _pick(navigation, [
    'events', // load default incase swr data return breaks
    'shows', // load default incase swr data return breaks
    'podcasts',
    'pages',
    'social',
    'settings',
  ])
  // const navigationSettings = _pick(navigation, ['settings'])

  const getRegisterActions = (data) => {
    const registerActions = []
    Object.keys(data).map((k) => {
      const section = data[k]
      if (!section?.active) return null
      const { items } = section
      const settings = section.settings.dropdown

      if (settings.inline) {
        if (items) {
          // @hack(kbar) next event needs itemIdx for now
          items.map((item, itemIdx) => {
            registerActions.push({
              id: `${section.id}-${item.id}`,
              icon: item?.iconKbarOverride ?? item?.icon,
              name: item?.title,
              subtitle: item?.subtitle,
              // subtitle: `${section.id}-${item.id}`,
              // parent: section.id,
              section:
                section.id.toLowerCase() === 'events'
                  ? itemIdx === 0
                    ? 'Next Event'
                    : 'Routes'
                  : section.id,
              keywords: item?.keywords,
              shortcut: item?.shortcut,
              //
              perform: () => {
                // void handleToast({ title: `(items) ${item?.title} (${section.id})` })
                if (item?.type === 'url.internal' && !!item.url) {
                  void handleRouteInternal(item.url)
                }
                if (item?.type === 'url.external' && !!item.url) {
                  void handleRouteExternal(item.url)
                }
              },
            })
          })
        }
      }

      if (!settings.inline) {
        registerActions.push({
          id: section.id,
          icon: section?.iconKbarOverride ?? section?.icon,
          keywords: section?.keywords,
          name: section?.title,
          shortcut: section?.shortcut,
          subtitle: section?.subtitle,
          section: ['social', 'settings'].includes(section.id.toLocaleLowerCase())
            ? 'Social & Settings'
            : null,
          // //
          // perform: () => {
          //   void handleToast({ title: `(parent) ${section?.title} (${section.id})` })
          // },
        })

        if (items) {
          items.map((item) => {
            const name = item.rightSlot ? (
              <Flex align="center" gap="1" justify="start">
                <Box as="span">{item?.title}</Box>
                <RightSlot>{item.rightSlot}</RightSlot>
              </Flex>
            ) : (
              <Box as="span">{item?.title}</Box>
            )
            registerActions.push({
              id: `${section.id}-${item.id}`,
              icon: item?.iconKbarOverride ?? item?.icon,
              name,
              subtitle: item?.subtitle,
              // subtitle: `${section.id}-${item.id}`,
              parent: section.id,
              keywords: item?.keywords,
              shortcut: item?.shortcut,
              //
              perform: () => {
                // void handleToast({
                //   title: `(items) ${item?.title} (${section.id})`,
                // })
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
              },
            })
          })
        }
      }
    })
    return registerActions
  }

  React.useEffect(() => {
    // console.dir(`useEffect: navigationStatic`)
    const registerActions = getRegisterActions(navigationStatic)
    kbar.query.registerActions(registerActions)
    // @note(hooks) only execute once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  React.useEffect(() => {
    // console.dir(`useEffect: navigationSettings`)
    // console.dir(`audio: ${audio}`)
    // console.dir(`theme: ${theme}`)
    // console.dir(navigationSettings)

    const data = []
    data.push({
      id: 'settings-audio',
      title: 'Toggle Sound',
      url: '/',
      icon: audio ? <SpeakerOffIcon /> : <SpeakerModerateIcon />,
      keywords: 'Sound Off On',
      shortcut: ['t', 'a'],
      subtitle: '‎',
      type: 'audio',
    })
    data.push({
      id: 'settings-theme',
      title: 'Toggle Theme',
      url: '/',
      icon: theme === 'light' ? <MoonIcon /> : <SunIcon />,
      keywords: 'Theme Light Dark Off On',
      shortcut: ['t', 't'],
      subtitle: '‎',
      type: 'theme',
    })

    const navigationType = 'settings'
    const navigationTemp = _pick(navigation, [navigationType])
    const navigationData = Object.assign(
      {},
      {
        [navigationType]: {
          ...navigationTemp[navigationType],
          items: data,
        },
      }
    )
    const registerActions = getRegisterActions(navigationData)
    kbar.query.registerActions(registerActions)
    // @note(hooks) only execute if audio|theme change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, theme])

  /**
   * dynamic: shows
   */
  const { data: _s } = useSWRImmutable<any>(
    [`/api/v1/cms/shows`],
    (url) => fetcher(url),
    {}
  )
  React.useEffect(() => {
    // console.dir(`useEffect: _s => `)
    const items = _s?.items?.results ?? []
    const data = []
    !!items &&
      items.map((item) => {
        const { properties } = item
        const { rollupShows__Tags, slug, title } = properties
        data.push({
          icon: <StarIcon />,
          id: slug,
          keywords: slug.split('-').join(' '),
          subtitle: rollupShows__Tags.join(', '),
          // title: `${title} *`,
          title,
          type: 'url.internal',
          url: `/shows/${slug}`,
        })
      })
    data.push(navigation.shows.items[3])
    // console.dir(`navigation.shows.items[3]`)
    // console.dir(navigation.shows.items[3])
    // data.push({
    //   id: 'view-all-shows',
    //   title: 'View All',
    //   url: '/shows',
    //   icon: <ListBulletIcon />,
    //   subtitle: 'Go to listing pages for Shows',
    //   keywords: 'view all shows',
    //   type: 'url.internal',
    // })

    const navigationType = 'shows'
    const navigationTemp = _pick(navigation, [navigationType])
    const navigationData = Object.assign(
      {},
      {
        [navigationType]: {
          ...navigationTemp[navigationType],
          items: data,
        },
      }
    )
    const registerActions = getRegisterActions(navigationData)
    kbar.query.registerActions(registerActions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_s])

  /**
   * dynamic events
   */
  const { data: _e } = useSWRImmutable<any>(
    [`/api/v1/cms/events`],
    (url) => fetcher(url),
    {}
  )
  React.useEffect(() => {
    // console.dir(`useEffect: _e => `)
    const items = _e?.items?.results ?? []
    const data = []
    !!items &&
      items.map((item) => {
        const { properties } = item

        const { dateEvent, slug, title } = properties

        const iso = parseISO(dateEvent?.start)
        const date = format(iso, `EEEE MM/dd hh:mma z`)
        const dateRoute = format(iso, `yyyy/MM/dd`)
        data.push({
          icon: <TicketIcon className="hi2ri" style={cssIconHeroToRadix} />,
          id: slug,
          keywords: slug.split('-').join(' '),
          subtitle: date,
          // title: `${title} *`,
          title,
          type: 'url.internal',
          url: `/events/${dateRoute}/${slug}`,
        })
      })
    data.push(navigation.events.items[1])
    // console.dir(`navigation.events.items[1]`)
    // console.dir(navigation.events.items[1])
    // data.push({
    //   id: 'events',
    //   title: 'Events',
    //   url: '/events',
    //   rightSlot: 'View All',
    //   icon: <CalendarIcon />,
    //   keywords: 'Events',
    //   // subtitle: 'Listing page for all Events',
    //   type: 'url.internal',
    // })

    const navigationType = 'events'
    const navigationTemp = _pick(navigation, [navigationType])
    const navigationData = Object.assign(
      {},
      {
        [navigationType]: {
          ...navigationTemp[navigationType],
          items: data,
        },
      }
    )
    const registerActions = getRegisterActions(navigationData)
    kbar.query.registerActions(registerActions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_e])

  return null
}

export { KBarActions }
