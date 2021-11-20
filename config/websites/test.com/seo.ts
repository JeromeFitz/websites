const nextSeo = {
  sitename: 'test[com]',
  title: 'test[com] | dev ',
  description: 'test[com] is a site that should not see the light of day please.',
  url: 'https://test.com',
  twitter: '@JeromeFitz',
}

const sitemapExcludes = [
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
]

export { nextSeo, sitemapExcludes }
