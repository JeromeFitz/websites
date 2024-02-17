import { getDataFromCache, getSegmentInfo } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { draftMode } from 'next/headers'

import { CONFIG, getPageData } from '~app/(notion)/_config'
import { generateMetadataCustom } from '~app/(notion)/_config/temp/generateMetadataCustom'
import { ModuleRow } from '~app/_temp/modules/ModuleRow'
import { TopBar } from '~app/_temp/modules/TopBar'
import { Notion as Blocks } from '~components/Notion'

const slug = '/colophon'
const { SEGMENT } = CONFIG.PAGES

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const { isEnabled } = draftMode()
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    // @todo(next) revalidate
    revalidate: false,
    segmentInfo: {
      ...segmentInfo,
      slug,
    },
  })

  const is404 = isObjectEmpty(data?.blocks || {})
  const is404Seo = {
    title: `404 | ${segmentInfo?.segment} | ${process.env.NEXT_PUBLIC__SITE}`,
  }

  if (is404) return is404Seo

  const pageData = getPageData(data?.page?.properties) || ''
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return pageData?.isPublished ? seo : is404Seo
}

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()

  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug,
    },
  })

  const { seoDescription, title } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null
  // console.dir(data?.blocks)
  return (
    <div className="w-full min-w-full">
      <TopBar
        className=""
        description={seoDescription}
        isHidden={false}
        isHiddenTags={true}
        label={title}
        title={title}
      />
      <ModuleRow>
        <Blocks data={data?.blocks} />
      </ModuleRow>
    </div>
  )
}

// export default function Page({ revalidate = false, ...props }) {
//   const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

//   return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
// }
export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props, revalidate })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
