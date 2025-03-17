import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { CameraIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'

import { AspectRatio } from '@radix-ui/themes/dist/esm/components/aspect-ratio.js'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { forwardRef } from 'react'

import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'
import { LI, UL } from '@/components/List/index'
import { Quote } from '@/components/Quote/index'
import { quotes } from '@/data/quotes'

const image = {
  alt: 'Jerome is wearing a black suit, with a paper mâché head of Charles Entertainment Cheese Junior. A blue duct-tap cap with a yellow “C” resides between two giant rat (mouse?) ears with a cut-out for his face. He is standing pointing an accusatory finger at two poor seated schlubs about to incur his wrath. Due to his stance and finger pointing you cannot see his face under the paper mâché rat head and just see his right ear and side cheek. There is an empty pizza box on a chair behind him.',
  blurDataURL:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC',
  // className: 'rounded-3',
  height: 960,
  order: 0,
  // quality: 90,
  sizes:
    '(max-width: 768px) 90vw, (max-width: 1280px) 50vw, (max-width: 2560px) 61vw, 50vw',
  src: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  url: 'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg',
  width: 1280,
}

const cities = [
  'Chicagoland',
  'Cleveland',
  'Detroit',
  'New York City',
  'Philadelphia',
  'San Diego',
  'San Francisco',
  '& “more”',
]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageHomeOld = forwardRef(function PageHome(props, forwardedRef) {
  const title = 'Jerome Fitzgerald'
  return (
    <Grid ref={forwardedRef}>
      {/* <Grid> */}
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>
            {title}
            <Code asChild size="3" variant="ghost" weight="light">
              <Box as="span" display="block">
                he/him
              </Box>
            </Code>
          </>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <Badge color="orange" size="2">
            <Code className="lowercase" variant="ghost">
              Actor
            </Code>
          </Badge>
          <Badge color="mint" size="2">
            <Code className="lowercase" variant="ghost">
              Comedian
            </Code>
          </Badge>
          <Badge color="purple" size="2">
            <Code className="lowercase" variant="ghost">
              Writer
            </Code>
          </Badge>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <>
          <Text as="p" size="8" weight="bold">
            <span
              aria-label="an emoji representation of wave"
              className="mr-1.5 ml-0.5"
              role="img"
            >
              👋
            </span>
            <span className="">Hello</span>
          </Text>
          <Text size="6">
            I mostly focus on writing and performing comedy. With the occasional
            drama or musical number, and a healthy career in engineering leadership.
          </Text>
          <Box my="2" py="2" width="100%">
            <AspectRatio ratio={4 / 3}>
              <NextImage {...image} />
            </AspectRatio>
            <Callout className={cx('m-2 p-4')} icon={CameraIcon}>
              Charles Entertainment Cheese Jr. en-farting-route to SF Sketchfest
              (Photo by Bob Shields)
            </Callout>
          </Box>
          <Text size="6">Hailing from Pittsburgh, my shows have featured in:</Text>
          <Box asChild mb="4" pb="2" width="100%">
            <UL>
              {cities.map((city, i) => (
                <Text asChild key={`city-${i}`} size="5">
                  <LI>{city}</LI>
                </Text>
              ))}
            </UL>
          </Box>
          <Text size="6">Here are some nice quotes from nice people:</Text>
          {quotes.map((quote, i) => {
            return <Quote item={quote} key={`quote--${i}`} />
          })}
        </>
      </HeadlineContent>
    </Grid>
  )
})

function PageHome() {
  return (
    <>
      <ArticleMain>
        <Heading as="h1" className="absolute top-[-999px] left-[-999px] block">
          Jerome Fitzgerald (he/him)
        </Heading>
        <Heading as="h2" className="absolute top-[-999px] left-[-999px] block">
          Actor. Comedian. Human.
        </Heading>
      </ArticleMain>
    </>
  )
}

export { PageHome }
