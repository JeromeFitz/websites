import {
  // darkTheme,
  Banner,
  Container,
  Flex,
  Icon,
  // IconButton,
  Link,
  Separator,
  // Skeleton,
  Text,
} from '@jeromefitz/design-system'
import { Shadows } from '@jeromefitz/shared/src/styles/const'
// import { format, parseISO } from 'date-fns'
import { fetcher } from 'next-notion/src/lib/fetcher'
import { getNextPageStatus } from 'next-notion/src/utils'
import NextLink from 'next/link'
import useSWR from 'swr'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

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
  const item = data?.items?.results[0]
  const hasItem = isLoaded && !!item
  if (!hasItem) return null

  // console.dir(`error:`)
  // console.dir(error)
  // console.dir(`data:`)
  // console.dir(data)
  // console.dir(`item:`)
  // console.dir(item)

  {
    /* <Skeleton
        as="span"
        variant="heading"
        css={{
          fontSize: 'inherit',
          height: '$fontSizes$3',
          pr: '$space$8',
        }}
      >
        &nbsp;
      </Skeleton> */
  }

  // const meta = {
  //   left: format(
  //     parseISO(item?.properties?.dateEvent?.start),
  //     `EEE MM/dd`
  //   ).toUpperCase(),
  //   leftExtended: format(
  //     parseISO(item?.properties?.dateEvent?.start),
  //     `EEE MM/dd hh:mma`
  //   ).toUpperCase(),
  //   leftIcon: <Icon.Calendar />,
  //   rightExtended: item?.properties?.title,
  //   rightIcon: <Icon.ArrowTopRight />,
  //   url: `/events/${format(
  //     parseISO(item?.properties?.dateEvent?.start),
  //     `yyyy/MM/dd`
  //   ).toUpperCase()}/${item?.properties?.slug}`,
  // }

  const meta = {
    url: '/',
    left: { icon: <Icon.Calendar />, text: '' },
    right: { icon: <Icon.ArrowTopRight />, text: '' },
  }

  return (
    <Container breakout css={{ zIndex: '99' }}>
      <NextLink href={meta.url} passHref>
        <Link onClick={() => playBleep()}>
          <Banner
            css={{
              // backgroundImage: Gradients.light.active,
              // [`.${darkTheme} &`]: { backgroundImage: Gradients.dark.active },
              boxShadow: Shadows[1],
              py: '$2',
              width: '100%',
            }}
          >
            {meta.left.icon}
            <Text css={{ fontWeight: 500 }} size="2">
              {meta.left.text}
            </Text>
            <Separator orientation="vertical" />
            <Flex direction="row" gap="1">
              <Text css={{ fontWeight: 500 }} size="2">
                {meta.right.text}
              </Text>
              {meta.right.icon}
            </Flex>

            {/* <IconButton
              css={{ mr: '$4', position: 'absolute', right: 0 }}
              variant="ghost"
            >
              <Icon.Cross1 />
            </IconButton> */}
          </Banner>
        </Link>
      </NextLink>
    </Container>
  )
}

export { BannerImpl as Banner }
