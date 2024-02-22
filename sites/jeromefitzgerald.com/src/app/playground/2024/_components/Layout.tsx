import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge } from '@radix-ui/themes'
import { forwardRef } from 'react'

import { Grid } from './Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from './Headline'

const Layout = forwardRef(function Layout(props, forwardedRef) {
  const title = 'Jerome Fitzgerald'
  return (
    <>
      <Grid as="section" ref={forwardedRef}>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>
              {title}
              <span className="block text-xl font-normal tracking-wider">
                he/him
              </span>
            </>
          </HeadlineTitle>
          <HeadlineTitleSub>
            <Badge color="orange" size="2">
              actor
            </Badge>
            <Badge color="mint" size="2">
              comedian
            </Badge>
            <Badge color="purple" size="2">
              writer
            </Badge>
            {/* <Badge color="purple" size="2">
              writer
            </Badge> */}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <>
            <p className="flex gap-2 text-4xl font-bold tracking-tight">
              <span
                aria-label="an emoji representation of wave"
                className="ml-0.5 mr-1.5"
                role="img"
              >
                👋
              </span>
              <span className="">Hello</span>
            </p>
            <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
              I mostly focus on writing and performing comedy. With the occasional
              drama or musical number, and a healthy career in engineering
              leadership.
            </p>
          </>
        </HeadlineContent>
      </Grid>
    </>
  )
})

export { Layout }
