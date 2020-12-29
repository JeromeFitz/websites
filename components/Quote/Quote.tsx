import cx from 'clsx'
import React from 'react'

// import styles from './Quote.module.css'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require('./Quote.module.css')

export interface QuoteProps {
  children: any
  props: any
}

const Quote = ({ children, props }: QuoteProps) => {
  return (
    <blockquote className={cx(styles.quote)} {...props}>
      {children}
    </blockquote>
  )
}

export default Quote
