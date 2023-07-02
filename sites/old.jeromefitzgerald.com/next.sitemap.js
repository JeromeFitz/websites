const _replace = require('lodash/replace')

/**
 * @hack see: ~config/seo
 */
const configInlineBecauseThisIsOldJS = {
  excludes: [
    'api/crypted',
    // 'blog',
    // 'books',
    // 'colophon',
    'encrypted',
    'episodes',
    // 'events',
    // 'music',
    'people',
    'playground',
    'podcasts/*',
    // 'shows',
    'testing',
    'users',
    'venues',
  ],
  siteUrl: 'https://jeromefitzgerald.com',
}

const { excludes, siteUrl } = configInlineBecauseThisIsOldJS

const removeEn = (config, url) => {
  // console.dir(`url: ${url}`)
  // console.dir(config)

  let changefreq = config.changefreq
  let priority = config.priority

  if (url === '/') {
    priority = '1.0'
  }

  if (
    url.includes('blog') ||
    // url.includes('events/2023') ||
    url.includes('events/2022') ||
    url.includes('events/2021') ||
    url.includes('events/2020')
  ) {
    changefreq = 'weekly'
    priority = '0.5'
  }

  return {
    loc: _replace(url, '/en/', ''),
    changefreq,
    priority,
    // lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }
}

const getExcludes = (excludes) => {
  const _excludes = []
  excludes.map((e) => {
    // _excludes.push(`/${e}/**/*`)
    _excludes.push(`/${e}/*`)
    _excludes.push(`/${e}`)
    // _excludes.push(`/en/${e}/**/*`)
    _excludes.push(`/en/${e}/*`)
    _excludes.push(`/en/${e}`)
  })
  return _excludes
}

const paths = ['', 'events', 'podcasts', 'shows']
const additionalPaths = async (config) => {
  const result = []

  paths.map(async (p) => result.push(await config.transform(config, `/${p}`)))

  return result
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  additionalPaths,
  changefreq: 'weekly',
  exclude: getExcludes(excludes),
  generateRobotsTxt: true,
  priority: 0.7,
  sitemapSize: 5000,
  siteUrl,
  transform: (config, url) => {
    return removeEn(config, url)
  },
}

// export default config
module.exports = config
