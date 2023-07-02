import { Component } from 'react'
import type { ReactNode } from 'react'

import { PageHeading } from '~ui/PageHeading'

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
      return (
        <main className="relative m-0 min-h-screen w-full p-0">
          <section className="z-10 mx-4 my-6 max-w-screen-sm md:mx-4 md:my-9   md:max-w-screen-lg lg:mx-auto">
            <PageHeading overline={`/error`} title={`Well, this is embarassing`} />
            <p>Eek. Something went really wrong. Please try refreshing.</p>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
