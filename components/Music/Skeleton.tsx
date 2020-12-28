import cx from 'clsx'

const maxWidth = 12

const Skeleton = ({ className = 'bg-gray-900 dark:bg-gray-100' }) => {
  const width = Math.floor(Math.random() * maxWidth)
  return (
    <div className={cx(`w-${width}/${maxWidth}`, 'h-6 pt-2 animate-pulse')}>
      <div className={cx('h-full', className)}></div>
    </div>
  )
}

export default Skeleton
