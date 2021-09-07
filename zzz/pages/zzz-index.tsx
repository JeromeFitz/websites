import { GetStaticProps } from 'next'

import { sites } from '../../next.sitemap'

import Header from '~components/Header'
import Layout from '~components/Layout'
import Seo from '~components/Seo'
import { routeTypes } from '~config/notion/website'
import renderNotionContent from '~lib/notion/helpers/renderNotionContent'
import getStaticPropsQueryCollection from '~lib/notion/utils/getStaticPropsQueryCollection'

/**
 * @note Customized homepage.
 */
const { description, title } = sites[process.env.NEXT_PUBLIC__SITE]
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
