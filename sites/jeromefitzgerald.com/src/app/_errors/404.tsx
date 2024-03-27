import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

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
  // const body = `Hey, sometimes these things happen. I bet if this page existed it would be pretty cool.`

  return (
    <>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={message} as="h1">
            <>{message}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <Badge size="2">
              <Code variant="ghost">
                {title}
                {isNotPublished ? '*!*' : ''}
              </Code>
            </Badge>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <Text as="p" size="8" weight="bold">
            Hey, sometimes these things happen.
          </Text>
          <Text size="4">I bet if this page existed it would be pretty cool.</Text>
          <Separator my="8" />
          <Text size="4">
            Please try and go back to the{` `}
            <Anchor href="/">homepage</Anchor>.
          </Text>
          {!isObjectEmpty(segmentInfo) && (
            <>
              <Separator my="8" />
              <Heading as="h2">Error Information:</Heading>
              <Box asChild mb="4" pb="2" width="100%">
                <ul className="list-inside list-disc">
                  <Text asChild>
                    <li>
                      <Strong>url: </Strong>
                      <Text as="span">{segmentInfo?.slug}</Text>
                    </li>
                  </Text>
                </ul>
              </Box>
            </>
          )}
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { FourOhFour }
