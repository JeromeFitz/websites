import Image from 'next/image'
// import { notFound } from 'next/navigation.js'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

async function ImageTest() {
  const imageUrl = `https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg`

  const { getImage } = await import('@jeromefitz/shared/plaiceholder')
  const imageData = await getImage(imageUrl)
  // console.dir(`imageData:`)
  // console.dir(imageData)

  const image = {
    blurDataURL: imageData?.base64,
    ...imageData?.img,
  }

  // console.dir(`image:`)
  // console.dir(image)

  return (
    <>
      <Image
        {...image}
        alt="testing"
        className="size-full object-cover"
        placeholder="blur"
        role="img"
      />
    </>
  )
}

export default function Page() {
  // if (!env.IS_DEV) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!env.IS_DEV) return <FourOhFour isNotPublished={false} segmentInfo={{}} />
  const title = 'Plaiceholder'

  return (
    <Grid>
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <>Testing</>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <ImageTest />
      </HeadlineContent>
    </Grid>
  )
}
