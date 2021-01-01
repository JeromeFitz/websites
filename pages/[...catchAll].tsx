// import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'

import Container from '~components/Container'
import Header from '~components/Header'
import { Listing } from '~components/Listing'

import renderNotionContent from '~lib/notion/helpers/renderNotionContent'
import { getStaticPathsCatchAll, getStaticPropsCatchAll } from '~utils/getStatic'

export default function CatchAll({ item, items, seo, ...rest }: any) {
  const isIndex = !!items

  const header = {
    description: seo?.description || '',
    title: seo?.title || '',
  }

  return (
    <Container>
      <NextSeo {...seo} />
      <Header {...header} />
      {isIndex && items && <Listing items={items} {...rest} />}
      {!isIndex && item && <div id="content">{renderNotionContent(item)}</div>}
    </Container>
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
