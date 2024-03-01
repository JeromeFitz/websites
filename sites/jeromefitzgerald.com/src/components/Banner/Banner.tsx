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
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Grid } from '@/components/Grid/index'

function BannerMobile({ data }) {
  return (
    <Flex
      align="center"
      asChild
      className={cx(
        '[--icon-size:16px]',
        'group transition-transform',
        'active:translate-y-[0.125rem]',
        'bg-grayA-2 active:bg-grayA-3',
        'text-accent-12 active:text-accentA-12',
        'rounded-3 shadow-3 cursor-pointer leading-7',
      )}
      data-radius="full"
      display={{
        initial: 'flex',
        lg: 'none',
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
          {data.button.icon}
        </Flex>
      </NextLink>
    </Flex>
  )
}

function BannerDesktop({ data }) {
  return (
    <Flex
      align="center"
      direction="row"
      display={{ initial: 'none', lg: 'flex' }}
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

      <Button asChild highContrast={false} radius="full" size="2" variant="soft">
        <NextLink href={data.href}>
          {data.button.text}
          {` `}
          {data.button.icon}
        </NextLink>
      </Button>
    </Flex>
  )
}

function Banner({ data }) {
  return (
    <Grid as="div" mx="auto" width="100%">
      <BannerMobile data={data} />
      <BannerDesktop data={data} />
    </Grid>
  )
}

export { Banner }
