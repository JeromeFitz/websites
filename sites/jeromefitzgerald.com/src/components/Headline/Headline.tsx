import { cx } from '@jeromefitz/ds/utils/cx'

import type { HeadingProps } from '@radix-ui/themes/dist/esm/components/heading.js'
import type { TextProps } from '@radix-ui/themes/dist/esm/components/text.js'
import type { ReactNode } from 'react'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

interface AdditionalProps {
  children: ReactNode
  className?: string
}
type HeadlineColumnAProps = AdditionalProps & { separateTitle?: boolean }
type HeadlineContentProps = AdditionalProps
type HeadlineTitleProps = AdditionalProps & HeadingProps
type HeadlineTitleSubProps = AdditionalProps
type HeadlineTitleTextProps = AdditionalProps & TextProps
function HeadlineColumnA({ children, separateTitle = true }: HeadlineColumnAProps) {
  return (
    <Box
      className={cx(
        'col-span-full md:col-span-3',
        'flex flex-col justify-start',
        'h-fit',
        'md:h-44 md:max-h-56 md:min-h-44',
        'md:sticky md:top-28',
        '',
      )}
    >
      <Box className={cx('h-[inherit]', 'md:h-full md:max-h-56 md:min-h-44')}>
        <Flex
          className={cx('h-[inherit]', separateTitle && 'justify-between')}
          direction="column"
          gap={{ initial: '4', md: '0' }}
          height="inherit"
        >
          {children}
        </Flex>
      </Box>
    </Box>
  )
}
function HeadlineContent({ children, className = '' }: HeadlineContentProps) {
  return (
    <Flex
      className={cx(
        // 'flex flex-col gap-4',
        'col-span-full md:col-span-9',
        // 'mt-4 md:mt-0',
        className,
      )}
      direction="column"
      gap="4"
      mt={{ initial: '4', md: '0' }}
    >
      {children}
    </Flex>
  )
}
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
function HeadlineTitleSub({ children, className }: HeadlineTitleSubProps) {
  return (
    <div className={cx('flex flex-row flex-wrap gap-2', 'md:mr-3', className)}>
      {children}
    </div>
  )
}
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

export {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
  HeadlineTitleText,
}
