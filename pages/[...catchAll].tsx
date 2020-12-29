import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'

// import _concat from 'lodash/concat'
// import _find from 'lodash/find'
import _isEqual from 'lodash/isEqual'
import _map from 'lodash/map'
// import _merge from 'lodash/merge'
import _uniqWith from 'lodash/uniqWith'
import getTimestamp from '~utils/getTimestamp'
import { getNotionLink } from '~lib/notion/helpers'
// import getCollectionView from '~config/notion/schema/getCollectionView'
// import getStaticPropsQueryCollection from '~lib/notion/utils/getStaticPropsQueryCollection'
import { getBlog, getBlogs } from '~lib/cms-api'
import { Blog, BlogItem } from '~lib/types'

import Container from '~components/Container'
import Header from '~components/Header'

type Props = {
  catchAll: any
  blog: Blog
  preview: boolean
}

export default function BlogPageCatchAll({ catchAll, blog, preview }: Props) {
  const url = 'https://jeromefitzgerald.com/blog/xyz'
  const title = 'B1'
  const description = 'B1 Placeholder'

  console.dir(`> catchAll`)
  console.dir(catchAll)
  console.dir(`> blog`)
  console.dir(blog)
  console.dir(`> preview`)
  console.dir(preview)

  const key = Object.keys(blog)
  console.dir(key)

  // let data: BlogItem
  // if (key.length === 1) {
  //   data = blog[key[0]]
  //   url =
  //     'https://jeromefitzgerald.com//blog/2020/03/08/events-postponed-because-of-covid-19'
  //   title = data.Title
  //   description = data.preview[0][0]
  // }

  const header = {
    description,
    title,
  }

  return (
    <Container>
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
    </Container>
  )
}

// type StaticProps = {
//   params: { catchAll: any }
//   preview?: boolean
// }

// @refactor(notion) This only works with Single Return Things not Listings...
export const getStaticProps: GetStaticProps<any> = async ({
  params: { catchAll },
  preview = false,
}) => {
  const blog: Blog = await getBlog(catchAll)

  if (!blog) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      catchAll,
      blog,
      preview,
    },
    revalidate: 60,
  }
}

const getStaticPathsWithDate = async ({ data, routeType }) => {
  const years = []
  const months = []
  const dates = []

  const paths = await _map(data, (item: BlogItem) => {
    const { year, month, date } = getTimestamp(item['Date']?.start_date).event
    return getNotionLink({
      slug: item.Slug,
      routeType,
      itemDate: { year, month, date },
    })
  })

  /**
   * @todo This is ... not great, haha.
   * Go through each event to create index for YEAR, MONTH, DATE...
   */
  const yearsUnique = await _uniqWith(years, _isEqual)
  yearsUnique.map((itemDate) => paths.push(`/${routeType}/${itemDate.year}`))
  const monthsUnique = await _uniqWith(months, _isEqual)
  monthsUnique.map((itemDate) =>
    paths.push(`/${routeType}/${itemDate.year}/${itemDate.month}`)
  )
  const datesUnique = await _uniqWith(dates, _isEqual)
  datesUnique.map((itemDate) =>
    paths.push(`/${routeType}/${itemDate.year}/${itemDate.month}/${itemDate.date}`)
  )

  return {
    fallback: true,
    paths,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs: Blog[] = await getBlogs()

  const { paths: blog } = await getStaticPathsWithDate({
    data: blogs,
    routeType: 'blog',
  })

  return {
    paths: blog,
    fallback: false,
  }
}
