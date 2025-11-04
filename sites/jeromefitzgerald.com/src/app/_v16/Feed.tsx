import { AspectRatio, Box, Em, Flex, Grid, Text } from '@radix-ui/themes'
import NextLink from 'next/link'

import { StarIcon } from '@/components/Icon'
import { ImageClient as NextImage } from '@/components/Notion/Blocks/Image.client'
import { cx } from '@/utils/cx'

import { image } from './_meta'
import { LinkButton } from './LinkButton'

const FeedContainer = ({ children }: { children: React.ReactNode }) => {
  return <Flex>{children}</Flex>
}

const FeedWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      columns={{ initial: '12', md: '12' }}
      gap="2"
      px={{ initial: '3', md: '6' }}
      pb={{ initial: '3', md: '6' }}
      width="100%"
    >
      {children}
    </Grid>
  )
}

const FeedTag = () => {
  return (
    <Flex
      direction="column"
      gap="2"
      justify="start"
      gridColumnStart={{ initial: '1', md: '1' }}
      gridColumnEnd={{ initial: '5', md: '7' }}
    >
      <LinkButton
        icon={<StarIcon />}
        href="https://jeromefitzgerald.com/shows"
        text="Shows"
        variant="soft"
      />
      <Box pl="3" display={{ initial: 'none', md: 'block' }}>
        <Flex direction="column" gap="3">
          <Text size={{ initial: '2', md: '3' }}>
            These are shows with considerable runs that I have either been in, or am
            still in.
          </Text>
          <Text color="gold" size={{ initial: '2', md: '3' }}>
            <Em>The following 2 are random. Full breakdown is here.</Em>
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

const FeedTagContainer = () => {
  return (
    <Grid
      // direction={{ initial: 'column', md: 'row' }}
      columns={{ initial: '1', md: '2' }}
      gapX={{ initial: '6', md: '2' }}
      gapY={{ initial: '6', md: '6' }}
      gridColumnStart={{ initial: '5', md: '7' }}
      gridColumnEnd={{ initial: '13', md: '13' }}
    >
      <FeedTagContainerItem />
      <FeedTagContainerItem />
      <FeedTagContainerItem />
      <FeedTagContainerItem />
    </Grid>
  )
}

const FeedTagContainerItem = () => {
  return (
    <Box className="h-fit">
      <Flex
        asChild
        className={cx(
          'group hover:cursor-pointer',
          'focus:outline-gold-indicator',
          'focus:rounded-xl focus:outline-1 focus:outline-offset-3',
        )}
        gap="2"
        direction="column"
        gridColumnStart={{ initial: '1', md: '7' }}
        gridColumnEnd={{ initial: '7', md: '10' }}
      >
        <NextLink href="/shows/jerome-and">
          <LinkButton tabIndex={-1} icon={<StarIcon />} text="Jerome &" />
          <Flex
            direction="column"
            gap="2"
            pt="1"
            className={cx(
              'transition-transform duration-300 ease-in-out',
              'group-focus:-translate-y-0.5 group-hover:-translate-y-0.5 translate-y-0',
            )}
          >
            <AspectRatio ratio={4 / 3}>
              <NextImage {...image} />
            </AspectRatio>
            <Box asChild pl="1">
              <Text as="p" color="gold" size={{ initial: '1' }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                dolor animi accusantium atque necessitatibus inventore porro, nihil
                totam aliquam eos!
              </Text>
            </Box>
          </Flex>
        </NextLink>
      </Flex>
    </Box>
  )
}

export {
  FeedContainer,
  FeedWrapper,
  FeedTag,
  FeedTagContainer,
  FeedTagContainerItem,
}
