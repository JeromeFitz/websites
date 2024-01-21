import { cx } from '../../utils/cx.js'

function SectionHeaderContent({ children, className = '' }) {
  return (
    <div
      className={cx(
        '[writing-mode:vertical-lr]',
        'md:[writing-mode:lr]',
        'w-11/12',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { SectionHeaderContent }
