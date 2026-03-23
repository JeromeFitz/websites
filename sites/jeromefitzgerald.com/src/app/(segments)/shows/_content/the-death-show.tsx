import type { Image } from '@/app/_v16/types'

const blurDataURL =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABBAIDAQAAAAAAAAAAAAABAAMEBQIGEyIxYf/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAGREBAQEBAQEAAAAAAAAAAAAAAQIDABGR/9oADAMBAAIRAxEAPwCfGlwqbX9eZZoaWSXq1mQ47LjczmWeYJPYnz4iIquet1ItPDlA+Enzv//Z'

const imageGallery: Image[] = [
  {
    blurDataURL,
    height: 792,
    src: 'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2019/12/_original/tds--2016--poster-by-caitlin-rose-boyle.jpg',
    width: 1224,
  },
]

import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { Em, Flex, Strong, Text } from '@radix-ui/themes'

import { LinkButton } from '@/app/_v16/LinkButton'
import { ModuleImageGallery } from '@/app/_v16/Module'
import { GridWrapper } from '@/app/_v16/Wrapper'
import {
  // imageGallery,
  // imageGallery2,
  imageHeadline,
} from '@/app/(segments)/shows/_content/_images'
import { Anchor } from '@/components/Anchor/Anchor'
import { deadies } from '@/data/bandcamps'
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
              “Pittsburgh’s longest running death themed improv show.”
            </Text>
            <Text size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                Er, most likely the only too.
                <br />
                More of a celebration of life, than death itself.
              </Em>
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              <Strong>Tha Deadies</Strong> and their special guests take you on a
              journey to the other side as they put the <Em>YOU</Em> in eulogy, the{' '}
              <Em>FUN</Em> in funeral, & the <Em>FU</Em> in fun.
            </Text>
            <Text size={{ initial: '4', md: '5' }} weight="regular">
              Some fun facts:
              <ul className="flex list-inside list-disc flex-col gap-2 py-2">
                <li>
                  Performed at <Strong>Washington and Jefferson</Strong> college for
                  their <Em>“Philosophy of Death”</Em> class
                </li>
                <li>
                  Performed at <Strong>Carnegie Mellon University</Strong> many years
                  as part of their <Em>Detour Comedy Festival</Em>
                </li>
                <li>
                  For one full year, they even had a weekly run at{' '}
                  <Strong>Steel City Improv</Strong>
                </li>
              </ul>
              <br />
              <br />
              Though most years they had a monthly show at various venues. Most
              recently at{' '}
              <Anchor href="https://arcadecomedytheater.com">
                Arcade Comedy Theater
              </Anchor>
              .
            </Text>
            <GridWrapper>
              <ContentTitle title="Current Cast" />
              <ContentSection>
                <Flex gap="5" direction="column" width="100%" py="5">
                  {deadies.map((item, i: any) => {
                    // if (item.href === null) return null
                    return (
                      <LinkButton
                        color="pink"
                        iconSize="xl"
                        className="text-7!"
                        // @ts-ignore
                        href={item.href}
                        // biome-ignore lint/suspicious/noArrayIndexKey: lazy
                        key={`guest-speical-2-${i}`}
                        size="4"
                        text={item.artist}
                        variant="ghost"
                      />
                    )
                  })}
                </Flex>
              </ContentSection>
            </GridWrapper>
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              <Em>
                The Death Show re-animated itself in <Strong>Chicago</Strong> for a
                run at <Strong>iO</Strong>… and quite possibly in{' '}
                <Strong>NYC</Strong> at{` `}
                <Strong>[redacted]</Strong>. (Or not, I have no worldly idea.)
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
      'Pittsburgh’s longest running death themed improv show. More of a celebration of life, than death itself. Let this experienced crew and their special guests take you on a journey to the other side as we put the YOU in eulogy, the FUN in funeral, and the FU in fun.',
    slug,
    thanks: THANKS_FINAL,
    title: 'The Death Show',
  }
}

export { Content as ContentTheDeathShow, Data as DataTheDeathShow }
