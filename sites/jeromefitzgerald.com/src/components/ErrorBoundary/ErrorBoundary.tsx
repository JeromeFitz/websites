'use client'
import { Separator } from '@jeromefitz/ds/components/Separator'

import type { ReactNode } from 'react'

import { Component } from 'react'

import { Grid } from '~app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '~app/playground/2024/_components/Headline'

type PropsChildren = {
  children?: ReactNode
}

class ErrorBoundary extends Component<PropsChildren> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error, errorInfo) {
    // // You can also log the error to an error reporting service
    // // logErrorToMyService(error, errorInfo)
    // console.dir(`> componentDidCatch`)
    // console.dir(errorInfo)
    // console.dir(error)
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.state.hasError) {
      const title = 'Error'
      const message = `Well this is embarassing.`
      const body = `Hey, sometimes these things happen. This is an error that has sent an alert, so Jerome already knows most likely, heh.`

      return (
        <main className="m-0 min-h-screen w-full p-0">
          <Grid as="section">
            <HeadlineColumnA>
              <HeadlineTitle aria-label={title} as="h1">
                <>{title}</>
              </HeadlineTitle>
              <HeadlineTitleSub>
                <></>
              </HeadlineTitleSub>
            </HeadlineColumnA>
            <HeadlineContent>
              <h1 className="mb-7 text-6xl font-black">{message}</h1>
              <p className="text-lg">{body}</p>
              <Separator className="my-8" />
              <p className="text-lg">
                Please try and go back to the{` `}
                <a
                  className="inline-flex flex-row items-center gap-1 text-[var(--accent-11)] underline decoration-[var(--gray-4)] underline-offset-4 transition-all duration-200 ease-in hover:text-[var(--accent-12)] hover:decoration-[var(--gray-5)]"
                  href="/"
                >
                  homepage
                </a>
                .
              </p>
            </HeadlineContent>
          </Grid>
        </main>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
