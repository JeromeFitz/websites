import type { ReactNode } from 'react'

import { Box, Flex, Grid } from '@radix-ui/themes'

import { cx } from '@/utils/cx'

const WrapperLeft = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      gridColumnStart={{ initial: '1', md: '1' }}
      gridColumnEnd={{ initial: '13', md: '7' }}
      py="2"
      pr="2"
    >
      <Flex width="100%">{children}</Flex>
    </Box>
  )
}
const WrapperRight = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      gridColumnStart={{ initial: '1', md: '7' }}
      gridColumnEnd={{ initial: '13', md: '13' }}
    >
      <Flex
        direction="column"
        justify="start"
        py="2"
        pr="2"
        gap={{ initial: '4', md: '6' }}
        width="100%"
      >
        {children}
      </Flex>
    </Box>
  )
}

const GalleryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      direction="column"
      className="gap-x-2 gap-y-7 md:gap-2"
      pb={{ initial: '90px', md: '150px' }}
    >
      {children}
    </Flex>
  )
}

const GridWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      // className={cx('mt-[126px] md:mt-[81px]', 'min-h-[72vh] md:min-h-[48vh]')}
      className={cx(
        // 'mt-31.5 md:mt-20.25',
        'min-h-[72vh] md:min-h-[48vh]',
      )}
      columns={{ initial: '12', md: '12' }}
      gap="2"
      pl={{ initial: '3', md: '0' }}
      pr={{ initial: '3', md: '6' }}
      pb={{ initial: '9', md: '9' }}
      mb={{ initial: '6', md: '9' }}
      width="100%"
    >
      {children}
    </Grid>
  )
}

export { GalleryWrapper, GridWrapper, WrapperLeft, WrapperRight }
