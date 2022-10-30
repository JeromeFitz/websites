import {
  // darkTheme,
  Banner,
  Container,
  Flex,
  Icon,
  // IconButton,
  Link,
  Separator,
  Skeleton,
  Text,
} from '@jeromefitz/design-system'
import { TZ } from '@jeromefitz/shared/src/lib/constants'
import { Shadows } from '@jeromefitz/shared/src/styles/const'
// import { Gradients, Shadows } from '@jeromefitz/shared/src/styles/const'
import { parseISO } from 'date-fns'
import { formatInTimeZone as _formatInTimeZone } from 'date-fns-tz'
import _orderBy from 'lodash/orderBy'
import { fetcher } from 'next-notion/src/lib/fetcher'
import { getNextPageStatus } from 'next-notion/src/utils'
import NextLink from 'next/link'
import { Fragment } from 'react'
import useSWR from 'swr'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

const LinkComponent = ({ children, href }) => {
  if (!!href)
    return (
      <NextLink href={href} legacyBehavior passHref>
        {children}
      </NextLink>
    )
  return <Fragment>{children}</Fragment>
}

const SkeletonText = () => {
  return (
    <Skeleton
      as="span"
      variant="heading"
      css={{
        fontSize: 'inherit',
        height: '$fontSizes$3',
        pr: '$space$12',
      }}
    >
      &nbsp;
    </Skeleton>
  )
}

const BannerImpl = () => {
  const audio = useStore.use.audio()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()

  const [playBleep] = useSound(sounds.bleep, {
    soundEnabled: audio,
    volume,
  })

  const url = '/events'
  const { data, error } = useSWR<any>(
    () => `/api/v1/cms/events?cache=false`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const { is404, isDataUndefined, isError, isLoading } = getNextPageStatus(
    data,
    error,
    url
  )

  const isLoaded = !is404 && !isLoading && !isError && !isDataUndefined
  const items = data?.items?.results
  const itemsSorted = _orderBy(items, ['properties.dateEvent.start'], ['asc'])
  const item = itemsSorted[0]
  const hasItem = isLoaded && !!item
  // if (!hasItem) return null

  const meta = hasItem
    ? {
        left: _formatInTimeZone(
          parseISO(item?.properties?.dateEvent?.start),
          TZ,
          `EEE MM/dd`
        ).toUpperCase(),
        leftExtended: _formatInTimeZone(
          parseISO(item?.properties?.dateEvent?.start),
          TZ,
          `EEE MM/dd hh:mma`
        ).toUpperCase(),
        leftIcon: <Icon.Calendar />,
        rightExtended: item?.properties?.title,
        rightIcon: <Icon.ArrowTopRight />,
        url: `/events/${_formatInTimeZone(
          parseISO(item?.properties?.dateEvent?.start),
          TZ,
          `yyyy/MM/dd`
        ).toUpperCase()}/${item?.properties?.slug}`,
      }
    : {
        left: <SkeletonText />,
        leftExtended: <SkeletonText />,
        leftIcon: <Icon.Calendar />,
        right: <SkeletonText />,
        rightExtended: <SkeletonText />,
        rightIcon: <Icon.ArrowTopRight />,
        url: null,
      }

  return (
    <Container breakout css={{ zIndex: '$max' }}>
      <LinkComponent href={meta.url}>
        <Link onClick={() => playBleep()}>
          <Banner
            css={{
              // backgroundImage: Gradients.light.active,
              // [`.${darkTheme} &`]: { backgroundImage: Gradients.dark.active },
              alignContent: 'flex-start',
              backgroundColor: '$brand',
              boxShadow: Shadows[1],
              color: '$loContrast',
              display: 'flex',
              py: '$3',
              textAlign: 'center',
              transition: 'all 0.5s ease-in-out',
              width: '100%',

              '@bp1': {
                py: '$4',
              },
              '@hover': {
                '&:hover': {
                  color: '$hiContrast',
                },
              },
            }}
          >
            {meta?.leftIcon}
            <Text size="2" weight="5" css={{ lineHeight: '1.5' }}>
              {meta?.leftExtended}
            </Text>
            <Separator asChild orientation="vertical">
              <span />
            </Separator>
            <Flex direction="row" gap="1" align="center">
              <Text size="2" weight="5" css={{ lineHeight: '1.5' }}>
                {meta?.rightExtended}
              </Text>
              {meta?.rightIcon}
            </Flex>

            {/* <IconButton
              css={{ mr: '$4', position: 'absolute', right: 0 }}
              variant="ghost"
            >
              <Icon.Cross1 />
            </IconButton> */}
          </Banner>
        </Link>
      </LinkComponent>
    </Container>
  )
}

export { BannerImpl as Banner }
