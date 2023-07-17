'use client'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { Component } from 'react'
import type { ReactNode } from 'react'

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
          <section className="m-2 px-2 md:m-6">
            <SectionWrapper>
              <SectionHeader>
                <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
              </SectionHeader>
              <SectionContent>
                <h1 className="mb-7 text-6xl font-black">{message}</h1>
                <p className="text-lg">{body}</p>
                <Separator className="my-8" />
                <p className="text-lg">
                  Please try and go back to the{` `}
                  <a
                    href="/"
                    className="decoration-radix-slate4 hover:decoration-radix-slate5 text-radix-pink11 hover:text-radix-pink12 inline-flex flex-row items-center gap-1 underline underline-offset-4 transition-all duration-200 ease-in"
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
