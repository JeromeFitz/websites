'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * @todo(data)
 *
 * - [ ] pull from store/api not pass-through props
 * - [ ] different types of data to show:
 * - - events
 * - - music
 * - - reading
 * - - etc.
 *
 */
import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import {
  Content as TabsContent,
  List as TabsList,
  Root as TabsRoot,
  Trigger as TabsTrigger,
} from '@radix-ui/themes/dist/esm/components/tabs.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _map from 'lodash/map.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { usePathname } from 'next/navigation.js'

import { BANNERS, banners } from '@/data/banners'

import styles from './Banner.module.css'

function BannerClient() {
  const path = usePathname()
  // const [defaultValue, defaultValueSet] = useState(BANNERS.LISTENING)
  // if (path === '/') defaultValueSet(BANNERS.UPCOMING)
  // if (path === '/currently/listening-to') defaultValueSet(BANNERS.READING)

  let defaultValue = BANNERS.LISTENING
  if (path === '/') defaultValue = BANNERS.UPCOMING
  if (path === '/currently/listening-to') defaultValue = BANNERS.READING

  return (
    <Flex
      align="center"
      direction="row"
      display={{ initial: 'flex', md: 'flex' }}
      gap="1"
      gridColumn="1/-1"
      justify="center"
      my="2"
      px="2"
      width="100%"
    >
      {/* @ts-ignore */}
      <TabsRoot className="w-[inherit]" defaultValue={defaultValue} size="1">
        <Box pb="1" pt="2" px="0">
          {/* @ts-ignore */}
          <TabsContent value={BANNERS.UPCOMING}>
            <BannerMobile data={banners[BANNERS.UPCOMING]} />
            <BannerDesktop data={banners[BANNERS.UPCOMING]} />
          </TabsContent>
          {/* @ts-ignore */}
          <TabsContent value={BANNERS.READING}>
            <BannerMobile data={banners[BANNERS.READING]} />
            <BannerDesktop data={banners[BANNERS.READING]} />
          </TabsContent>
          {/* @ts-ignore */}
          <TabsContent value={BANNERS.LISTENING}>
            <BannerMobile data={banners[BANNERS.LISTENING]} />
            <BannerDesktop data={banners[BANNERS.LISTENING]} />
          </TabsContent>
        </Box>
        {/* @ts-ignore */}
        <TabsList className="mx-auto flex w-fit justify-center gap-1" size="1">
          {_map(BANNERS, (banner, i) => {
            return (
              // @ts-ignore
              <TabsTrigger
                aria-label={banner}
                className={cx(
                  'group hover:cursor-pointer',
                  'before:h-0.5',
                  `before:bg-transparent`,
                  'transition-all',
                  styles['test'],
                )}
                key={`banner--${i}--${banner}`}
                // style={{ borderColor: `var(--${banners[banner]?.badge.color}-11)` }}
                style={{
                  '--test': `var(--${banners[banner]?.badge.color}-11)`,
                }}
                value={banner}
              >
                <Text
                  as="span"
                  className={cx(
                    'group-data-[state=inactive]:opacity-50',
                    styles['test1'],
                  )}
                  size="1"
                  style={{
                    '--test': `var(--${banners[banner]?.badge.color}-11)`,
                  }}
                >
                  ●
                </Text>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </TabsRoot>
    </Flex>
  )
}

function BannerDesktop({ data }) {
  return (
    <Flex
      align="center"
      direction="row"
      display={{ initial: 'none', md: 'flex' }}
      gap="1"
      gridColumn="1/-1"
      justify="center"
      mb="2"
      mt="2"
      width="100%"
    >
      <Flex
        align="center"
        as="span"
        display="flex"
        flexShrink="0"
        justify="center"
        minWidth="1.25rem"
        mr="1"
      >
        <Badge
          color={data.badge.color}
          highContrast={false}
          radius="full"
          size="2"
          variant="soft"
        >
          {data.icon}
          {data.badge.text}
        </Badge>
      </Flex>
      <Box
        as="span"
        className="truncate"
        display="inline-block"
        maxWidth="24rem"
        minWidth="16rem"
        px="2"
        py="0"
        width="100%"
      >
        <Text as="span">{data.content.desktop}</Text>
      </Box>
      <Button
        asChild
        color={data.badge.color}
        highContrast={false}
        radius="full"
        size="2"
        variant="surface"
      >
        <NextLink href={data.href}>
          {data.button.text}
          {` `}
          {data.button.icon}
        </NextLink>
      </Button>
    </Flex>
  )
}

function BannerMobile({ data }) {
  return (
    <Flex
      align="center"
      asChild
      className={cx(
        '[--icon-size:16px]',
        'group transition-transform',
        'active:translate-y-0.5',
        'bg-grayA-2 active:bg-grayA-3',
        'text-accent-12 active:text-accentA-12',
        'rounded-3 shadow-3 cursor-pointer leading-7',
        '',
      )}
      data-radius="full"
      display={{
        initial: 'flex',
        md: 'none',
      }}
      gridColumn="1/-1"
      justify="center"
      my="2"
      px="2"
      py="0"
      width="100%"
    >
      <NextLink
        data-active="false"
        data-prefix="true"
        data-version="v1"
        date-suffix="true"
        href={data.href}
        role="link"
        tabIndex={0}
        type="submit"
      >
        <Flex
          align="center"
          as="span"
          flexShrink="0"
          justify="center"
          // minWidth="5"
          mr="2"
          // width="100%"
        >
          <Badge color={data.badge.color} radius="full" variant="solid">
            {data.icon}
          </Badge>
        </Flex>
        <Box
          className="truncate"
          display="inline-block"
          maxWidth="20rem"
          minWidth="8rem"
          px="2"
          py="0"
          width="100%"
        >
          {data.content.mobile}
        </Box>
        <Flex as="span" flexShrink="0" minWidth="5" ml="2">
          <Text asChild color={data.badge.color}>
            {data.button.icon}
          </Text>
        </Flex>
      </NextLink>
    </Flex>
  )
}

export { BannerClient }
