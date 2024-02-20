import { Grid } from '~app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '~app/playground/2024/_components/Headline'

import { Modal } from './_components/Newsletter.Modal'

export default function Page() {
  const title = 'Newsletter'

  return (
    <Grid as="section">
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <>testing</>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <Modal />
      </HeadlineContent>
    </Grid>
  )
}
