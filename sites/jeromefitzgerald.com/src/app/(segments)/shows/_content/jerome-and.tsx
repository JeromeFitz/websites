import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { Em, Flex, Separator, Strong, Text } from '@radix-ui/themes'

import { LinkButton } from '@/app/_v16/LinkButton'
import { ModuleImageGallery } from '@/app/_v16/Module'
import { GridWrapper } from '@/app/_v16/Wrapper'
import {
  imageGallery,
  imageGallery2,
  imageHeadline,
} from '@/app/(segments)/shows/_content/_images'
import { Anchor } from '@/components/Anchor/Anchor'
import { bandcamps, jeromeands } from '@/data/bandcamps'
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
  const foo = [imageGallery[2]]
  return (
    <>
      <ModuleImageGallery images={foo} />
      <GridWrapper>
        <ContentTitle title="Info" />
        <ContentSection>
          <Flex gap={{ initial: '6', md: '8' }} direction="column" width="100%">
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              The monthly comedy variety show where Jerome hosts a cavalcade of
              hilarous and talented friends.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              <Text color="gold">
                <Em>Woody Drennan</Em> (stay gold)
              </Text>{' '}
              claimed that Jerome could do a show with literally anyone. Saying
              <Em>“Yes And”</Em> (shudder), <Strong>Jerome &</Strong> was born at{' '}
              <Strong>Unplanned Comedy</Strong>. A volunteer audience member with no
              improv experience would become the star of the show.
            </Text>
            <Text size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                That tradition of working without a net has continued ever since.
              </Em>
            </Text>
          </Flex>
        </ContentSection>
      </GridWrapper>
      <ModuleImageGallery images={imageGallery} />
      <GridWrapper>
        <ContentSection>
          <Flex gap={{ initial: '6', md: '8' }} direction="column" width="100%">
            <Text size={{ initial: '6', md: '7' }} weight="regular">
              The show quickly evolved to also include special guests with{' '}
              <Strong>a lot</Strong> of experience in improv, music, sketch, and
              stand-up. But due to schedules were folks Jerome did not get to perform
              with or see very often.
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              In its latest iteration at <Strong>Arcade Comedy Theater</Strong>{' '}
              frequent collaborators{' '}
              <Em>
                <Anchor href="https://www.instagram.com/canticonti/">
                  Alex Conti
                </Anchor>
                ,{' '}
                <Anchor href="https://www.instagram.com/thisisnonsenseig/">
                  Nonsense
                </Anchor>
                ,{' '}
                <Anchor href="https://www.instagram.com/itsrainaingmen/">
                  Raina Deerwater
                </Anchor>
                , &{' '}
                <Anchor href="https://www.instagram.com/saknasty/">
                  Sara Kantner
                </Anchor>
              </Em>{' '}
              would weave absurdist humor through clowning and playful character
              sketches. Complete with touring musical acts and of course a clown on
              stage reading a book throughout the entirety of the show.
            </Text>
          </Flex>
        </ContentSection>
      </GridWrapper>
      <ModuleImageGallery images={imageGallery2} />
      <GridWrapper>
        <ContentSection>
          <Flex gap={{ initial: '6', md: '8' }} direction="column" width="100%">
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              It became parts SNL, parts bacchanal. (Sure that rhymes if you say it a
              certain way.)
            </Text>
            <Text color="mint" size={{ initial: '7', md: '8' }} weight="regular">
              <Em>
                Will the show ever return now that he has moved to NYC? All signs
                point to: <Strong>Probably</Strong>. (He has a lot of pals here too.)
              </Em>
            </Text>
            <Text size={{ initial: '5', md: '6' }} weight="regular">
              Big shout-out to the one and only{' '}
              <Strong>
                <Anchor href="https://www.instagram.com/nick_amarillo/">
                  Nick Jaramillo
                </Anchor>
              </Strong>{' '}
              who becomes Jerome on the months that he cannot be there.
            </Text>
          </Flex>
        </ContentSection>
      </GridWrapper>
      <Separator orientation="horizontal" size="4" />
      {/* <GridWrapper>
        <ContentTitle title="Credits" />
        <ContentSection>
          <ModuleCredits />
        </ContentSection>
      </GridWrapper> */}
      <GridWrapper>
        <ContentTitle title="Musical Guests*" />
        <ContentSection>
          <Flex gap="5" direction="column" width="100%" py="5">
            {bandcamps.map((item, i) => (
              <LinkButton
                color="pink"
                iconSize="xl"
                className="text-7!"
                href={item.href}
                // biome-ignore lint/suspicious/noArrayIndexKey: lazy
                key={`guest-speical-1-${i}`}
                size="4"
                text={item.artist}
                variant="ghost"
              />
            ))}
          </Flex>
        </ContentSection>
        <ContentSection>
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '2', md: '3' }} weight="regular">
              <Em>* Small Sampling</Em>
            </Text>
          </Flex>
        </ContentSection>
      </GridWrapper>
      <Separator orientation="horizontal" size="4" />{' '}
      <GridWrapper>
        <ContentTitle title="Special Guests*" />
        <ContentSection>
          <Flex gap="5" direction="column" width="100%" py="5">
            {jeromeands.map((item, i) => (
              <LinkButton
                color="pink"
                iconSize="xl"
                className="text-7!"
                href={item.href}
                // biome-ignore lint/suspicious/noArrayIndexKey: lazy
                key={`guest-speical-2-${i}`}
                size="4"
                text={item.artist}
                variant="ghost"
              />
            ))}
          </Flex>
        </ContentSection>
        <ContentSection>
          <Flex gap="5" direction="column" width="100%">
            <Text size={{ initial: '2', md: '3' }} weight="regular">
              <Em>* Small Sampling</Em>
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
    seoDescription: 'Lorem',
    slug,
    thanks: THANKS_FINAL,
    title: 'Jerome &: The Comedy Variety Show',
  }
}

export { Content as ContentJeromeAnd, Data as DataJeromeAnd }
