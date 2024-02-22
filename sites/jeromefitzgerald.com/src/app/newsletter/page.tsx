import { Grid } from '@/components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '@/components/Headline'

import { Modal } from './_components/Newsletter.Modal'

export default function Page() {
  const title = 'Newsletter'

  return (
    <Grid as="section">
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
      </HeadlineColumnA>
      <HeadlineContent>
        <Modal />
      </HeadlineContent>
    </Grid>
  )
}
