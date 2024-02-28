'use client'
import type { ReactNode } from 'react'

import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { Component } from 'react'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

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
          <Grid>
            <HeadlineColumnA>
              <HeadlineTitle aria-label={title} as="h1">
                <>{title}</>
              </HeadlineTitle>
              <HeadlineTitleSub>
                <></>
              </HeadlineTitleSub>
            </HeadlineColumnA>
            <HeadlineContent>
              <Heading mb="7" size="7">
                {message}
              </Heading>
              <Text size="6">{body}</Text>
              <Separator my="8" size="4" />
              <Text size="6">
                Please try and go back to the{` `}
                <Link asChild>
                  <a href="/">homepage</a>
                </Link>
                .
              </Text>
            </HeadlineContent>
          </Grid>
        </main>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
