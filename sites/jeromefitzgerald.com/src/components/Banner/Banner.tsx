import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge, Button } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

import { Grid } from '@/components/Grid'

function Banner({ data }) {
  return (
    <Grid as="div" className="mx-auto w-full font-sans text-base">
      <NextLink
        className={cx(
          '[--icon-size:16px]',
          'rounded-full shadow-md',
          'h-8',
          'px-2 py-0',
          'my-2',
          'bg-[var(--accent-1)] dark:bg-[var(--accent-2)]',
          'active:bg-[var(--mauve-7)] dark:active:bg-[var(--mauve-2)]',
          'leading-5',
          'col-span-full flex flex-row lg:hidden',
          'items-center justify-center gap-2',
          // 'relative z-10 w-fit',
          'transition-transform',
          'group active:translate-y-[0.125rem]',
          'outline-offset-2 outline-[blue]',
          'border-1 border-black/35 dark:border-white/35',
        )}
        data-active="false"
        data-prefix="true"
        data-version="v1"
        date-suffix="true"
        href={data.href}
        role="link"
        tabIndex={0}
        type="submit"
      >
        <span
          className={cx(
            'mr-[2px] flex min-w-5 shrink-0 items-center justify-center',
          )}
        >
          <Badge
            className={cx(
              // 'group-active:opacity-90',
              '',
            )}
            color={data.badge.color}
            radius="full"
            variant="solid"
          >
            {data.icon}
          </Badge>
        </span>
        <span
          className={cx(
            'inline-block w-full px-2 py-0',
            'truncate',
            'min-w-32 max-w-80',
          )}
        >
          {data.content.mobile}
        </span>
        <span className={cx('ml-2 flex min-w-5 shrink-0')}>{data.button.icon}</span>
      </NextLink>
      <div
        className={cx(
          'mb-2 mt-4',
          'hidden lg:col-span-full lg:flex lg:flex-row',
          'items-center justify-center gap-2',
        )}
      >
        <span
          className={cx(
            'mr-[2px] flex min-w-5 shrink-0 items-center justify-center',
          )}
        >
          <Badge
            className={cx('')}
            color={data.badge.color}
            highContrast={false}
            radius="full"
            size="2"
            variant="solid"
          >
            {data.icon}
            {data.badge.text}
          </Badge>
        </span>
        <span
          className={cx(
            'inline-block w-full px-2 py-0',
            'truncate',
            'min-w-60 max-w-96',
          )}
        >
          {data.content.desktop}
        </span>

        <Button
          asChild
          className={cx(
            // 'bg-[#ffffff] hover:bg-[#ffffff]/5',
            // 'dark:bg-[#000000] dark:hover:bg-[#fff]/5',
            // 'text-[var(--accent-11)] hover:text-[var(--accent-12)]',
            // 'text-[var(--mauve-12)] hover:text-[var(--mauve-11)]',
            // 'transition-all',
            '',
          )}
          // color="pink"
          highContrast={false}
          radius="full"
          size="2"
          variant="outline"
        >
          <NextLink href={data.href}>
            {data.button.text}
            {` `}
            {data.button.icon}
          </NextLink>
        </Button>
      </div>
    </Grid>
  )
}

export { Banner }
