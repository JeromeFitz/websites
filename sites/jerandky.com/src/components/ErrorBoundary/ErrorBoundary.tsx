'use client'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'

import type { ReactNode } from 'react'

import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { Component } from 'react'

interface PropsChildren {
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
          <section className="m-2 px-2 md:m-6">
            <SectionWrapper>
              <SectionHeader>
                <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
              </SectionHeader>
              <SectionContent>
                <h1 className="mb-7 text-6xl font-black">{message}</h1>
                <p className="text-lg">{body}</p>
                <Separator my="4" orientation="horizontal" size="4" />
                <p className="text-lg">
                  Please try and go back to the{` `}
                  <a
                    className="text-accent-11 hover:text-accent-12 inline-flex flex-row items-center gap-1 underline decoration-[var(--gray-4)] underline-offset-4 transition-all duration-200 ease-in hover:decoration-[var(--gray-5)]"
                    href="/"
                  >
                    homepage
                  </a>
                  .
                </p>
              </SectionContent>
            </SectionWrapper>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
