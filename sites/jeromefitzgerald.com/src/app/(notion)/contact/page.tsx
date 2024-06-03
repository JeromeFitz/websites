import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  ExternalLinkIcon,
  // InfoCircledIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import {
  getDataFromCache,
  getSegmentInfo,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { draftMode } from 'next/headers.js'

import { CONFIG, getPageData } from '@/app/(notion)/_config/index'
import { generateMetadataCustom } from '@/app/(notion)/_config/temp/generateMetadataCustom'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
// import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
// import { Notion as Blocks } from '@/components/Notion/index'

import { socials } from '@/data/socials'

const slug = '/contact'
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
    title: `404 | ${segmentInfo?.segment} | ${env.NEXT_PUBLIC__SITE}`,
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

  // const { title } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null
  return (
    <ContainerWithSidebar>
      <HeaderSidebar hasBorder={false} title={`Contact`} />
      <ArticleMain>
        <Callout size="1" variant="surface">
          This page has not been migrated yet.
        </Callout>
        <ul
          className={cx(
            'mx-2 mt-2 md:mt-0',
            'flex flex-row gap-8 md:gap-4',
            'justify-center',
            'md:place-items-baseline md:items-center md:justify-start',
          )}
        >
          {socials.map((social) => {
            if (!social.active) return null

            return (
              <li className={cx('')} key={`footer--social--${social.id}`}>
                <Button asChild highContrast radius="full" size="2" variant="ghost">
                  <a
                    className={cx(
                      'hover:cursor-pointer lg:flex',
                      'text-gray-12 hover:text-gray-12',
                      // 'duration-250 transition-colors',
                      'place-content-start items-center justify-items-start lg:w-full',
                      social.className,
                    )}
                    href={social.url}
                    target="_blank"
                  >
                    {social.icon}
                    <span
                      className={cx(
                        // 'flex flex-row items-center justify-center gap-2',
                        'hidden',
                        '',
                      )}
                    >
                      <span className="text-inherit">{social.title}</span>{' '}
                      <ExternalLinkIcon className="text-gray-12" />
                    </span>
                  </a>
                </Button>
              </li>
            )
          })}
        </ul>
      </ArticleMain>
    </ContainerWithSidebar>
  )
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
