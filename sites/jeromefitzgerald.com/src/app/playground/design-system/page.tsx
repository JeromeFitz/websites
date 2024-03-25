import {
  AmazonLogoIcon,
  AppleLogoIcon,
  GooglePodcastsLogoIcon,
  SpotifyLogoIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

function Test() {
  return (
    <Box className="flex flex-row items-center justify-start gap-4">
      <SpotifyLogoIcon className="size-36" />
      <AppleLogoIcon className="size-36" />
      <AmazonLogoIcon className="size-36" />
      <GooglePodcastsLogoIcon className="size-36" />
    </Box>
  )
}

function Page() {
  // if (!env.IS_DEV) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  const title = 'Playground'
  return (
    <>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <Badge color="orange" size="2">
              <Code className="lowercase" variant="ghost">
                2024
              </Code>
            </Badge>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <Text>“DS” Playground for quick component mocks</Text>
          <Test />
        </HeadlineContent>
      </Grid>
      <Separator size="4" />
    </>
  )
}

export default Page
