import { getImage } from '@jeromefitz/shared/src/lib/plaiceholder/getImage'
import Image from 'next/image'

import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'

async function ImageTest() {
  const imageToGet = `https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg`

  const imageData = await getImage(imageToGet)
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
        className="h-full w-full object-cover"
        placeholder="blur"
        role="img"
      />
    </>
  )
}

export default function Page() {
  const title = 'Plaiceholder'

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
      </SectionHeader>
      <SectionContent>
        <ImageTest />
      </SectionContent>
    </SectionWrapper>
  )
}
