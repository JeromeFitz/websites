import type { Image } from '@/app/_v16/types'

// import aojLogo from '~public/images/temp/images/alex-o-jerome/alex-o-jerome.png'
// import aoj from '~public/images/temp/images/alex-o-jerome/aoj--pj.jpg'

const blurDataURL =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z'

const imageGallery: Image[] = [
  {
    blurDataURL,
    height: 903,
    src: '/images/temp/images/alex-o-jerome/aoj--pj.jpg',
    width: 1676,
  },
  {
    blurDataURL,
    height: 495,
    src: '/images/temp/images/alex-o-jerome/alex-o-jerome.png',
    width: 495,
  },
]

import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { Code, Em, Flex, Strong, Text } from '@radix-ui/themes'

// import { LinkButton } from '@/app/_v16/LinkButton'
import { ModuleImageGallery } from '@/app/_v16/Module'
import { GridWrapper } from '@/app/_v16/Wrapper'
import {
  // imageGallery,
  // imageGallery2,
  imageHeadline,
} from '@/app/(segments)/shows/_content/_images'
import { Anchor } from '@/components/Anchor/Anchor'
// import { bandcamps, jeromeands } from '@/data/bandcamps'
import { getShow, segment } from '@/lib/drizzle/schemas/cache-shows/queries'
import { getKey } from '@/utils/getKey'
import { getTitleData } from '@/utils/getTitleData'

import { ContentSection, ContentTitle } from './_components'
import {
  getCreditsByPerson,
  ROLLUPS,
  ROLLUPS_CAST,
  ROLLUPS_CAST_EMERITUS,
  ROLLUPS_CREW,
  ROLLUPS_THANKS,
} from './_functions'

const Content = () => {
  return (
    <>
      <ModuleImageGallery images={[imageGallery[0]]} />
      <GridWrapper>
        <ContentTitle title="Info" />
        <ContentSection>
          <Flex gap={{ initial: '6', md: '8' }} direction="column" width="100%">
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              The Vomit Twinz. AOJ are Alex O’Brien and Jerome Fitzgerald.
            </Text>
            <Text size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                From Chicago to New York, with stops in Los Angeles, and Pittsburgh.
              </Em>
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              Together dam vommie twanz have performed at the{' '}
              <Strong>Detroit Improv Festival</Strong> and{' '}
              <Strong>San Diego Improv Festvial</Strong>. Separately, they have
              featured in comedy festivals in: <Em>Baltimore</Em>, <Em>Chicago</Em>,{' '}
              <Em>New York</Em>, <Em>Pittsburgh</Em>, <Em>San Francisco</Em>,{' '}
              <Em>Toronto</Em>, <Em>& more</Em>.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              Why they dem vom twez?
            </Text>
            <ModuleImageGallery images={[imageGallery[1]]} />
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              That why. Shout out to{' '}
              <Anchor href="https://www.instagram.com/reillycoyooote">
                Anna C. Reilly
              </Anchor>{' '}
              on the capturing the essence.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              <>
                Known during their time in Pittsburgh as the world's most dangerous
                improv duo. They have since taken their show on the road because…
                well… they both moved away from there.
                <br />
                <br />
                Their farewell show had over <Code>25</Code> Special Guests, went
                over <Code>2</Code> hours long and was{' '}
                <Strong>Standing Room Only</Strong>. And since then you can catch
                them stuntin’ on stages in Chicago, LA, and NYC.
                <br />
                <br />
                If you like fun. You like these two dorks.
              </>
            </Text>
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              <Em>
                They have performed death-defying stunts…
                <br />
                They have successfully not murdered each other in the process…
                <br />& have become honorary Muppets from{` `}
                <Anchor href="https://www.youtube.com/watch?v=biT1JGJTBAc">
                  Vomiting Kermit
                </Anchor>
                {` `}
                himself.
              </Em>
            </Text>
          </Flex>
        </ContentSection>
      </GridWrapper>
    </>
  )
}

const Data = async ({ slug }: { slug: string }) => {
  const rollupKey = getKey(segment, slug)
  const rollupItems: Show[] = await getShow({ key: rollupKey })
  const rollupItem = rollupItems[0]

  const R: any = {}
  ROLLUPS.map((ROLLUP: any) => {
    R[ROLLUP] = []

    // @ts-ignore
    const rollupItems = rollupItem[ROLLUP]
    rollupItems.map((i: any) => {
      R[ROLLUP].push(getTitleData({ data: i, type: i.type }))
    })
  })

  const R_CAST: any = {}
  ROLLUPS_CAST.map((ROLLUP: any) => {
    R_CAST[ROLLUP] = []

    // @ts-ignore
    const rollupItems = rollupItem[ROLLUP]
    rollupItems.map((i: any) => {
      R_CAST[ROLLUP].push(getTitleData({ data: i, type: i.type }))
    })
  })

  const R_CAST_EMERITUS: any = {}
  ROLLUPS_CAST_EMERITUS.map((ROLLUP: any) => {
    R_CAST_EMERITUS[ROLLUP] = []

    // @ts-ignore
    const rollupItems = rollupItem[ROLLUP]
    rollupItems.map((i: any) => {
      R_CAST_EMERITUS[ROLLUP].push(getTitleData({ data: i, type: i.type }))
    })
  })

  const R_CREW: any = {}
  ROLLUPS_CREW.map((ROLLUP: any) => {
    R_CREW[ROLLUP] = []

    // @ts-ignore
    const rollupItems = rollupItem[ROLLUP]
    rollupItems.map((i: any) => {
      R_CREW[ROLLUP].push(getTitleData({ data: i, type: i.type }))
    })
  })

  const R_THANKS: any = {}
  ROLLUPS_THANKS.map((ROLLUP: any) => {
    R_THANKS[ROLLUP] = []

    // @ts-ignore
    const rollupItems = rollupItem[ROLLUP]
    rollupItems.map((i: any) => {
      R_THANKS[ROLLUP].push(getTitleData({ data: i, type: i.type }))
    })
  })

  const CAST_FINAL = getCreditsByPerson(R_CAST)
  const CAST_EMERITUS_FINAL = getCreditsByPerson(R_CAST_EMERITUS)
  const CREW_FINAL = getCreditsByPerson(R_CREW)
  const THANKS_FINAL = getCreditsByPerson(R_THANKS)

  return {
    cast: CAST_FINAL,
    content: Content,
    crew: CREW_FINAL,
    emeritus: CAST_EMERITUS_FINAL,
    image: imageHeadline,
    rollups: R,
    seoDescription:
      'The Vomit Twinz. AOJ are Alex O’Brien and Jerome Fitzgerald. From Chicago to New York (with stops in Los Angeles, and Pittsburgh).',
    slug,
    thanks: THANKS_FINAL,
    title: 'Alex O’Jerome',
  }
}

export { Content as ContentAlexOJerome, Data as DataAlexOJerome }
