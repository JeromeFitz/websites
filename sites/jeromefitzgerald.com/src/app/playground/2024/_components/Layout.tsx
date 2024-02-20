import { cx } from '@jeromefitz/ds/utils/cx'

import { Badge } from '@radix-ui/themes'
// import NextImage from 'next/image'
import { forwardRef } from 'react'

import { quotes } from '~data/quotes'

import { Grid } from './Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from './Headline'
import { Quote } from './Quote'

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
            <p
              className={cx(
                'text-2xl font-semibold tracking-wide',
                'flex flex-col gap-0',
                '',
              )}
            >
              Hailing from Pittsburgh, my shows have featured in:
            </p>
            <div className="flex w-full flex-col md:flex-row md:justify-start">
              <ul className="mb-4 w-full list-inside list-disc pb-2 text-lg md:w-4/12">
                <li>Chicagoland</li>
                <li>Cleveland</li>
                <li>Detroit</li>
                <li>New York City</li>
                <li>Philadelphia</li>
                <li>San Diego</li>
                <li>San Francisco</li>
                <li>& “more”</li>
              </ul>
              {/* <div className="w-full md:w-8/12">
                <NextImage
                  alt=""
                  height="325"
                  // fill={true}
                  quality={100}
                  src="https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg"
                  width="325"
                />
              </div> */}
            </div>
            <p
              className={cx(
                'text-2xl font-semibold tracking-wide',
                'flex flex-col gap-0',
                '',
              )}
            >
              Here are some nice quotes from nice people:
            </p>
            {quotes.map((quote, i) => {
              return <Quote item={quote} key={`quote--${i}`} />
            })}
          </>
        </HeadlineContent>
      </Grid>
    </>
  )
})

export { Layout }
