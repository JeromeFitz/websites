import { cx } from '@jeromefitz/ds/utils/cx'

/**
 * @todo(a11y) should this be article instead of main
 */
function ArticleMain({ children }) {
  return (
    <main
      className={cx(
        'relative overflow-visible',
        'flex flex-none flex-col flex-nowrap place-content-start items-start gap-3',
        'h-min w-full',
        'p-0',
        'md:w-[1px] md:flex-[1_0_0px] md:gap-6',
      )}
      id="skip-nav"
      role="main"
      style={{ opacity: 1, transform: 'none' }}
    >
      {children}
    </main>
  )
}

export { ArticleMain }
