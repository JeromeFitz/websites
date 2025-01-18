import { cx } from '@jeromefitz/ds/utils/cx'

import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
// import _isEmpty from 'lodash/isEmpty.js'

function ContainerHeaderSidebar({ children }) {
  return (
    <header
      className={cx(
        'z-0 flex flex-[1_0_0px] flex-col flex-nowrap content-center items-start justify-between overflow-auto will-change-transform',
        'relative top-[unset] h-min w-full max-w-[unset] flex-none',
        'md:sticky md:top-24 md:h-[88vh] md:w-full md:max-w-[309px]',
      )}
      data-name="Side Bar"
      id="header--sidebar"
      style={{ opacity: 1, transform: 'perspective(1200px)' }}
    >
      {children}
    </header>
  )
}

function HeaderSidebar({
  children = <></>,
  className = '',
  hasBorder = true,
  title = '',
}) {
  // const isTitleEmpty = _isEmpty(title)
  const isTitleEmpty = title === ''
  return (
    <ContainerHeaderSidebar>
      <div
        className={cx(
          'h-min w-full',
          // 'size-full',
          'relative flex flex-none flex-col flex-nowrap place-content-start items-start gap-0 overflow-visible',
          'px-0 pb-6 pt-0 md:p-0',
          hasBorder && 'rounded-3 border-gray-7 border-1',
          className,
        )}
        id="header-top"
      >
        {!isTitleEmpty && (
          <div
            className={cx(
              'relative z-30 flex h-min w-full flex-none flex-col flex-nowrap place-content-start items-start gap-3 overflow-hidden p-5',
              isTitleEmpty && 'hidden',
              '',
            )}
            id="header-info"
          >
            <Heading
              as="h1"
              className={cx(
                'line-clamp-2 font-medium',
                // 'md:min-h-[60px]',
                '',
              )}
              size="6"
            >
              {title}
            </Heading>
          </div>
        )}

        <div
          className={cx(
            // 'h-min w-full ',
            'size-full',
            'relative flex-none',
            'flex flex-col justify-between',
            // 'pb-2',
          )}
          id="header-container"
        >
          {children}
        </div>
      </div>
    </ContainerHeaderSidebar>
  )
}

export { ContainerHeaderSidebar, HeaderSidebar }
