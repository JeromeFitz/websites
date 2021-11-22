import cx from 'clsx'

const Breakout = ({ children }) => {
  return (
    <div
      className={cx('breakout')}
      style={{
        position: 'relative',
        left: 'calc(-50vw + 50%)',
        width: '100vw',
      }}
    >
      {children}
    </div>
  )
}

export default Breakout
