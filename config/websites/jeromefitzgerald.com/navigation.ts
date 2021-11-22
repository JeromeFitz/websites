const isDev = process.env.NODE_ENV === 'development'

const navigationHeader = {
  dev: [
    {
      active: isDev,
      emoji: '▶️',
      url: '/playground',
      title: 'P',
      text: 'Playground',
    },
    {
      active: isDev,
      emoji: '🛁️',
      url: '/playground/kitchen-sink',
      title: 'KS',
      text: 'Kithcen Sink',
    },
    {
      active: isDev,
      emoji: '⏸️',
      url: '/playground/loading',
      title: 'L',
      text: 'Loading',
    },

    {
      active: isDev,
      emoji: '🟧️',
      url: '/playground/grid',
      title: 'G',
      text: 'Grid',
    },
  ],
  links: [
    {
      active: true,
      emoji: '🗓️',
      url: '/events',
      title: 'Upcoming Events',
      text: 'Live on Stage',
    },
    {
      active: true,
      emoji: '📚️',
      url: '/books',
      title: 'Books',
      text: 'Currently Reading',
    },
    {
      active: true,
      emoji: '🎹️',
      url: '/music',
      title: 'Music',
      text: 'Currently Listening To',
    },
  ],
  popover: [
    {
      active: true,
      emoji: '🤮️',
      url: '/shows/alex-o-jerome',
      title: 'AOJ',
      text: 'Alex O’Jerome',
    },
    {
      active: true,
      emoji: '🐭️',
      url: '/shows/jfle',
      title: 'JFLE',
      text: 'Jerome & Jesse LE',
    },
    {
      active: true,
      emoji: '😆️',
      url: '/shows/justin-and-jerome-experience',
      title: 'JJE',
      text: 'Justin & Jerome Experience',
    },
    {
      active: true,
      emoji: '🎭️',
      url: '/shows',
      title: 'View All',
      text: 'Improv, Musical, Sketch...',
    },
  ],
}

export { navigationHeader }
