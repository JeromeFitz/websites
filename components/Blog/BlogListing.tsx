import useSWR from 'swr'
import cx from 'clsx'
import { Blog, BlogItem } from '~lib/types'
import _map from 'lodash/map'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

type Props = {
  // blog: Blog
  blogs: Blog[]
}

const BlogListing = ({ blogs }: Props) => {
  const { data } = useSWR('/api/notion/blog', {
    initialData: blogs,
    refreshInterval: MINUTE,
    revalidateOnFocus: false,
  })

  const updatedBlogs = data || []
  // const updatedBlog = updatedBlogs.find((b: BlogItem) => b.id === blog.id) || blog

  return (
    <>
      {!!updatedBlogs && (
        <ul>
          {_map(updatedBlogs, (blog: BlogItem, blogId) => {
            return (
              <li
                className={cx('font-mono text-black dark:text-white')}
                key={blogId}
              >
                {blog.id}:
                <span className="font-sans block mt-2 mb-8">{blog.Overline}</span>
              </li>
            )
          })}
          )
        </ul>
      )}
    </>
  )
}

export default BlogListing
