import type { Image } from '@/app/_v16/types'

const blurDataURL =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z'

const imageGallery: Image[] = [
  {
    blurDataURL,
    height: 2048,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2019/12/_original/wz--squatters--mike-rubino.jpg',
    width: 1367,
  },
]

import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { Em, Flex, Strong, Text } from '@radix-ui/themes'

import { ModuleImageGallery } from '@/app/_v16/Module'
import { GridWrapper } from '@/app/_v16/Wrapper'
import {
  // imageGallery,
  // imageGallery2,
  imageHeadline,
} from '@/app/(segments)/shows/_content/_images'
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
              The Bonerz
            </Text>
            <Text size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                Arcade Comedy Theater’s premier house team. With a weekly show for
                over 5 years.
              </Em>
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              And an accompanying solo monthly show during where they would take
              their <Strong>JTS Brown</Strong> form to the absolute extreme.
              Audiences never knew what to expect, who to expect, when to expect…
              except a good time.
            </Text>
            <Text size={{ initial: '7', md: '8' }} weight="bold">
              Many festivals. Many laughs. Many hi-jinks.{' '}
            </Text>
            <Text size={{ initial: '4', md: '5' }} weight="regular">
              Some fun facts:
              <ul className="flex list-inside list-disc flex-col gap-2 py-2">
                <li>
                  Turned Arcade into a fully functioning Carnival complete with
                  raffles, games (pop-a-shot!), funnel-cake!
                </li>
                <li>
                  Did a show in an alley, because that is where everyone in Warp Zone
                  liked to hang out between shows and decided to bring the entire
                  audience out.
                </li>
                <li>
                  Two sold out shows at the <Strong>iO Theater</Strong> as part of{' '}
                  <Strong>Chicago Improv Festival</Strong>
                </li>
              </ul>
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
      'Warp Zone was one of Arcade Comedy Theater‘s premier long-form teams for over 5 years. They had weekly and monthly shows while playing coast-to-coast. J.T.S Brown fast paced action, the Bonerz.',
    slug,
    thanks: THANKS_FINAL,
    title: 'Warp Zone',
  }
}

export { Content as ContentWarpZone, Data as DataWarpZone }
