import { cx } from '@jeromefitz/ds/utils/cx'

// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

// import { useStore } from '~store/index'

// const useStoreMenu = () => {
//   return useStore((store) => ({
//     isMenuOpen: store.isMenuOpen,
//     isMenuOpenSet: store.isMenuOpenSet,
//   }))
// }

function AccordionListItem({ children, href, icon, ...props }) {
  const Icon = icon
  return (
    <NextLink
      className={cx('cursor-pointer text-inherit no-underline')}
      href={href}
      // onClick={handleOnClick}
      {...props}
    >
      <li
        className={cx(
          'cursor-pointer no-underline',
          'text-[var(--mauve-11)]',
          'flex w-full select-none flex-row items-center justify-start',
          'transition-colors',
          'my-1 gap-2 py-1',
          'lg:my-1 lg:gap-3 lg:py-2',
          'rounded hover:bg-[var(--mauve-4)] hover:text-[var(--mauve-12)]',
        )}
      >
        <Icon
          aria-hidden
          className={cx('ml-1 size-4 min-w-4 text-[currentColor] lg:ml-2')}
          label={''}
        />
        <span className="truncate text-base">{children}</span>
      </li>
    </NextLink>
  )
}

export { AccordionListItem }
