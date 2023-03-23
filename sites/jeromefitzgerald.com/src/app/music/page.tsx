import type { Page } from '@jeromefitz/notion/schema'

import { Debug } from '~components/Debug'
import { Music } from '~components/Music'
import { PageHeading } from '~ui/PageHeading'

// import { log } from '~utils/log'

// const ROUTE_TYPE = 'music'
// const DEBUG_KEY = `${ROUTE_TYPE}/page.tsx >> `

const url = 'https://jeromefitzgerald.com/music'
const title = 'Music'
const description =
  'Jerome loves music. Here are his current top artists and tracks.'

const metadata = {
  title: `${title} | Jerome Fitzgerald (he/him)`,
  description,
  canonical: url,
  openGraph: {
    url,
    title,
    description,
  },
}

export function generateMetadata() {
  return metadata
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Page({ preview = false, ...props }) {
  const empty = {}

  return (
    <>
      <Debug data={empty} pathVariables={empty} />
      <PageHeading overline={`music`} title={'Music'} />
      <Music />
    </>
  )
}
