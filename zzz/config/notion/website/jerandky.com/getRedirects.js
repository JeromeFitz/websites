/**
 * @note next.config.js cannot handle TypeScript
 */

// const rickRollUrl = 'https://www.youtube.com/watch?v=oHg5SJYRHA0'
const getRedirects = [
  // { source: '/blog/', destination: '/blog' },
  { source: '/events/', destination: '/events' },
  // { source: '/people/', destination: '/people' },
  { source: '/podcasts/', destination: '/podcasts' },
  { source: '/shows/', destination: '/shows' },
  { source: '/work/', destination: '/work' },
  /**
   * @hax0rs: Actually cannot redirect to another site at the moment.
   */
  // { source: '/.env', destination: rickRollUrl },
  // { source: '/admin', destination: rickRollUrl },
  // { source: '/wp-admin', destination: rickRollUrl },
  // { source: '/wp-login.php', destination: rickRollUrl },
  /**
   * wh00ps
   */
  {
    source: '/podcasts/am-i-dracula/s00e01-greg-gillotti',
    destination: '/podcasts/jer-and-ky-and-guest/s01e01--aid--01--greg-gillotti',
  },
  /**
   * oh fuck you Apple wh00ps
   */
  {
    source: '/podcasts/am-i-dracula/s00e01--aid--01--greg-gillotti',
    destination: '/podcasts/jer-and-ky-and-guest/s01e01--aid--01--greg-gillotti',
  },
  {
    source: '/podcasts/am-i-dracula/s00e05--aid--02--sara-kantner',
    destination: '/podcasts/jer-and-ky-and-guest/s01e05--aid--02--sara-kantner',
  },
  {
    source: '/podcasts/am-i-dracula/s00e09--aid--03--nia-johnson',
    destination: '/podcasts/jer-and-ky-and-guest/s01e09--aid--03--nia-johnson',
  },
  {
    source: '/podcasts/am-i-dracula/s00e13--aid--04--beth-glick',
    destination: '/podcasts/jer-and-ky-and-guest/s01e13--aid--04--beth-glick',
  },
  {
    source: '/podcasts/am-i-dracula/s00e17--aid--05--jesse-le',
    destination: '/podcasts/jer-and-ky-and-guest/s01e17--aid--05--jesse-le',
  },
  {
    source: '/podcasts/:slug/s00e02--tab--01--sara-kanter',
    destination: '/podcasts/jer-and-ky-and-guest/s01e02--tab--01--sara-kantner',
  },
  {
    source: '/podcasts/:slug/s00e06--tab--02--nia-johnson',
    destination: '/podcasts/jer-and-ky-and-guest/s01e06--tab--02--nia-johnson',
  },
  {
    source: '/podcasts/:slug/s00e10--tab--03--beth-glick',
    destination: '/podcasts/jer-and-ky-and-guest/s01e10--tab--03--beth-glick',
  },
  {
    source: '/podcasts/:slug/s00e14--tab--04--jesse-le',
    destination: '/podcasts/jer-and-ky-and-guest/s01e14--tab--04--jesse-le',
  },
  {
    source: '/podcasts/:slug/s00e18--tab--05--greg-gillotti',
    destination: '/podcasts/jer-and-ky-and-guest/s01e18--tab--05--greg-gillotti',
  },
  {
    source: '/podcasts/danks-for-the-memories/s00e03--dftm--01--beth-glick',
    destination: '/podcasts/jer-and-ky-and-guest/s01e03--dftm--01--beth-glick',
  },
  {
    source: '/podcasts/danks-for-the-memories/s00e07--dftm--02--nia-johnson',
    destination: '/podcasts/jer-and-ky-and-guest/s01e07--dftm--02--nia-johnson',
  },
  {
    source: '/podcasts/danks-for-the-memories/s00e011--dftm--03--greg-gillotti',
    destination: '/podcasts/jer-and-ky-and-guest/s01e011--dftm--03--greg-gillotti',
  },
  {
    source: '/podcasts/danks-for-the-memories/s00e15--dftm--04--sara-kantner',
    destination: '/podcasts/jer-and-ky-and-guest/s01e15--dftm--04--sara-kantner',
  },
  {
    source: '/podcasts/danks-for-the-memories/s00e19--dftm--05--jesse-le',
    destination: '/podcasts/jer-and-ky-and-guest/s01e19--dftm--05--jesse-le',
  },
  {
    source: '/podcasts/my-favorite-murder-she-wrote/s00e04--mfmsw--01--jesse-le',
    destination: '/podcasts/jer-and-ky-and-guest/s01e04--mfmsw--01--jesse-le',
  },
  {
    source: '/podcasts/my-favorite-murder-she-wrote/s00e08--mfmsw--02--sara-kantner',
    destination: '/podcasts/jer-and-ky-and-guest/s01e08--mfmsw--02--sara-kantner',
  },
  {
    source:
      '/podcasts/my-favorite-murder-she-wrote/s00e12--mfmsw--03--greg-gillotti',
    destination: '/podcasts/jer-and-ky-and-guest/s01e12--mfmsw--03--greg-gillotti',
  },
  {
    source: '/podcasts/my-favorite-murder-she-wrote/s00e16--mfmsw--04--nia-johnson',
    destination: '/podcasts/jer-and-ky-and-guest/s01e16--mfmsw--04--nia-johnson',
  },
  {
    source: '/podcasts/my-favorite-murder-she-wrote/s00e20--mfmsw--05--beth-glick',
    destination: '/podcasts/jer-and-ky-and-guest/s01e20--mfmsw--05--beth-glick',
  },
]

module.exports = getRedirects
