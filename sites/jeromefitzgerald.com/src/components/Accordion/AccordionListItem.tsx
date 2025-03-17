import { cx } from '@jeromefitz/ds/utils/cx'

// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'

// import { useStore } from '@/store/index'

// const useStoreMenu = () => {
//   return useStore((store) => ({
//     isMenuMobileOpen: store.isMenuMobileOpen,
//     isMenuMobileOpenSet: store.isMenuMobileOpenSet,
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
          'text-gray-11',
          'flex w-full flex-row items-center justify-start select-none',
          'transition-colors',
          'my-1 gap-2 py-1',
          'md:my-1 md:gap-3 md:py-2',
          'hover:text-gray-12 hover:bg-gray-4 rounded',
        )}
      >
        <Icon
          aria-hidden
          className={cx('ml-1 size-4 min-w-4 text-[currentColor] md:ml-2')}
          label={''}
        />
        <span className="truncate">{children}</span>
      </li>
    </NextLink>
  )
}

export { AccordionListItem }
