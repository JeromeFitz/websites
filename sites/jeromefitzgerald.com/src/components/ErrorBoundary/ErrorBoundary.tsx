/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'

import { PageHeading } from '~ui/PageHeading'

type PropsChildren = {
  children?: React.ReactNode
}

class ErrorBoundary extends React.Component<PropsChildren> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
      return (
        <main className="relative m-0 min-h-screen w-full p-0">
          <section className="z-10 mx-4 my-6 max-w-screen-sm md:mx-4 md:my-9   md:max-w-screen-lg lg:mx-auto">
            <PageHeading overline={`/error`} title={`Well, this is embarassing`} />
            <p>
              Something is so broke, that this showed up. Feel free to reach out,
              however, I am sure Jerome has gotten a few alerts already.
            </p>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
