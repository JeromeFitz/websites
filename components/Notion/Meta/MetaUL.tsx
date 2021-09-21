import cx from 'clsx'

const MetaUL = ({ children, id, title }) => {
  return (
    <>
      <div className={cx('flex flex-col')} id={id}>
        <h5 className="font-semibold">{title}</h5>
        <ul className="flex flex-col">{children}</ul>
      </div>
    </>
  )
}

export default MetaUL
