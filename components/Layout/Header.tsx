/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SkipNavLink } from '@reach/skip-nav'
import cx from 'clsx'

// @ts-ignore
import { Navigation, ThemeMode } from '~components/Layout'

const Blur = () => {
  return (
    <svg className="svg-blur" style={{ display: 'none' }}>
      <filter id="sharpBlur">
        <feGaussianBlur stdDeviation="36"></feGaussianBlur>
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
        ></feColorMatrix>
        <feComposite in2="SourceGraphic" operator="in"></feComposite>
      </filter>
    </svg>
  )
}

const Header = () => {
  return (
    <header
      className={cx(
        'min-w-full',
        `flex flex-row content-center items-center`,
        'bg-white dark:bg-black',
        // `top-0 sticky `
        `z-20 `,
        ``
      )}
    >
      <SkipNavLink />
      <Blur />
      <div
        className={cx(
          'flex flex-col md:flex-row justify-between items-center',
          'w-full md:max-w-4xl',
          'mx-auto',
          'my-0 md:my-1',
          'p-2 md:p-4'
        )}
      >
        <Navigation handleClick={() => {}} />
        <ThemeMode />
      </div>
    </header>
  )
}

export default Header
