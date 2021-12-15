const Breakout = ({ children }) => {
  return (
    <div
      className={'breakout'}
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
