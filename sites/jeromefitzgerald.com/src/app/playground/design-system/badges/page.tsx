import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

type RadixColor =
  | 'amber'
  | 'blue'
  | 'bronze'
  | 'brown'
  | 'crimson'
  | 'cyan'
  | 'gold'
  | 'grass'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'iris'
  | 'jade'
  | 'lime'
  | 'mint'
  | 'orange'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'red'
  | 'ruby'
  | 'sky'
  | 'teal'
  | 'tomato'
  | 'violet'
  | 'yellow'

const _radixColorsAccents: RadixColor[] = [
  'tomato',
  'red',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'grass',
  'orange',
  'brown',
  // bright
  'sky',
  'mint',
  'lime',
  'yellow',
  'amber',
  // grays
  'gray',
  // 'mauve',
  // 'slate',
  // 'sage',
  // 'olive',
  // 'sand',
  // metals
  'gold',
  'bronze',
  // overlays
  // 'black',
  // 'white',
]

export default function Page() {
  // if (!env.IS_DEV) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return <Slug />
}

function Slug() {
  const title = 'Radix Badge Adjustment'
  return (
    <Grid>
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>Slight adjustments for --a11</HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <Flex direction="column" gap="4" wrap="wrap">
          {_radixColorsAccents.map((color) => {
            const _title = `${color}-a11`
            return (
              <Badge color={color} radius="large" size="2" variant="solid">
                <Text size="7">{_title}</Text>
              </Badge>
            )
          })}
        </Flex>
      </HeadlineContent>
    </Grid>
  )
}
