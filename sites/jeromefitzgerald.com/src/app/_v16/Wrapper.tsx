import { Flex, Grid } from '@radix-ui/themes'

import { cx } from '@/utils/cx'

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
      className={cx('mt-[126px] md:mt-[81px]', 'min-h-[72vh] md:min-h-[48vh]')}
      columns={{ initial: '12', md: '12' }}
      gap="2"
      px={{ initial: '3', md: '6' }}
      pb={{ initial: '9', md: '9' }}
      mb={{ initial: '6', md: '9' }}
      width="100%"
    >
      {children}
    </Grid>
  )
}

export { GalleryWrapper, GridWrapper }
