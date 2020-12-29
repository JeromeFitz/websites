import cx from 'clsx'
import dynamic from 'next/dynamic'
import ExtLink from './ext-link'

export interface Props {
  children: any
  props: any
}

const H1 = ({ children, props }: Props) => {
  return (
    <h1
      className={cx(
        'text-black dark:text-white my-6 text-2xl md:text-3xl font-heavy'
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

const H2 = ({ children, props }: Props) => {
  return (
    <h2
      className={cx('text-black dark:text-white my-4 text-xl md:text-2xl font-bold')}
      {...props}
    >
      {children}
    </h2>
  )
}

const H3 = ({ children, props }: Props) => {
  return (
    <h3
      className={cx(
        'text-black dark:text-white my-3 text-lg md:text-xl font-semibold'
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

const UL = ({ children, props }: Props) => {
  return (
    <ul
      className={cx('text-black dark:text-white my-2 text-lg md:text-xl')}
      {...props}
    >
      {children}
    </ul>
  )
}

const LI = ({ children, props }: Props) => {
  return (
    <li
      className={cx('text-black dark:text-white my-4 text-md md:text-lg mx-4')}
      {...props}
    >
      {children}
    </li>
  )
}

export default {
  // default tags
  b: 'strong',
  i: 'em',

  ol: 'ol',
  // ul: 'ul',
  ul: UL,
  // li: 'li',
  li: LI,

  h1: H1,
  h2: H2,
  h3: H3,

  // p: 'p',
  p: dynamic(() => import('./p')),

  // blockquote: 'blockquote',
  blockquote: dynamic(() => import('~components/Quote')),

  a: ExtLink,

  // Code: dynamic(() => import('./code')),
  ColumnContainer: dynamic(() => import('./column-container')),
  Column: dynamic(() => import('./column')),
  Counter: dynamic(() => import('./counter')),
}
