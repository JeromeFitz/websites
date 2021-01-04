import { NextSeo } from 'next-seo'

import Layout from '~components/Layout'
import Header from '~components/Header'

const Music = () => {
  const url = 'https://jeromefitzgerald.com/comedy'
  const title = 'Comedy'
  const description = 'Jerome loves comedy. Content coming soon.'
  const header = {
    description,
    title,
  }

  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Header {...header} />
    </Layout>
  )
}

export default Music
