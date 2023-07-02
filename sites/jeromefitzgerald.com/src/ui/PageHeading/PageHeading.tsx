import { cx } from '@jeromefitz/shared/src/utils'

type PageHeadingProps = {
  overline: string
  title: string
}

const PageHeading = ({ overline, title }: PageHeadingProps) => {
  return (
    <>
      <h2
        className={cx(
          'font-mono lowercase',
          'text-radix-slate12',
          'mb-2 text-sm font-normal tracking-tighter md:mb-0',
          'md:text-base md:font-normal md:tracking-tight'
        )}
      >
        {overline}/
      </h2>
      <h1
        className={cx(
          'font-sans font-black',
          'text-radix-slate12',
          'text-2xl leading-normal tracking-normal',
          'md:text-6xl md:leading-tight md:tracking-tight'
        )}
      >
        {title}
      </h1>
      <hr className="slate-border my-5 md:my-6" />
    </>
  )
}

export { PageHeading }
