import { getVenues, segment } from '@/lib/drizzle/schemas/cache-venues/queries'
import { buildInitialCache } from '@/lib/notion/buildInitialCache'

import { List } from './_components/List'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

export default async function Index() {
  const items = await getVenues()
  await buildInitialCache({ segment })

  // items.map((item) => {
  //   console.dir(`item: ${item.id}: ${item.updated_at}`)
  // })

  return (
    <>
      <List items={items} />
    </>
  )
}
