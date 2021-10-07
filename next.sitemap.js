// eslint-disable-next-line @typescript-eslint/no-var-requires
const _replace = require('lodash/replace')

const sites = {
  'jerandky.com': {
    excludes: [
      '/en/blog',
      '/en/blog/*',
      '/en/colophon',
      '/en/colophon/*',
      '/en/comedy',
      '/en/comedy/*',
      '/en/music',
      '/en/music/*',
      '/en/shows',
      '/en/shows/*',
      //
      '/blog',
      '/blog/*',
      '/colophon',
      '/colophon/*',
      '/comedy',
      '/comedy/*',
      '/music',
      '/music/*',
      '/shows',
      '/shows/*',
    ],
    siteUrl: 'https://jerandky.com',
  },
  'jeromefitzgerald.com': {
    excludes: [
      '/en/episodes',
      '/en/episodes/*',
      '/en/people',
      '/en/people/*',
      // @note(sitemap) turn off episodes for the moment
      '/en/podcasts/*/*',
      '/en/users',
      '/en/users/*',
      '/en/venues',
      '/en/venues/*',
      '/playground',
      '/playground/*',
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

module.exports = {
  changefreq: 'weekly',
  exclude: [...excludes],
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
