import { isObjectEmpty } from '@jeromefitz/utils'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { getDataFromCache } from '~app/(cache)'
// import { FourOhFour } from '~app/(errors)/404'
import { CONSTANTS } from '~app/(notion)/(config)/constants'
import type { PropertiesShow } from '~app/(notion)/(config)/segments'
import { getShowData } from '~app/(notion)/(config)/segments'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  // SectionHero,
  SectionWrapper,
  Tags,
} from '~components/Section'
import { Testing } from '~components/Testing'

// import { UpcomingShows } from './Show.UpcomingShows'

const { DATABASE_ID } = CONSTANTS.SHOWS

type RELATIONS_TYPE = keyof PropertiesShow
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.People.Cast',
  'Relation.People.Crew',
  'Relation.People.Director',
  'Relation.People.Director.Musical',
  'Relation.People.Director.Technical',
  'Relation.People.Music',
  'Relation.People.Producer',
  'Relation.People.Writer',
  'Relation.People.Thanks',
  'Relation.People.Cast.Past',

  // 'Relation.Events.Primary',
]

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  // console.dir(`Slug: segmentInfo => draft: ${isEnabled ? 'y' : 'n'}`)
  // console.dir(segmentInfo)
  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })
  const is404 = isObjectEmpty(data?.blocks || {})
  // if (is404) return <FourOhFour isNotPublished={false} segmentInfo={segmentInfo} />
  if (is404) return notFound()

  const { properties }: { properties: PropertiesShow } = data?.page
  const { isPublished, tags, title } = getShowData(properties)

  // if (!isPublished)
  //   return <FourOhFour isNotPublished={true} segmentInfo={segmentInfo} />
  if (!isPublished) return notFound()

  return (
    <>
      {/* Hero */}
      {/* <SectionHero title={title} /> */}
      {/* Content */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent>
            <Tags tags={tags} />
          </SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={[]}
          />
        </SectionContent>
      </SectionWrapper>
      {/* <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Upcoming Shows</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <UpcomingShows properties={properties} />
        </SectionContent>
      </SectionWrapper> */}
      <Testing />
    </>
  )
}

export { Slug }
