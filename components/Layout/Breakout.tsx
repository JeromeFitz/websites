import cx from 'clsx'

const Breakout = ({ children }) => {
  return (
    <div
      id="breakout"
      className={cx(
        // `min-h-full py-12`,
        // 'border-t border-black dark:border-white',
        // `bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`,
        'relative w-screen'
      )}
      style={{
        left: 'calc(-50vw + 50%)',
      }}
    >
      {children}
    </div>
  )
}

export default Breakout
