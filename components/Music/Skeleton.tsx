import cx from 'clsx'

const maxWidth = 12

const Skeleton = ({ className = 'bg-gray-900 dark:bg-gray-100', type = 'text' }) => {
  // const width = Math.floor(Math.random() * maxWidth)
  const width = 8
  return (
    <div
      className={cx(
        'animate-pulse',
        { [`w-${width}/${maxWidth}`]: type === 'text' },
        { 'h-6 pt-2': type === 'text' },
        { 'h-full w-full': type === 'image' }
      )}
    >
      <div className={cx('h-full', className)}></div>
    </div>
  )
}

export default Skeleton
