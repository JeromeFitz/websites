const _replace = require('lodash/replace')

/**
 * @hack see: ~config/seo
 */
const configInlineBecauseThisIsOldJS = {
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
    // 'shows',
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
    url.includes('events/2022') ||
    url.includes('events/2021') ||
    url.includes('events/2020')
  ) {
    changefreq = 'weekly'
    priority = '0.5'
  }

  return {
    loc: _replace(url, '/en', ''),
    changefreq,
    priority,
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

/** @type {import('next-sitemap').IConfig} */
const config = {
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
