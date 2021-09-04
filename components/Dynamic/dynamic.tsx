import cx from 'clsx'
import dynamic from 'next/dynamic'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ExtLink from './ext-link'
import SplitText from '~components/SplitText'

export interface Props {
  children: any
}

/**
 * @todo Notion Refactor to get away from [0][0] this far away from normalizer
 *       Notion Headlines should be treated differently than defaults.
 */
const H1 = ({ children, ...props }: Props) => {
  if (!children) {
    return null
  }
  const text = children[0][0]
  return (
    <h1
      className={cx(
        'my-6 text-2xl md:text-3xl font-extrabold flex flex-row flex-wrap'
      )}
      aria-label={text}
      {...props}
    >
      <span aria-hidden="true" className="md:hidden">
        {text}
      </span>
      <span aria-hidden="true" className="hidden md:flex flex-row flex-wrap">
        <SplitText splitBy="word" text={text} />
      </span>
    </h1>
  )
}

const H2 = ({ children, ...props }: Props) => {
  if (!children) {
    return null
  }
  const text = children[0][0]
  return (
    <h2
      className={cx('my-4 text-xl md:text-2xl font-bold')}
      aria-label={text}
      {...props}
    >
      <span aria-hidden="true" className="md:hidden">
        {text}
      </span>
      <span aria-hidden="true" className="hidden md:flex flex-row flex-wrap">
        <SplitText splitBy="word" text={text} />
      </span>
    </h2>
  )
}

const H3 = ({ children, ...props }: Props) => {
  if (!children) {
    return null
  }
  const text = children[0][0]
  return (
    <h3
      className={cx('my-3 text-lg md:text-xl font-semibold flex flex-row flex-wrap')}
      aria-label={text}
      {...props}
    >
      <span aria-hidden="true" className="md:hidden">
        {text}
      </span>
      <span aria-hidden="true" className="hidden md:flex flex-row flex-wrap">
        <SplitText text={text} transition={false} />
      </span>
    </h3>
  )
}

const UL = ({ children, ...props }: Props) => {
  return (
    <ul className={cx('my-2 text-lg md:text-xl')} {...props}>
      {children}
    </ul>
  )
}

const LI = ({ children, ...props }) => {
  return (
    <li className={cx('my-4 text-base md:text-lg mx-4')} {...props}>
      {children}
    </li>
  )
}

const dynamicElements = {
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
  span: dynamic(() => import('./span')),
  // span: 'span',

  // blockquote: 'blockquote',
  blockquote: dynamic(() => import('~components/Quote')),

  a: ExtLink,

  // Code: dynamic(() => import('./code')),
  ColumnContainer: dynamic(() => import('./column-container')),
  Column: dynamic(() => import('./column')),
  // Counter: dynamic(() => import('./counter')),
}

export default dynamicElements
