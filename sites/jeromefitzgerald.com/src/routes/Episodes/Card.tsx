import {
  Badge,
  // Emoji,
  Paragraph,
  Spacer,
  Text,
  CardOuter,
  ImageBlur,
  Card,
} from '@jeromefitz/design-system'
import {
  css_card,
  CardContent,
  CardImage,
  CardImageContainer,
  CardMeta,
  CardTitle,
} from '@jeromefitz/design-system/custom/Card'
import type { Episode as EpisodeProperties } from '@jeromefitz/notion/schema'
import { ImageWithBackgroundBlur } from '@jeromefitz/shared/src/components'
import { IMAGE__PLACEHOLDER } from '@jeromefitz/shared/src/lib/constants'
import type { IGetPlaiceholderReturnCustom } from '@jeromefitz/shared/src/lib/types'
import { lpad } from '@jeromefitz/utils'
import _isEmpty from 'lodash/isEmpty'
import { getNotion } from 'next-notion/src/helper'
import { fetcher } from 'next-notion/src/lib/fetcher'
// import _map from 'lodash/map'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { notionConfig } from '~config/index'

const notion = getNotion(notionConfig)
const { NOTION } = notionConfig

// @refactor(types)
interface IconProps {
  type: 'emoji'
  emoji: string
}
interface ItemDefault {
  archived: boolean
  cover: any
  created_time: string // date
  icon: IconProps
  id: string
  last_edited_time: string // date
  url: string
}
interface Item extends ItemDefault {
  object: 'page'
  parent: any
  properties: EpisodeProperties
}

const EpisodesCard = ({
  images,
  item,
}: // routeType,
{
  images: any
  item: Item
  // routeType: string
}) => {
  const router = useRouter()
  const meta = router.asPath.split('/').slice(1)

  const {
    episode,
    season,
    seoDescription,
    seoImage,
    seoImageDescription: description,
    // slug,
    title,
  } = item?.properties

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = notion.custom.getInfoType({
    item,
    routeType: NOTION.PODCASTS.slug,
    meta,
  })

  /**
   * @refactor(images) passing images from SSR is not ideal
   * @note(notion) this is based off of seoImage only at the moment
   * @note(image) check against the first key in `images` only (seoImage)
   */
  const imageSlug = !!seoImage && Object.keys(seoImage)[0]
  const url = !!imageSlug && seoImage[imageSlug]?.url
  const fallbackData: IGetPlaiceholderReturnCustom =
    !!url && !!images && !!imageSlug
      ? images[`image/${imageSlug}`]
      : {
          base64: IMAGE__PLACEHOLDER.base64,
          id: IMAGE__PLACEHOLDER.id,
          img: { ...IMAGE__PLACEHOLDER.img, src: url },
        }
  // @note(image) limit api calls
  // @refactor(lodash) _isEmpty
  // console.dir(`Shows > Episodes > fallbackData`)
  // console.dir(fallbackData)
  const urlApi = !!url && _isEmpty(fallbackData) ? `/api/v1/img?url=${url}` : null
  const {
    data: { base64, id: slugImage, img },
  } = useSWR<IGetPlaiceholderReturnCustom>(urlApi, fetcher, {
    fallbackData,
  })

  return (
    <CardOuter>
      <ImageBlur
        css={{
          borderRadius: '$4',
          backgroundImage: `url(${base64})`,
          backgroundSize: 'cover',
        }}
      />

      <NextLink as={as} href={href} passHref>
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
                // sizes="(min-width: 1280) 50vh, 25vh"
                slug={slugImage}
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
              size="2"
              css={{
                border: '1px solid $colors$violet11',
                mr: '$4',
              }}
            >
              S{lpad(season)}E{lpad(episode)}
            </Badge>
          </CardMeta>
        </Card>
      </NextLink>
    </CardOuter>
  )
}

export default EpisodesCard
