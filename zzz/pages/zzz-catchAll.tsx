import cx from 'clsx'

import { Banner as AlertBanner } from '~components/Alert'
import Header from '~components/Header'
import Layout from '~components/Layout'
import { Listing } from '~components/Listing'
import Seo from '~components/Seo'
import renderNotionContent from '~lib/notion/helpers/renderNotionContent'
import { CatchAll as CatchAllProps } from '~lib/types'
import { getStaticPathsCatchAll, getStaticPropsCatchAll } from '~utils/getStatic'

export default function CatchAll({
  item,
  items,
  preview,
  routeData,
  seo,
}: CatchAllProps) {
  const isIndex = !!items

  const header = {
    description: seo?.description || '',
    title: seo?.title || '',
  }
  const previewClearUrl =
    routeData?.relativeUrl && `/api/notion/${routeData.relativeUrl}?clear=true`

  return (
    <>
      <Layout>
        <Seo {...seo} />
        <Header {...header} />
        {isIndex && items && <Listing items={items} routeData={routeData} />}
        {!isIndex && item && <div id="content">{renderNotionContent(item)}</div>}
      </Layout>
      {preview && (
        <AlertBanner>
          <p>
            <span className="block md:inline">
              <strong>Please Note: </strong> This is a preview.{' '}
            </span>
            <a
              href={previewClearUrl}
              className={cx(
                'hover:text-cyan duration-200 transition-colors',
                'underline underline-offset-sm font-semibold'
              )}
            >
              Click here
            </a>{' '}
            to exit preview mode.
          </p>
        </AlertBanner>
      )}
    </>
  )
}

// @todo(types)
// export const getStaticProps: GetStaticProps<any> = async ({
export const getStaticProps = async ({ preview = false, ...props }) => {
  return await getStaticPropsCatchAll({ preview, ...props })
}

// @todo(types)
// export const getStaticPaths: GetStaticPaths = async (ctx) => {
export const getStaticPaths = async (ctx) => {
  return await getStaticPathsCatchAll(ctx)
}
