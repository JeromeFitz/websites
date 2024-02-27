import { Badge, Text } from '@radix-ui/themes'

import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

const isDev = process.env.NODE_ENV === 'development'

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
        <div className="flex flex-col flex-wrap gap-4">
          {_radixColorsAccents.map((color) => {
            const _title = `${color}-a11`
            return (
              <Badge color={color} radius="large" size="2" variant="solid">
                <Text size="7">{_title}</Text>
              </Badge>
            )
          })}
        </div>
      </HeadlineContent>
    </Grid>
  )
}

export default function Page() {
  // if (!isDev) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  return <Slug />
}
