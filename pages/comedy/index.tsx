import Seo from '~components/Seo'

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

  const seo = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <Layout>
      <Seo {...seo} />
      <Header {...header} />
    </Layout>
  )
}

export default Music
