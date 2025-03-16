import { cx } from '@jeromefitz/ds/utils/cx'

function Logo({
  children,
  size = '20px',
}: {
  children: React.ReactNode
  size?: string
}) {
  return (
    <div
      className={cx(
        'relative flex items-center justify-center overflow-hidden rounded',
        '[box-shadow:inset_0_0_1px_1px_rgba(0,_0,_0,_0.015)]',
      )}
      style={{
        height: size,
        width: size,
      }}
    >
      <div
        aria-hidden
        className={cx(
          'pointer-events-none absolute top-0 left-0 z-10 flex size-full items-center justify-center select-none',
          '[transform:scale(1.5)_translateZ(0)]',
          '[filter:blur(12px)_opacity(0.4)_saturate(100%)]',
          '[transition:filter_150ms_ease]',
          '',
        )}
      >
        {children}
      </div>
      <div
        className={cx(
          'pointer-events-none z-20 flex size-full items-center justify-center rounded-[inherit] object-cover select-none',
          '[&>svg]:w-[14px]:h-[14px]:[filter:drop-shadow(0_4px_4px_rgba(0,_0,_0,_0.16))]:[transition:filter_150ms_ease]',
          '',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { Logo }
