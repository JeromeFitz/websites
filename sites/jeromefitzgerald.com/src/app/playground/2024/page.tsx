import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { FourOhFour } from '@/app/_errors/404'

import { Client } from './_components/Client'

export default function Page() {
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return <Client />
}
