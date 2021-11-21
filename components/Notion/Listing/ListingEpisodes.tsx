import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { Breakout } from '~components/Layout'
import { ImageWithBackgroundBlur } from '~components/Notion/Layout/ImageLead'
import { Badge, Box, Grid, Paragraph, Spacer, Text } from '~styles/system/components'
import { Card } from '~styles/system/components/Card'
import {
  css_card,
  CardContent,
  CardImage,
  CardImageContainer,
  CardMeta,
  CardTitle,
} from '~styles/system/components/Card/Show'
import { CardOuter, ImageBlur } from '~styles/system/components/Card/Spotify'
import lpad from '~utils/lpad'
import getInfoType from '~utils/notion/getInfoType'
import { ROUTE_TYPES } from '~utils/notion/helper'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

const Episodes = ({ images, items }) => {
  const router = useRouter()
  const slugger = new Slugger()

  return (
    <>
      {_map(items, (item, itemIdx) => {
        if (item.data.slug === null || item.data.slug === undefined) {
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
        const imageSlug = slugger.slug(seoImage)
        const imageData = !!images && images[imageSlug]
        const hasImage = !!imageData && !!imageData.base64
        // const blurDataURL = hasImage
        //   ? imageData.base64
        //   : IMAGE__PLACEHOLDER?.meta?.base64

        if (!hasImage) return null
        const { base64, img, slug: imgSlug } = imageData

        const { episode, season } = item?.properties
        const meta = router.asPath.split('/').slice(1)
        const isEpisode = _size(meta) === 2
        const { as, href } = getInfoType(item, ROUTE_TYPES.podcasts, meta)

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
