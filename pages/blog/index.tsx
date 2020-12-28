import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { getBlogs } from '~lib/cms-api'
import { Blog } from '~lib/types'

import Container from '~components/Container'
import Header from '~components/Header'
import { BlogListing } from '~components/Blog'

const url = 'https://jeromefitzgerald.com/blog'
const title = 'Blog'
const description = 'Placeholder until Notion normalizer and routing is in place'
const header = {
  description,
  title,
}

type Props = {
  blogs: Blog[]
}

const BlogPage = ({ blogs }: Props) => {
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
      <BlogListing blogs={blogs} />
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
