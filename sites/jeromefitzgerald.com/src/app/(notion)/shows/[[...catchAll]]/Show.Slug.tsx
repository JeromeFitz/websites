import { isObjectEmpty } from '@jeromefitz/utils'
import { notFound } from 'next/navigation'

import { getCustom } from '~app/(cache)/getCustom'
// import { FourOhFour } from '~app/(errors)/404'
import { NotionBlocks } from '~app/(notion)/(utils)/NotionBlocks'
import { getShowData } from '~app/(notion)/(utils)/utils'
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

import { DATABASE_ID } from './Show.constants'
import type { PropertiesShow } from './Show.types'
// import { UpcomingShows } from './Show.UpcomingShows'

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

async function Slug({ preview, revalidate, segmentInfo }) {
  const data = await getCustom({
    database_id: DATABASE_ID,
    filterType: 'equals',
    preview,
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
          <NotionBlocks data={data?.blocks} />
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
