import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes'

import { Grid } from '@/components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline'

// @todo(types)
function FourOhFour({
  isNotPublished = false,
  segmentInfo = {},
}: {
  isNotPublished: boolean
  segmentInfo: any
}) {
  const title = '404'
  const message = `Page Not Found`
  const body = `Hey, sometimes these things happen. I bet if this page existed it would be pretty cool.`

  return (
    <>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={message} as="h1">
            <>{message}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <Badge size="2">
              {title}
              {isNotPublished ? '*!*' : ''}
            </Badge>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <p className={'text-lg tracking-wide'}>{body}</p>
          <Separator className="my-8" />
          <p className="text-lg">
            Please try and go back to the{` `}
            <Anchor href="/">homepage</Anchor>.
          </p>
          {!isObjectEmpty(segmentInfo) && (
            <>
              <Separator className="my-8" />
              <h2 className="text-xl font-bold">Error Information:</h2>
              <ul className="my-4 list-inside list-disc">
                <li>
                  <strong>url: </strong>
                  <span>{segmentInfo?.slug}</span>
                </li>
              </ul>
            </>
          )}
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { FourOhFour }
