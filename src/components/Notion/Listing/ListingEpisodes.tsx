import getInfoType from '@jeromefitz/notion/queries/getInfoType'
import { lpad } from '@jeromefitz/utils'
import _map from 'lodash/map'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

import {
  Badge,
  Box,
  Grid,
  Paragraph,
  Spacer,
  Text,
} from '@jeromefitz/design-system/components'
import { Card } from '@jeromefitz/design-system/components/Card'
import {
  css_card,
  CardContent,
  CardImage,
  CardImageContainer,
  CardMeta,
  CardTitle,
} from '@jeromefitz/design-system/components/Card/Show'
import {
  CardOuter,
  ImageBlur,
} from '@jeromefitz/design-system/components/Card/Spotify'

import { Breakout } from '~components/Container'
import { ImageWithBackgroundBlur } from '~components/Layout/ImageLead'
import { notionConfig } from '~config/websites'
import { IMAGE__PLACEHOLDER } from '~lib/constants'
// import { notion } from '~lib/notion/helper'

const { NOTION } = notionConfig

const Emoji = dynamic(() => import('~components/Emoji'), {
  ssr: false,
})

const Episodes = ({ images, items }) => {
  const router = useRouter()

  return (
    <>
      {_map(items, (item, itemIdx) => {
        // console.dir(`> item`)
        // console.dir(item)
        if (
          item?.properties?.slug === null ||
          item?.properties?.slug === undefined
        ) {
          return null
        }
        const {
          seoDescription,
          seoImage,
          seoImageDescription: description,
          // slug,
          // rollupTags: tags,
          title,
        } = item?.properties
        // @note(notion) this is slugified upstream in data collection
        //               take "first" one
        // @todo(notion) allow for more than one // choose external only
        const imageSlug = Object.keys(seoImage)[0]
        const imageData = !!images && images[imageSlug]
        const hasImage = !!imageData && !!imageData.base64
        // const blurDataURL = hasImage
        //   ? imageData.base64
        //   : IMAGE__PLACEHOLDER?.meta?.base64

        /**
         * @todo(notion) new return is messing this up.
         */
        let base64, img, imgSlug
        if (!hasImage) {
          /**
           * @hack fallback
           */
          base64 = IMAGE__PLACEHOLDER.meta.base64
          img = IMAGE__PLACEHOLDER.meta.img
          imgSlug = IMAGE__PLACEHOLDER.meta.slug
          img = { ...img, src: seoImage[imageSlug]?.url }
          // return null
        } else {
          // const { base64, img, slug: imgSlug } = imageData
          base64 = imageData?.base64
          img = imageData?.img
          imgSlug = imageData?.slug
        }

        const { episode, season } = item?.properties
        const meta = router.asPath.split('/').slice(1)
        const isEpisode = _size(meta) === 2
        const { as, href } = getInfoType({
          config: notionConfig,
          item,
          routeType: NOTION.PODCASTS.slug,
          meta,
        })

        const { icon } = item
        const emoji = !!icon?.emoji ? icon.emoji : ''

        return (
          <CardOuter key={`s-${itemIdx}`}>
            <ImageBlur
              css={{
                borderRadius: '$4',
                backgroundImage: `url(${base64})`,
                backgroundSize: 'cover',
              }}
            />

            <NextLink as={as} href={href} passHref>
              <Card variant="interactive" as="a" css={css_card}>
                <CardImageContainer
                  css={{
                    height: '275px',
                  }}
                >
                  <ImageBlur
                    css={{
                      borderRadius: '$4',
                      backgroundImage: `url(${base64})`,
                      backgroundSize: 'cover',
                      opacity: '1',
                      transform: 'scale(1.02)',
                    }}
                  />
                  <CardImage
                    css={{
                      height: '275px',
                    }}
                  >
                    <ImageWithBackgroundBlur
                      base64={base64}
                      description={description}
                      image={img}
                      slug={imgSlug}
                    />
                  </CardImage>
                </CardImageContainer>
                <Spacer />
                <CardTitle>
                  <Text
                    size="3"
                    as="h3"
                    css={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {title}
                  </Text>
                </CardTitle>
                <Spacer />
                <CardContent>
                  <Paragraph>{seoDescription}</Paragraph>
                </CardContent>
                <Spacer />
                <CardMeta>
                  <Badge
                    key={`badge-${itemIdx}`}
                    size="2"
                    variant="violet"
                    css={{
                      border: '1px solid $colors$violet11',
                      fontWeight: '700',
                      mr: '$4',
                    }}
                  >
                    {isEpisode ? (
                      `S${lpad(season)}E${lpad(episode)}`
                    ) : (
                      <Emoji character={emoji} />
                    )}
                  </Badge>
                </CardMeta>
              </Card>
            </NextLink>
          </CardOuter>
        )
      })}
    </>
  )
}

const ListingEpisodes = ({ images, items }) => {
  return (
    <>
      <Breakout>
        <Box css={{ px: '$2', py: '$6' }}>
          <Grid
            css={{
              rowGap: '$6',
              columnGap: '$6',
              gridTemplateColumns: 'repeat(1, 1fr)',
              '@bp1': { gridTemplateColumns: 'repeat(2, 1fr)' },
              '@bp2': { gridTemplateColumns: 'repeat(3, 1fr)' },
              '& ul': { listStyle: 'none', margin: '0', padding: '0' },
            }}
          >
            <Episodes images={images} items={items} />
          </Grid>
        </Box>
      </Breakout>
    </>
  )
}
export default ListingEpisodes
