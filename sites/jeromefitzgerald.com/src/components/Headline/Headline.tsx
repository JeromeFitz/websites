import { cx } from '@jeromefitz/ds/utils/cx'

import type { HeadingProps } from '@radix-ui/themes/dist/esm/components/heading.js'
import type { TextProps } from '@radix-ui/themes/dist/esm/components/text.js'
import type { ReactNode } from 'react'

/**
 * @todo(radix-ui) issue w/ flex.props.js init order
 *
 * ref: https://github.com/JeromeFitz/websites/pull/2341
 */
import { Flex } from '@radix-ui/themes'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
// import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

type AdditionalProps = {
  children: ReactNode
  className?: string
}
type HeadlineColumnAProps = { separateTitle?: boolean } & AdditionalProps
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
type HeadlineTitleProps = AdditionalProps & HeadingProps
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
type HeadlineTitleTextProps = AdditionalProps & TextProps
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
    <div className={cx('flex flex-row flex-wrap gap-2', 'md:mr-3', className)}>
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

export {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
  HeadlineTitleText,
}
