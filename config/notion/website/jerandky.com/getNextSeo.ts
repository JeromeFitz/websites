const sitename = 'Jer & Ky BoyZ',
  title = 'Jer & Ky BoyZ | Mailshrimp',
  description =
    'The Jer & Ky BoyZ are comedians Jerome Fitzgerald & Kyle Longsdorf. Jer & Ky Productions is a subsidiary of Nice Group of People sponsored by MailShrimp and home to comedy podcasts Jer & Ky & Guest, Knockoffs.',
  url = 'https://jerandky.com',
  twitter = '@JeromeFitz'

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
        url:
          'https://cdn.jerandky.com/ngop-production/wp-content/uploads/sites/2/2016/08/27164902/201605-cif-onstage_solo_no_audience.jpg',
        width: 1504,
        height: 1500,
        alt:
          'Jerome: In front of *another* sold-out crowd in Chicagoland. (Photo: Mike Rubino)',
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
    title: 'JerKy BoyZ (Jer & Ky)',
    titleShort: 'JerKy BoyZ',
    url,
  },
}

export default getNextSeo
