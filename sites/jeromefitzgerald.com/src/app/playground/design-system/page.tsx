import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'
import { envClient as env } from '@/config/env.client.mjs'

export default function Page() {
  // if (!env.IS_DEV) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  const title = 'Playground'
  return (
    <Grid>
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>PGROUND</HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>Playground</HeadlineContent>
    </Grid>
  )
}
