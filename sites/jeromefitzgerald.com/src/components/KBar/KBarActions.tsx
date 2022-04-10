// import { TicketIcon } from '@heroicons/react/outline'
import { Box, Flex } from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
// import { cssIconHeroToRadix } from '@jeromefitz/shared/src/lib/constants'
// import { parseISO } from 'date-fns'
// import { format } from 'date-fns-tz'
import { useKBar, Priority } from 'kbar'
import _pick from 'lodash/pick'
import { fetcher } from 'next-notion/src/lib/fetcher'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import * as React from 'react'
import useSWRImmutable from 'swr/immutable'
import { useSound } from 'use-sound'

import { RightSlot } from '~components/AppBar/Menu.styles'
import { navigation } from '~config/navigation'
import useStore from '~store/useStore'

const KBarActions = () => {
  const kbar = useKBar()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  // const toasts = useToast()
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
    audioToggle()
  }, [audio, audioToggle, playDisableSound, playEnableSound])

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
          priority: section?.priority ?? Priority.LOW,
          shortcut: section?.shortcut,
          subtitle: section?.subtitle,
          section: ['social', 'settings'].includes(section.id.toLocaleLowerCase())
            ? 'Social & Settings'
            : 'Next Event',
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
    const registerActions = getRegisterActions(navigationStatic)
    kbar.query.registerActions(registerActions)
    // @note(hooks) only execute once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  React.useEffect(() => {
    const data = []
    data.push({
      id: 'settings-audio',
      title: audio ? 'Toggle Sound Off' : 'Toggle Sound On',
      url: '/',
      icon: navigationStatic.settings.items[0].icons[audio.toString()],
      keywords: 'Sound Off On',
      shortcut: ['t', 'a'],
      // subtitle: '‎',
      subtitle: null,
      type: 'audio',
    })
    data.push({
      id: 'settings-theme',
      title: theme === 'light' ? 'Toggle Theme to Dark' : 'Toggle Theme to Light',
      url: '/',
      icon: navigationStatic.settings.items[1].icons[theme],
      keywords: 'Theme Light Dark Off On',
      shortcut: ['t', 't'],
      // subtitle: '‎',
      subtitle: null,
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
        const { rollupShows__Tags, seoKeywords, slug, title } = properties
        const keywordsArr = slug.split('-')
        if (seoKeywords) {
          keywordsArr.push(seoKeywords)
        }
        const keywords = keywordsArr.join(' ')

        data.push({
          icon:
            navigationStatic.shows.iconKbarOverride ?? navigationStatic.shows.icon,
          id: slug,
          // keywords: slug.split('-').join(' '),
          keywords,
          subtitle: rollupShows__Tags.join(', '),
          // title: `${title} *`,
          title,
          type: 'url.internal',
          url: `/shows/${slug}`,
        })
      })
    data.push(navigation.shows.items[5])
    // console.dir(`navigation.shows.items[5]`)
    // console.dir(navigation.shows.items[5])
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
  // const { data: _e } = useSWRImmutable<any>(
  //   [`/api/v1/cms/events`],
  //   (url) => fetcher(url),
  //   {}
  // )
  // React.useEffect(() => {
  //   // console.dir(`useEffect: _e => `)
  //   const items = _e?.items?.results ?? []
  //   const data = []
  //   !!items &&
  //     items.map((item) => {
  //       const { properties } = item

  //       const { dateEvent, seoKeywords, slug, title } = properties

  //       const iso = parseISO(dateEvent?.start)
  //       const date = format(iso, `EEEE MM/dd hh:mma z`)
  //       const dateRoute = format(iso, `yyyy/MM/dd`)

  //       const keywordsArr = slug.split('-')
  //       if (seoKeywords) {
  //         keywordsArr.push(seoKeywords)
  //       }
  //       const keywords = keywordsArr.join(' ')

  //       data.push({
  //         icon: <TicketIcon className="hi2ri" style={cssIconHeroToRadix} />,
  //         id: slug,
  //         keywords,
  //         subtitle: date,
  //         // title: `${title} *`,
  //         title,
  //         type: 'url.internal',
  //         url: `/events/${dateRoute}/${slug}`,
  //       })
  //     })
  //   data.push(navigation.events.items[1])
  //   // console.dir(`navigation.events.items[1]`)
  //   // console.dir(navigation.events.items[1])
  //   // data.push({
  //   //   id: 'events',
  //   //   title: 'Events',
  //   //   url: '/events',
  //   //   rightSlot: 'View All',
  //   //   icon: <CalendarIcon />,
  //   //   keywords: 'Events',
  //   //   // subtitle: 'Listing page for all Events',
  //   //   type: 'url.internal',
  //   // })

  //   const navigationType = 'events'
  //   const navigationTemp = _pick(navigation, [navigationType])
  //   const navigationData = Object.assign(
  //     {},
  //     {
  //       [navigationType]: {
  //         ...navigationTemp[navigationType],
  //         items: data,
  //       },
  //     }
  //   )
  //   const registerActions = getRegisterActions(navigationData)
  //   kbar.query.registerActions(registerActions)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [_e])

  return null
}

export { KBarActions }
