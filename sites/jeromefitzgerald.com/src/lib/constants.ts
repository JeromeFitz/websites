const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development'

const API = `api/v1`

const BASE_URL = `https://jeromefitzgerald.com`

const HOST =
  isDev && !isBuildStep
    ? `http://localhost:3000`
    : process.env.VERCEL_ENV === 'production'
    ? BASE_URL
    : !!process.env.VERCE_URL
    ? `https://${process.env.VERCEL_URL}`
    : BASE_URL
const HOST_API = `${HOST}/${API}`
const HOST_APIS = {
  CMS: `${HOST_API}/cms`,
  IMG: `${HOST_API}/img`,
  MUSIC: `${HOST_API}/music`,
  OG: `${HOST_API}/og`,
}

/**
 * @hack(notion) eek, until we rework this whole ..
 * ... undocumented stuff to get data from Notion haha
 */
const GENERATE = {
  events: [
    // ['2023'],
    // ['2023', '01'],
    // ['2023', '01', '21'],
    ['2023', '01', '21', 'jerome-and'],
    // ['2023'],
    // ['2023', '02'],
    // ['2023', '02', '24'],
    ['2023', '02', '24', 'jerome-and'],
    // ['2023'],
    // ['2023', '03'],
    // ['2023', '03', '24'],
    ['2023', '03', '24', 'arcade-hootenanny'],
    ['2023', '03', '24', 'jerome-and'],
    ['2023', '03', '31', 'the-playlist'],
    ['2023', '04', '15', 'arcade-hootenanny'],
    ['2023', '04', '29', 'the-playlist'],
    ['2023', '05', '27', 'the-playlist'],
  ],
  pages: [['about'], ['books'], ['colophon'], ['contact'], ['homepage']],
  podcasts: [['jer-and-ky'], ['knockoffs']],
  shows: [
    ['alex-o-jerome'],
    ['boo-humbag'],
    ['bubble-boy-the-musical'],
    ['jer-and-ky'],
    ['jerome-and'],
    ['jfle'],
    ['jfle-take-broadway'],
    ['justin-and-jerome-experience'],
    ['my-dinner-with-andre-the-musical'],
    ['the-death-show'],
    ['the-playlist'],
    ['warp-zone'],
  ],
}

const ROOTS = Object.keys(GENERATE)
  .map((i) => {
    return i !== 'pages' && `/${i}`
  })
  .flat()

const SLUGS = Object.keys(GENERATE)
  .map((i) => {
    return i === 'pages'
      ? GENERATE[i].map((item) => `/${item.join('/')}`)
      : GENERATE[i].map((item) => `/${i}/${item.join('/')}`)
  })
  .flat()

const GENERATED = ROOTS.concat(SLUGS)
  .filter(function (el) {
    return el != ''
  })
  .sort()

export { API, BASE_URL, GENERATE, GENERATED, HOST, HOST_API, HOST_APIS }
