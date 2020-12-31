import { GetStaticProps } from 'next'

import renderNotionContent from '~lib/notion/helpers/renderNotionContent'

import getStaticPropsQueryCollection from '~lib/notion/utils/getStaticPropsQueryCollection'

import Container from '~components/Container'
import Header from '~components/Header'

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

const title = 'Hello, my name is Jerome.'
const description = 'I write and perform comedy.'
const header = {
  description,
  title,
}

const Index = ({ ...rest }: any) => {
  const items = rest.data
  const key = items && Object.keys(items)
  const isSingle = key && key.length === 1
  const item = isSingle && items[key[0]]
  return (
    <Container>
      <Header {...header} />
      <div id="content">{renderNotionContent(item)}</div>
    </Container>
  )
}

export default Index
