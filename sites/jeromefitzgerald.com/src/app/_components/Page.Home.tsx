import { Caption } from '@jeromefitz/ds/components/Caption'
import { cx } from '@jeromefitz/ds/utils/cx'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'

import { AspectRatio, Badge } from '@radix-ui/themes'
import { forwardRef } from 'react'

import { Grid } from '@/components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline'
import { Quote } from '@/components/Quote'
import { quotes } from '@/data/quotes'

const image = {
  alt: 'Jerome is wearing a black suit, with a paper mâché head of Charles Entertainment Cheese Junior. A blue duct-tap cap with a yellow “C” resides between two giant rat (mouse?) ears with a cut-out for his face. He is standing pointing an accusatory finger at two poor seated schlubs about to incur his wrath. Due to his stance and finger pointing you cannot see his face under the paper mâché rat head and just see his right ear and side cheek. There is an empty pizza box on a chair behind him.',
  blurDataURL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC',
  className: 'rounded-lg',
  height: 960,
  order: 0,
  quality: 90,
  // sizes: '(max-width: 768px) (max-width: 1280px) 61vw, 75vw',
  src: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  url: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  width: 1280,
}

const PageHome = forwardRef(function PageHome(props, forwardedRef) {
  const title = 'Jerome Fitzgerald'
  return (
    <Grid as="section" ref={forwardedRef}>
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>
            {title}
            <span className="block text-xl font-normal tracking-wider">he/him</span>
          </>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <Badge color="orange" size="2">
            actor
          </Badge>
          <Badge color="mint" size="2">
            comedian
          </Badge>
          <Badge color="purple" size="2">
            writer
          </Badge>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <>
          <p className="flex gap-2 text-4xl font-bold tracking-tight">
            <span
              aria-label="an emoji representation of wave"
              className="ml-0.5 mr-1.5"
              role="img"
            >
              👋
            </span>
            <span className="">Hello</span>
          </p>
          <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
            I mostly focus on writing and performing comedy. With the occasional
            drama or musical number, and a healthy career in engineering leadership.
          </p>
          <div className="my-2 w-full py-2">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <AspectRatio ratio={4 / 3}>
              <NextImage {...image} />
            </AspectRatio>
            <Caption className={cx('m-2 p-4')}>
              Charles Entertainment Cheese Jr. en-farting-route to SF Sketchfest
              (Photo by Bob Shields)
            </Caption>
          </div>
          <p
            className={cx(
              'text-2xl font-semibold tracking-wide',
              'flex flex-col gap-0',
              '',
            )}
          >
            Hailing from Pittsburgh, my shows have featured in:
          </p>
          <ul className="mb-4 w-full list-inside list-disc pb-2 text-lg">
            <li>Chicagoland</li>
            <li>Cleveland</li>
            <li>Detroit</li>
            <li>New York City</li>
            <li>Philadelphia</li>
            <li>San Diego</li>
            <li>San Francisco</li>
            <li>& “more”</li>
          </ul>
          <p
            className={cx(
              'text-2xl font-semibold tracking-wide',
              'flex flex-col gap-0',
              '',
            )}
          >
            Here are some nice quotes from nice people:
          </p>
          {quotes.map((quote, i) => {
            return <Quote item={quote} key={`quote--${i}`} />
          })}
        </>
      </HeadlineContent>
    </Grid>
  )
})

export { PageHome }
