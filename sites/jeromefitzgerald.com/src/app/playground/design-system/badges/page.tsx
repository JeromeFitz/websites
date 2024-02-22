import { Badge } from '@radix-ui/themes'

import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/app/playground/2024/_components/Headline'

const isDev = process.env.NODE_ENV === 'development'

const _radixColorsAccents = [
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
    <Grid as="section">
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <Badge className="text-3xl" color={color} size="2">
                {_title}
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
