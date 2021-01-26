import { GetStaticProps } from 'next'

import renderNotionContent from '~lib/notion/helpers/renderNotionContent'

import getStaticPropsQueryCollection from '~lib/notion/utils/getStaticPropsQueryCollection'

import Layout from '~components/Layout'
import Header from '~components/Header'
import Seo from '~components/Seo'

/**
 * @note Customized homepage.
 */
import routeTypes from '~config/notion/website'
const routeType = 'pages'
const slug = 'homepage'

const { indexId, collectionId, collectionViewId__slug } = routeTypes[routeType]

export const getStaticProps: GetStaticProps = ({ preview }) => {
  // const slug = 'homepage'
  const url = `/`
  // let url = `/${routeType}`
  // if (slug) url += `/${slug}`

  return getStaticPropsQueryCollection({
    indexId,
    collectionId,
    collectionViewId: collectionViewId__slug,
    preview,
    routeType,
    slug,
    itemDate: null,
    id: null,
    url,
  })
}

const Index = ({ data }: any) => {
  const items = data
  const key = items && Object.keys(items)
  const isSingle = key && key.length === 1
  const item = isSingle && items[key[0]]

  const title = 'Hello, my name is Jerome.'
  const description = 'I write and perform comedy.'
  const header = {
    description,
    title,
  }

  // @hack(next-seo) DefaultSeo in _app was causing dupe SEO
  const seo = {}

  return (
    <Layout>
      <Seo {...seo} />
      <Header {...header} />
      <div id="content">{renderNotionContent(item)}</div>
    </Layout>
  )
}

export default Index
