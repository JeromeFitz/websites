import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { getBlogs } from '~lib/cms-api'
import { Blog } from '~lib/types'

import Container from '~components/Container'

const url = 'https://jeromefitzgerald.com/blog'
const title = 'Blog'
const description = '@todo(notion)'

type Props = {
  blogs: Blog[]
}

const BlogPage = ({ blogs }: Props) => {
  console.dir('BlogPage')
  console.dir(blogs)
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
      <>
        <h1>{title}</h1>
        <div className="mt-2 mb-4 text-gray-900 dark:text-gray-100">
          <p className="my-4 mt-0">
            Placeholder until Notion normalizer and routing is in place.
          </p>
        </div>
      </>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogs = await getBlogs()
  return {
    props: {
      blogs,
    },
    revalidate: 60,
  }
}

export default BlogPage
