import { BookOpenIcon, MusicNoteIcon, TicketIcon } from '@heroicons/react/outline'
import { useToast } from '@jeromefitz/design-system/components'
// import type { Event, Show } from '@jeromefitz/notion/schema'
import {
  CalendarIcon,
  EnvelopeOpenIcon,
  GearIcon,
  GitHubLogoIcon,
  HomeIcon,
  IdCardIcon,
  ImageIcon,
  Link1Icon,
  ListBulletIcon,
  MoonIcon,
  // Pencil2Icon,
  Share1Icon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  StarIcon,
  SunIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import { useKBar } from 'kbar'
import type { Action } from 'kbar'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import * as React from 'react'
import useSWRImmutable from 'swr/immutable'
import { useSound } from 'use-sound'

import { navigation } from '~config/navigation'
import { useUI } from '~context/UI'
import fetcher from '~lib/fetcher'

interface IAction extends Action {
  url?: string
}

// const trimHttp = (str) => {
//   return str.replace(/https?:\/\//, '')
// }
const getAccountHandle = (str) => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return `@` + str.split('/')[str.split('/').length - 1]
}

const cssIconHeroToRadix = {
  marginTop: '3px',
}

/**
 * @todo(kbar) put into configuration file
 */
const meta = {
  links: {
    email: 'j@jeromefitzgerald.com',
    github: 'https://github.com/JeromeFitz',
    instagram: 'https://instagram.com/JeromeFitz',
    twitter: 'https://twitter.com/JeromeFitz',
    linkedIn: 'https://www.linkedin.com/in/jeromefitzgerald',
  },
}

const parents = {
  events: 'events',
  shows: 'shows',
  settings: 'settings',
  social: 'social',
}

const sections = {
  settings: '',
  social: '',
  other: '',
}

const KBarActionsOLD = () => {
  const kbar = useKBar()
  const router = useRouter()
  const { setTheme } = useTheme()
  const toasts = useToast()
  const { setAudioDisable, setAudioEnable } = useUI()

  const handleToastInfo = (path) => {
    if (toasts && toasts.current) {
      toasts.current.message({
        duration: 2000,
        text: `Route change: ${path}`,
        type: 'default',
      })
    }
  }

  const handleThemeSet = React.useCallback(
    (theme) => {
      document.documentElement.style.setProperty('color-scheme', theme)
      setTheme(theme)
    },
    [setTheme]
  )

  const [playEnableSound] = useSound('/static/audio/enable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })

  const [playDisableSound] = useSound('/static/audio/disable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })

  const handleAudioSet = React.useCallback(
    (flag) => {
      flag ? playEnableSound() : playDisableSound()
      flag ? setAudioEnable() : setAudioDisable()
    },
    [playDisableSound, playEnableSound, setAudioDisable, setAudioEnable]
  )

  const { data: _e } = useSWRImmutable<any>(
    [`/api/v1/cms/events`],
    (url) => fetcher(url),
    {}
  )
  const eventsItems = _e?.items?.results ?? []

  const { data: _s } = useSWRImmutable<any>(
    [`/api/v1/cms/shows`],
    (url) => fetcher(url),
    {}
  )
  const showsItems = _s?.items?.results ?? []

  React.useEffect(() => {
    /**
     * @actions
     * @todo put this _outside_ the component when production time
     */
    const _actions: IAction[] = [
      {
        id: 'home',
        icon: <HomeIcon />,
        name: 'Home',
        shortcut: ['j', 'h'],
        subtitle: '‎',
        keywords: 'Dip Set',
        url: '/',
      },
      // {
      //   id: 'blog',
      //   icon: <Pencil2Icon />,
      //   name: 'Blog',
      //   shortcut: ['j', 'b'],
      //   keywords: 'Byrd Gang',
      //   url: '/blog',
      // },
      {
        id: 'about',
        icon: <IdCardIcon />,
        name: 'About',
        shortcut: ['j', 'a'],
        subtitle: '‎',
        keywords: 'About Jerome',
        url: '/about',
      },
      {
        id: 'books',
        icon: <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix} />,
        name: 'Books',
        shortcut: ['j', 'b'],
        subtitle: '‎',
        keywords: 'books reading',
        url: '/books',
      },
      {
        id: 'music',
        icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />,
        name: 'Music',
        shortcut: ['j', 'm'],
        subtitle: '‎',
        keywords: 'music',
        url: '/music',
      },
    ]

    /**
     * @default
     * @todo make dynamic from existing cache from build
     *       that gives us the whole sitemap basically
     */
    const actions = _actions.map((action) => {
      return {
        ...action,
        perform: () => {
          if (!!action?.url) {
            void handleToastInfo(action.url)
            void router.push(action.url)
          }
        },
      }
    })
    kbar.query.registerActions(actions)

    /**
     * @events
     */
    const events = []
    !!eventsItems &&
      eventsItems.map((item) => {
        const { id, properties } = item
        const { dateEvent, slug, title } = properties

        const iso = parseISO(dateEvent?.start)
        const date = format(iso, `EEEE MM/dd hh:mma z`)
        const dateRoute = format(iso, `yyyy/MM/dd`)
        events.push({
          id: `kbar-events-${id}`,
          name: title,
          // subtitle: id,
          subtitle: date,
          // subtitle: (
          //   <React.Fragment key={`kbar-events-${id}`}>
          //     {rollupShows__Tags.map((tag) => {
          //       return (
          //         <Badge
          //           css={{ mr: '$1' }}
          //           key={`kbar-events-${id}-badge-${tag}`}
          //           size="2"
          //           variant="violet"
          //         >
          //           {tag}
          //         </Badge>
          //       )
          //     })}
          //   </React.Fragment>
          // ),
          keywords: slug.split('-').join(' '),
          perform: () => {
            const url = `/events/${dateRoute}/${slug}`
            void handleToastInfo(url)
            void router.push(url)
          },
          icon: <CalendarIcon />,
          parent: parents.events,
        })
      })
    // @hack(kbar) remember to add the listing itself
    events.push({
      id: `kbar-events-view-all`,
      name: 'View All Events',
      subtitle: 'Go to listing page for Events',
      keywords: 'view all events',
      perform: () => {
        const url = `/events`
        void handleToastInfo(url)
        void router.push(url)
      },
      icon: <ListBulletIcon />,
      parent: parents.events,
    })
    kbar.query.registerActions([
      {
        id: parents.events,
        icon: <CalendarIcon />,
        name: 'Events',
        shortcut: ['j', 'e'],
        keywords: 'Events',
        subtitle: '‎',
      },
      /**
       * @hack `subtitle` accepts string not JSX.element
       *        so this is a no no :X
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...events,
    ])

    /**
     * @shows
     */
    const shows = []
    !!showsItems &&
      showsItems.map((item) => {
        const {
          id,
          // icon: { emoji },
          properties,
        } = item
        const { rollupShows__Tags, slug, title } = properties
        shows.push({
          id: `kbar-shows-${id}`,
          name: title,
          // subtitle: id,
          subtitle: rollupShows__Tags.join(', '),
          // subtitle: (
          //   <React.Fragment key={`kbar-shows-${id}`}>
          //     {rollupShows__Tags.map((tag) => {
          //       return (
          //         <Badge
          //           css={{ mr: '$1' }}
          //           key={`kbar-shows-${id}-badge-${tag}`}
          //           size="2"
          //           variant="violet"
          //         >
          //           {tag}
          //         </Badge>
          //       )
          //     })}
          //   </React.Fragment>
          // ),
          keywords: slug.split('-').join(' '),
          perform: () => {
            const url = `/shows/${slug}`
            void handleToastInfo(url)
            void router.push(url)
          },
          icon: <StarIcon />,
          // icon: (
          //   <Text css={{ fontSize: '1.75rem' }}>
          //     {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          //     {/* @ts-ignore */}
          //     <Emoji character={emoji} margin={true} />
          //   </Text>
          // ),
          parent: parents.shows,
        })
      })
    // @hack(kbar) remember to add the listing itself
    shows.push({
      id: `kbar-shows-view-all`,
      name: 'View All Shows',
      subtitle: 'Go to listing page for Shows',
      keywords: 'view all shows',
      perform: () => {
        const url = `/shows`
        void handleToastInfo(url)
        void router.push(url)
      },
      icon: <ListBulletIcon />,
      parent: parents.shows,
    })
    kbar.query.registerActions([
      {
        id: parents.shows,
        icon: <TicketIcon className="hi2ri" style={cssIconHeroToRadix} />,
        name: 'Shows',
        keywords: 'Shows',
        shortcut: ['j', 's'],
        subtitle: '‎',
      },
      /**
       * @hack `subtitle` accepts string not JSX.element
       *        so this is a no no :X
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...shows,
    ])

    /**
     * @settings
     */
    kbar.query.registerActions([
      {
        id: parents.settings,
        name: 'Settings',
        section: sections.other,
        subtitle: '‎',
        icon: <GearIcon />,
      },
      {
        id: 'settings-theme-light',
        name: 'Set Theme to Light',
        keywords: 'set change theme light',
        perform: () => handleThemeSet('light'),
        icon: <SunIcon />,
        parent: parents.settings,
        shortcut: ['t', 'l'],
        subtitle: '‎',
      },
      {
        id: 'settings-theme-dark',
        name: 'Set Theme to Dark',
        keywords: 'set change theme dark',
        perform: () => handleThemeSet('dark'),
        icon: <MoonIcon />,
        parent: parents.settings,
        shortcut: ['t', 'd'],
        subtitle: '‎',
      },
      {
        id: 'settings-audio-on',
        name: 'Turn Sound On',
        keywords: 'turn change audio on',
        perform: () => handleAudioSet(true),
        icon: <SpeakerModerateIcon />,
        parent: parents.settings,
        shortcut: ['a', 'e'],
        subtitle: '‎',
      },
      {
        id: 'settings-audio-off',
        name: 'Turn Sound Off',
        keywords: 'turn change audio off',
        perform: () => handleAudioSet(false),
        icon: <SpeakerOffIcon />,
        parent: parents.settings,
        shortcut: ['a', 'd'],
        subtitle: '‎',
      },
    ])

    /**
     * @social
     */
    kbar.query.registerActions([
      {
        id: parents.social,
        name: 'Social',
        section: sections.other,
        icon: <Share1Icon />,
        subtitle: '‎',
      },
      {
        id: 'social-email',
        name: 'Email',
        subtitle: meta.links.email,
        keywords: 'social email',
        parent: parents.social,
        perform: () => window.open(meta.links.email),
        icon: <EnvelopeOpenIcon />,
      },
      {
        id: 'social-github',
        name: 'GitHub',
        subtitle: getAccountHandle(meta.links.github),
        keywords: 'social github',
        parent: parents.social,
        perform: () => window.open(meta.links.github, '_blank'),
        icon: <GitHubLogoIcon />,
      },
      {
        id: 'social-instagram',
        name: 'Instagram',
        subtitle: getAccountHandle(meta.links.instagram),
        keywords: 'social instagram',
        parent: parents.social,
        perform: () => window.open(meta.links.instagram, '_blank'),
        icon: <ImageIcon />,
      },
      {
        id: 'social-linkedIn',
        name: 'LinkedIn',
        subtitle: getAccountHandle(meta.links.linkedIn),
        keywords: 'social linkedIn',
        parent: parents.social,
        perform: () => window.open(meta.links.linkedIn, '_blank'),
        icon: <Link1Icon />,
      },
      {
        id: 'social-twitter',
        name: 'Twitter',
        subtitle: getAccountHandle(meta.links.twitter),
        keywords: 'social twitter',
        parent: parents.social,
        perform: () => window.open(meta.links.twitter, '_blank'),
        icon: <TwitterLogoIcon />,
      },
    ])

    // @refactor(kbar) Change to `useEffectOnce`?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsItems, showsItems])

  return null
}

const KBarActions = () => {
  const kbar = useKBar()
  // const router = useRouter()
  // const { setTheme } = useTheme()
  const toasts = useToast()

  // const actions = _actions.map((action) => {
  //   return {
  //     ...action,
  //     perform: () => {
  //       if (!!action?.url) {
  //         void handleToastInfo(action.url)
  //         void router.push(action.url)
  //       }
  //     },
  //   }
  // })

  const handleToast = (props) => {
    const { title } = props
    if (toasts && toasts.current) {
      toasts.current.message({
        duration: 2000,
        text: `Debug: ${title}`,
        type: 'default',
      })
    }
  }

  React.useEffect(() => {
    const registerActions = []
    Object.keys(navigation).map((k) => {
      const section = navigation[k]
      if (!section?.active) return null
      const settings = section.settings.dropdown

      if (settings.inline) {
        if (section.items) {
          section.items.map((item, itemIdx) => {
            registerActions.push({
              id: `${section.id}-${itemIdx}`,
              icon: item?.iconKbarOverride ?? item?.icon,
              name: item?.title,
              subtitle: item?.subtitle,
              // parent: section.id,
              section:
                section.id.toLowerCase() === 'events'
                  ? itemIdx === 0
                    ? 'Next Event'
                    : 'Routes'
                  : section.id,
              keywords: item?.keywords,
              //
              perform: () => {
                void handleToast({ title: `(items) ${item?.title} (${section.id})` })
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
          subtitle: section?.subtitle,
          section: ['social', 'settings'].includes(section.id.toLocaleLowerCase())
            ? 'Social & Settings'
            : null,
          // //
          // perform: () => {
          //   void handleToast({ title: `(parent) ${section?.title} (${section.id})` })
          // },
        })

        if (section.items) {
          section.items.map((item, itemIdx) => {
            registerActions.push({
              id: `${section.id}-${itemIdx}`,
              icon: item?.iconKbarOverride ?? item?.icon,
              name: item?.title,
              subtitle: item?.subtitle,
              parent: section.id,
              keywords: item?.keywords,
              //
              perform: () => {
                void handleToast({
                  title: `(items) ${item?.title} (${section.id})`,
                })
              },
            })
          })
        }
      }
    })

    kbar.query.registerActions(registerActions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export { KBarActions, KBarActionsOLD }
