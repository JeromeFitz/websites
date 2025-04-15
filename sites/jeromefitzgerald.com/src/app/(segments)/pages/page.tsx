import { segment } from '@/lib/drizzle/schemas/cache-pages/queries'
import { buildInitialCache } from '@/lib/notion/buildInitialCache'

// export const dynamic = 'force-dynamic'
export const dynamic = 'force-static'

export default async function Index() {
  await buildInitialCache({ segment })

  return null
}
