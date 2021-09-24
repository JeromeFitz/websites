const getStaticPathsCatchAll = () => {
  const paths = []
  paths.push(
    // '/blog',
    '/colophon',
    // '/events',
    // '/events/2021',
    // '/events/2021/09',
    // '/events/2021/09/09',
    // '/events/2021/09/09/the-playlist',
    '/podcasts',
    '/podcasts/jer-and-ky-and-guest',
    '/podcasts/knockoffs',
    '/shows',
    '/shows/alex-o-jerome',
    '/shows/boo-humbag',
    '/shows/bubble-boy-the-musical',
    '/shows/jer-and-ky',
    '/shows/jerome-and',
    '/shows/jfle-take-broadway',
    '/shows/jfle',
    '/shows/justin-and-jerome-experience',
    '/shows/my-dinner-with-andre-the-musical',
    '/shows/the-death-show',
    '/shows/the-playlist'
    //
  )

  return {
    paths,
    fallback: true,
  }
}

export default getStaticPathsCatchAll
