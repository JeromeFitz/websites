import Slugger from 'github-slugger'
import _map from 'lodash/map'
import NextLink from 'next/link'
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

const Shows = ({ images, items }) => {
  const slugger = new Slugger()

  return (
    <>
      {_map(items, (item, itemIdx) => {
        const {
          seoDescription,
          seoImage,
          seoImageDescription: description,
          slug,
          rollupTags: tags,
          title,
        } = item?.data
        const imageSlug = slugger.slug(seoImage)
        const imageData = !!images && images[imageSlug]
        const hasImage = !!imageData && !!imageData.base64
        // const blurDataURL = hasImage
        //   ? imageData.base64
        //   : IMAGE__PLACEHOLDER?.meta?.base64

        const { base64, img, slug: imgSlug } = imageData
        if (!hasImage) return null

        return (
          <CardOuter key={`s-${itemIdx}`}>
            <ImageBlur
              css={{
                borderRadius: '$4',
                backgroundImage: `url(${base64})`,
                backgroundSize: 'cover',
              }}
            />

            <NextLink href={`/shows/${slug}`} passHref>
              <Card variant="interactive" as="a" css={css_card}>
                <CardImageContainer>
                  <ImageBlur
                    css={{
                      borderRadius: '$4',
                      backgroundImage: `url(${base64})`,
                      backgroundSize: 'cover',
                      opacity: '1',
                      transform: 'scale(1.02)',
                    }}
                  />
                  <CardImage>
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
                  {_map(tags, (item, itemIdx) => (
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
                      {item}
                    </Badge>
                  ))}
                </CardMeta>
              </Card>
            </NextLink>
          </CardOuter>
        )
      })}
    </>
  )
}

const ListingShows = ({ images, items }) => {
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
            <Shows images={images} items={items} />
          </Grid>
        </Box>
      </Breakout>
    </>
  )
}
export default ListingShows
