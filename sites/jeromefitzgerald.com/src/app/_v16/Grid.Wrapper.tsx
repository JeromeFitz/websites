import { Grid } from '@radix-ui/themes'

import { cx } from '@/utils/cx'

const GridWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      className={cx('mt-[126px] md:mt-[180px]', 'min-h-[72vh] md:min-h-[54vh]')}
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

export { GridWrapper }
