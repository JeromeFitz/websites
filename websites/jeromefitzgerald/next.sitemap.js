// eslint-disable-next-line @typescript-eslint/no-var-requires
const _replace = require('lodash/replace')

// const { nextSeo, sitemapExcludes } = require('./config/websites/index')
// const excludes = sitemapExcludes
// const siteUrl = nextSeo.url

const sites = {
  'jerandky.com': {
    excludes: [
      'blog',
      'books',
      'colophon',
      'episodes',
      'events',
      'music',
      'people',
      'playground',
      // 'podcasts/*/**',
      'refactor',
      'shows',
      'users',
      'venues',
    ],
    siteUrl: 'https://jerandky.com',
  },
  'jeromefitzgerald.com': {
    excludes: [
      // 'blog',
      // 'books',
      // 'colophon',
      'episodes',
      // 'events',
      // 'music',
      'people',
      'playground',
      'podcasts/*/**',
      'refactor',
      // 'shows',
      'users',
      'venues',
    ],
    siteUrl: 'https://jeromefitzgerald.com',
  },
}

const { excludes, siteUrl } = sites[process.env.NEXT_PUBLIC__SITE]

const removeEn = (config, url) => {
  // console.dir(`url: ${url}`)
  return {
    loc: _replace(url, '/en', ''),
    // changefreq: config.changefreq,
    // priority: config.priority,
    // lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }
}

const getExcludes = (excludes) => {
  const _excludes = []
  excludes.map((e) => {
    _excludes.push(`/${e}/*`)
    _excludes.push(`/${e}`)
    _excludes.push(`/en/${e}/*`)
    _excludes.push(`/en/${e}`)
  })
  return _excludes
}

const config = {
  changefreq: 'weekly',
  exclude: getExcludes(excludes),
  generateRobotsTxt: true,
  siteUrl,
  sites,
  transform: (config, url) => {
    return removeEn(config, url)
    // // custom function to ignore the url
    // if (customIgnoreFunction(url)) {
    //   return null
    // }

    // // only create changefreq along with url
    // // returning partial properties will result in generation of XML field with only returned values.
    // if (customLimitedField(url)) {
    //   // This returns `url` & `changefreq`. Hence it will result in the generation of XML field with `url` and  `changefreq` properties only.
    //   return {
    //     loc: url,
    //     changefreq: 'weekly',
    //   }
    // }

    // // Use default transformation for all other cases
    // return {
    //   loc: url,
    //   changefreq: config.changefreq,
    //   priority: config.priority,
    //   lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    // }
  },
}

// export default config
module.exports = config
