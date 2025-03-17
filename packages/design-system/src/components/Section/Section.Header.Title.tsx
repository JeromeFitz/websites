import { cx } from '../../utils/cx'

function SectionHeaderTitle({ children, className = '', isTitle = false }) {
  return (
    <h2
      className={cx(
        '[writing-mode:vertical-lr]',
        'md:[writing-mode:lr]',
        isTitle
          ? 'text-xl font-extrabold tracking-tight md:text-3xl'
          : 'font-bold tracking-tight uppercase md:text-lg md:font-extrabold',
        'my-1 py-1 pr-2',
        'md:my-2 md:py-2 md:pr-6',
        'w-11/12',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export { SectionHeaderTitle }
