import { getBlogs, segment } from '@/lib/drizzle/schemas/cache-blogs/queries'
import { buildInitialCache } from '@/lib/notion/buildInitialCache'

import { List } from './_components/List'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

export default async function Home() {
  const items = await getBlogs()
  await buildInitialCache({ segment })

  return (
    <>
      <List items={items} />
    </>
  )
}
