import { cx } from '@jeromefitz/shared/src/utils'

function SectionHeaderContent({ children, className = '' }) {
  return (
    <div
      className={cx(
        '[writing-mode:vertical-lr]',
        'md:[writing-mode:lr]',
        'w-11/12',
        className
      )}
    >
      {children}
    </div>
  )
}

export { SectionHeaderContent }
