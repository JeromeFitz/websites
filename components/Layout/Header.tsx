import cx from 'clsx'

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
        'bg-blur bg-opacity-50 dark:bg-opacity-50 z-40 top-0 sticky min-w-full',
        `flex flex-row content-center items-center`
      )}
    >
      <Blur />
      <div
        className={cx(
          'flex flex-row justify-between items-center',
          'w-full max-w-4xl',
          'mx-auto',
          'my-0 md:my-1',
          'p-2 md:p-4'
        )}
      >
        <Navigation />
        <ThemeMode />
      </div>
    </header>
  )
}

export default Header
