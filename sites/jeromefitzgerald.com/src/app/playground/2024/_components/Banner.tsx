import { ArrowRightIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge, Button } from '@radix-ui/themes'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

type Data = {
  badge: {
    color:
      | 'amber'
      | 'blue'
      | 'bronze'
      | 'brown'
      | 'crimson'
      | 'cyan'
      | 'gold'
      | 'grass'
      | 'gray'
      | 'green'
      | 'indigo'
      | 'iris'
      | 'jade'
      | 'lime'
      | 'mint'
      | 'orange'
      | 'pink'
      | 'plum'
      | 'purple'
      | 'red'
      | 'ruby'
      | 'sky'
      | 'teal'
      | 'tomato'
      | 'violet'
      | 'yellow'
    text: string
  }
  button: { icon: any; text: string }
  content: { desktop: string; mobile: string }
  href: string
}

function Banner() {
  const data: Data = {
    badge: {
      color: 'lime',
      text: 'Playing…',
    },
    button: {
      icon: <ArrowRightIcon className={cx('text-[var(--accent-11)]')} />,
      text: 'Go to Music',
    },
    content: {
      desktop: 'Amyl and The Sniffers – “Comfort To Me”',
      mobile: 'Amyl and The Sniffers – “Comfort To Me”',
    },
    href: '/playground/2024',
  }

  return (
    <div className={cx('font-sans text-base')}>
      <NextLink
        className={cx(
          '[--icon-size:16px]',
          'rounded-full shadow-md',
          'h-8',
          'px-2 py-0',
          'mb-6 mt-2',
          'bg-[var(--accent-1)] dark:bg-[var(--accent-2)]',
          'active:bg-[var(--gray-7)] dark:active:bg-[var(--gray-2)]',
          'max-w-full items-center justify-center  leading-5',
          'flex flex-row',
          'md:hidden',
          'relative z-10 w-fit',
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
            {data.badge.text}
          </Badge>
        </span>
        <span
          className={cx(
            'inline-block w-full px-2 py-0',
            'truncate',
            'min-w-32 max-w-60',
          )}
        >
          {data.content.mobile}
        </span>
        <span className={cx('ml-2 flex min-w-5 shrink-0')}>{data.button.icon}</span>
      </NextLink>
      <div
        className={cx(
          'mx-auto mb-8 mt-10',
          'w-full max-w-5xl',
          'items-center justify-center gap-2',
          'hidden',
          'md:flex md:flex-row',
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
            // 'text-[var(--gray-12)] hover:text-[var(--gray-11)]',
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
    </div>
  )
}

export { Banner }
