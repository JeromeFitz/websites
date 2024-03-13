import { cx } from '@jeromefitz/ds/utils/cx'

import type { HeadingProps } from '@radix-ui/themes/dist/esm/components/heading.js'
import type { TextProps } from '@radix-ui/themes/dist/esm/components/text.js'
import type { ReactNode } from 'react'

import { Flex } from '@radix-ui/themes'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

type AdditionalProps = {
  children: ReactNode
  className?: string
}
type HeadlineColumnAProps = AdditionalProps & { separateTitle?: boolean }
function HeadlineColumnA({ children, separateTitle = true }: HeadlineColumnAProps) {
  return (
    <Box
      className={cx(
        'col-span-full lg:col-span-3',
        'flex flex-col justify-start',
        'h-fit',
        'lg:h-44 lg:max-h-56 lg:min-h-44',
        'lg:sticky lg:top-28',
        '',
      )}
    >
      <Box className={cx('h-[inherit]', 'lg:h-full lg:max-h-56 lg:min-h-44')}>
        <Flex
          className={cx('h-[inherit]', separateTitle && 'justify-between')}
          direction="column"
          gap={{ initial: '4', lg: '0' }}
          height="inherit"
        >
          {children}
        </Flex>
      </Box>
    </Box>
  )
}
type HeadlineTitleProps = HeadingProps & AdditionalProps
function HeadlineTitle({ children, className = '', ...props }: HeadlineTitleProps) {
  return (
    <Heading
      className={cx('line-clamp-3', className)}
      size="8"
      weight="bold"
      {...props}
    >
      {children}
    </Heading>
  )
}
type HeadlineTitleTextProps = TextProps & AdditionalProps
function HeadlineTitleText({
  children,
  className,
  ...props
}: HeadlineTitleTextProps) {
  return (
    <Text
      className={cx('line-clamp-3', className)}
      size="8"
      weight="bold"
      {...props}
    >
      {children}
    </Text>
  )
}
type HeadlineTitleSubProps = AdditionalProps
function HeadlineTitleSub({ children, className }: HeadlineTitleSubProps) {
  return (
    <div className={cx('flex flex-row flex-wrap gap-2', 'lg:mr-3', className)}>
      {children}
    </div>
  )
}
type HeadlineContentProps = AdditionalProps
function HeadlineContent({ children, className = '' }: HeadlineContentProps) {
  return (
    <Flex
      className={cx(
        // 'flex flex-col gap-4',
        'col-span-full lg:col-span-9',
        // 'mt-4 lg:mt-0',
        className,
      )}
      direction="column"
      gap="4"
      mt={{ initial: '4', lg: '0' }}
    >
      {children}
    </Flex>
  )
}

export {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
  HeadlineTitleText,
}
