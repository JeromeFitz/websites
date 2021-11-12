import seo from '~config/websites'
const { description, sitename, title, twitter, url } = seo

const getNextSeo = {
  noindex: false,
  title: title,
  titleTemplate: `%s | ${sitename}`,
  description: description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: url,
    title: title,
    description: description,
    defaultImageWidth: 1200,
    defaultImageHeight: 1200,
    images: [
      {
        url: 'https://cdn.jeromefitzgerald.com/ngop-production/wp-content/uploads/sites/2/2016/08/27164902/201605-cif-onstage_solo_no_audience.jpg',
        width: 1504,
        height: 1500,
        alt: 'Jerome: In front of *another* sold-out crowd in Chicagoland. (Photo: Mike Rubino)',
      },
    ],
    site_name: sitename,
  },
  twitter: {
    handle: twitter,
    site: twitter,
    cardType: 'summary_large_image',
  },
  custom: {
    icon: '/images/emoji-icon-pack/051-happy-4-mini.png',
    title: 'Jerome Fitzgerald',
    titleShort: 'Jerome',
    url,
  },
}

export default getNextSeo
