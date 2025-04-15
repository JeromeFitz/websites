import { cx } from '@/utils/cx'

function SectionHeaderContent({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
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
