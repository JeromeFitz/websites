import _map from 'lodash/map'
import NextLink from 'next/link'
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
import { IMAGE__PLACEHOLDER } from '~lib/constants'

const Shows = ({ images, items }) => {
  return (
    <>
      {_map(items, (item, itemIdx) => {
        // console.dir(item)
        const {
          seoDescription,
          seoImage,
          seoImageDescription: description,
          slug,
          rollupShows__Tags: tags,
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

        let base64, img, imgSlug
        if (!hasImage) {
          /**
           * @hack fallback
           */
          base64 = IMAGE__PLACEHOLDER.meta.base64
          img = IMAGE__PLACEHOLDER.meta.img
          imgSlug = IMAGE__PLACEHOLDER.meta.slug
          img = { ...img, src: seoImage[imageSlug]?.url }
          return null
        } else {
          // const { base64, img, slug: imgSlug } = imageData
          base64 = imageData?.base64
          img = imageData?.img
          imgSlug = imageData?.slug
        }

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
                      sizes="(min-width: 1280) 50vh, 25vh"
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
