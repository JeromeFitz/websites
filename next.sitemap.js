// eslint-disable-next-line @typescript-eslint/no-var-requires
const _replace = require('lodash/replace')

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
  exclude: [
    '/en/episdoes/*',
    '/en/episodes',
    '/en/people',
    '/en/people/*',
    '/en/person/*',
    '/en/users',
    '/en/users/*',
    '/en/venues',
    '/en/venues/*',
    '/events',
    '/events/*',
    '/playground',
  ],
  generateRobotsTxt: true,
  siteUrl: 'https://jeromefitzgerald.com',
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
