import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { Flex } from '@radix-ui/themes'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

const links = [
  '/',
  '/events/2023/06/16/jerome-and',
  '/events/2023/06/16',
  '/events/2023/06',
  '/events/2023',
  '/events',
  '/people/jerome-fitzgerald',
  '/people',
  '/shows/jerome-and',
  '/shows',
  //
  '/design-system',
  // '/kitchen-sink',
]

/**
 * @todo(next) uh can we delete this?
 */
function Wrapper({ children }) {
  if (!env.IS_DEV) return null
  if (env.IS_DEV) return null

  const title = 'Testing'
  return (
    <>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <>{title}</>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>{children}</HeadlineContent>
      </Grid>
    </>
  )
}

function Testing() {
  return (
    <Wrapper>
      <Box asChild my="1" py="1" width="100%">
        <ul className="list-inside">
          {links.map((href, i) => {
            return (
              <Box
                asChild
                key={`homepage-link-${i}`}
                mb={{ initial: '2', lg: '1' }}
                my="1"
                py="1"
              >
                <li>
                  <Flex asChild direction="row" display="inline-flex" gap="2">
                    <Link asChild mb="2">
                      <Anchor href={href}>{href}</Anchor>
                    </Link>
                  </Flex>
                </li>
              </Box>
            )
          })}
        </ul>
      </Box>
    </Wrapper>
  )
}

export { Testing }
