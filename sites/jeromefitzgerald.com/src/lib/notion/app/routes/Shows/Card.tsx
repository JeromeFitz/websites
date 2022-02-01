import {
  Badge,
  Paragraph,
  Spacer,
  Text,
  CardOuter,
  ImageBlur,
  Card,
} from '@jeromefitz/design-system/components'
import {
  css_card,
  CardContent,
  CardImage,
  CardImageContainer,
  CardMeta,
  CardTitle,
} from '@jeromefitz/design-system/components/Card/Show'
import type { Show } from '@jeromefitz/notion/schema'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import NextLink from 'next/link'
import useSWR from 'swr'
import { useSound } from 'use-sound'

import { ImageWithBackgroundBlur } from '~components/Layout/ImageLead'
import { useUI } from '~context/UI'
import { IMAGE__PLACEHOLDER } from '~lib/constants'
import fetcher from '~lib/fetcher'

// @refactor(types)
interface Icon {
  type: 'emoji'
  emoji: string
}
interface ItemDefault {
  archived: boolean
  cover: any
  created_time: string // date
  icon: Icon
  id: string
  last_edited_time: string // date
  url: string
}
interface Item extends ItemDefault {
  object: 'page'
  parent: any
  properties: Show
}
const ShowsCard = ({
  images,
  item,
  routeType,
}: {
  images: any
  item: Item
  routeType: string
}) => {
  const {
    seoDescription,
    seoImage,
    seoImageDescription: description,
    slug,
    rollupShows__Tags: tags,
    title,
  } = item?.properties

  /**
   * @refactor(images) passing images from SSR is not ideal
   * @note(notion) this is based off of seoImage only at the moment
   * @note(image) check against the first key in `images` only (seoImage)
   */
  const imageSlug = !!seoImage && Object.keys(seoImage)[0]
  const url = !!imageSlug && seoImage[imageSlug]?.url
  const fallbackData =
    !!url && !!images
      ? images[imageSlug]
      : {
          base64: IMAGE__PLACEHOLDER.meta.base64,
          img: { ...IMAGE__PLACEHOLDER.meta.img, src: url },
          slug: IMAGE__PLACEHOLDER.meta.slug,
        }
  // @note(image) limit api calls
  // @refactor(lodash) _isEmpty
  const urlApi = !!url && _isEmpty(fallbackData) ? `/api/v1/img?url=${url}` : null
  const {
    data: { base64, img, slug: slugImage },
  } = useSWR<any>(urlApi, fetcher, {
    fallbackData,
  })

  const { audio } = useUI()
  const [playOn] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const handleClick = () => playOn()

  return (
    <>
      {/* <button onClick={handleClick}>WUT</button> */}
      <CardOuter>
        <ImageBlur
          css={{
            borderRadius: '$4',
            backgroundImage: `url(${base64})`,
            backgroundSize: 'cover',
          }}
        />

        <NextLink
          href={`/${routeType.toLowerCase()}/${slug}`}
          passHref
          prefetch={false}
        >
          <a onClick={handleClick} style={{ textDecoration: 'none' }}>
            <Card variant="interactive" css={css_card}>
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
                    priority={false}
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
          </a>
        </NextLink>
      </CardOuter>
    </>
  )
}

export default ShowsCard
