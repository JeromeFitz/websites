import { Flex } from '@radix-ui/themes'

import { cx } from '@/utils/cx'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      asChild
      direction="column"
      width="100%"
      className={cx(
        'gap-1.5',
        'px-5 pt-24 pb-36',
        'md:px-9 md:pt-36 md:pb-48',
        // 'md:pt-[3%] md:pr-[6%] md:pb-[200px] md:pl-[6%]',
      )}
    >
      <main>{children}</main>
    </Flex>
  )
}

export { Main }
