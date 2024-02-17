'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { useIsomorphicEffect } from '@mantine/hooks'
import { useRef, useState } from 'react'

import { RichText, Tags } from '~app/_temp/elements'
// import { ModuleMedia } from '~app/_temp/modules'
// import { useStore } from '~store/index'

// const useStoreMenu: any = () => {
//   return useStore((store) => ({
//     isMenuOpen: store.isMenuOpen,
//   }))
// }

const isReady = true
const headlineTitle = 'My Dinner with André: The Musical'
const sublineTitle = 'The Criterion Collection'
const text =
  'A one-of-a-kind surreal musical from one of the choicest films of all-time. Staged to sold-out houses a few times in 2017.'

type TopBarProps = {
  className?: string
  description?: string
  isHidden?: boolean
  isHiddenTags?: boolean
  isHiddenTitle?: boolean
  isUppercase?: boolean
  label?: string
  tags?: string[]
  title?: string
  zzz?: any
}

function TopBar({
  className = '',
  description = text,
  isHidden = false,
  isHiddenTags = false,
  isHiddenTitle = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isUppercase = true,
  label = sublineTitle,
  tags = [],
  title = headlineTitle,
  zzz: CustomComponent,
}: TopBarProps) {
  // const { isMenuOpen } = useStoreMenu()
  const refHeadline: any = useRef(null)
  const [width, widthSet] = useState(0)
  const [height, heightSet] = useState(0)
  useIsomorphicEffect(() => {
    widthSet(refHeadline.current.offsetWidth)
    heightSet(refHeadline.current.offsetHeight)
  }, [refHeadline])

  // console.dir(`width:  ${width}`)
  // console.dir(`height: ${height}`)

  return (
    <>
      {/* top bar */}
      <div
        className={cx(
          '[--start:calc(100%_-_var(--sidebar-width))]',
          'pt-[calc(var(--header-height)_+_2.5rem)]',
          'md:[mask-image:linear-gradient(90deg,#000_var(--start),rgba(0,0,0,.4)_calc(var(--start)_+_var(--sidebar-width)*.1),transparent_90%)]',
          'overflow-x-hidden',
        )}
      >
        {/* title */}
        <div
          className={cx(
            'pl-[var(--grid-margin)]',
            'pr-[var(--grid-margin)]',
            '',
            isHidden && 'hidden',
            '',
          )}
        >
          {/* sweep */}
          {/* sweep calc(var(--width)*4ms) infinite alternate ease-in-out */}
          <div
            className={cx(
              'w-fit',
              // 'w-full',
              'origin-left',
              'animate-sweep',
              // !isMenuOpen && 'animate-sweep',
              // 'md:animate-sweep'
              // 'w-[var(--width)]',
              // 'h-[var(--height)]'
            )}
            style={{
              '--height': height,
              '--width': width,
            }}
          >
            <h1
              aria-label={title}
              className={cx(
                // @note(WHAT) this is ... the bane of my existence
                // with this? works -- but all height/width RUINED
                'whitespace-pre',
                'font-sans',
                'text-4xl font-black tracking-normal',
                'md:text-5xl md:font-black md:tracking-tight',
                // isUppercase && 'uppercase md:text-6xl',
                isHiddenTitle && 'hidden',
                className,
                // '',
                // 'before:relative',
                // 'before:left-0',
                // 'before:text-[var(--accent-9)]',
                // 'before:top-0',
                // // 'before:opacity-100',
                // 'before:min-h-full before:min-w-full',
                // // `before:content-["${headlineTitleAria}"]`,
                // 'before:content-[var(--headline-text)]',
                // // `before:content-["NOOOOOOO_OOOOFOOOFOFOFOF"]`,
                // // 'before:whitespace-pre',
                // `after:content-["_"]`
                // // 'opacity-0 before:opacity-100',
                // 'w-full',
                // 'h-full'
              )}
              ref={refHeadline}
              style={{
                '--headline-text': `"${title}"`,
              }}
            >
              {title}
              {/* &nbsp; */}
            </h1>
          </div>
        </div>
        {/* content */}
        <div
          className={cx(
            'grid items-start gap-[2rem_var(--grid-gap)]  pl-[var(--grid-margin)]',
            'md:grid-cols-[calc(var(--cols)*6_-_var(--gutter))_calc(var(--cols)*6_-_var(--gutter))] md:gap-[3rem_var(--grid-gap)]',
            'py-8 md:pt-4',
          )}
        >
          {isReady && (
            <RichText
              className={cx('pr-[var(--grid-margin)]', '', '')}
              label={label}
              text={description}
            />
          )}
          {!!CustomComponent && <CustomComponent />}
          {!isHiddenTags && <Tags tags={tags} />}
        </div>
      </div>
      {/* <ModuleMedia /> */}
    </>
  )
}

export { TopBar }
