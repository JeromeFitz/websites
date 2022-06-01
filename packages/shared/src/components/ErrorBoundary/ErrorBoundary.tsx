/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, PageHeading, Section } from '@jeromefitz/design-system'
import * as React from 'react'

type PropsChildren = {
  children?: React.ReactNode
}

class ErrorBoundary extends React.Component<PropsChildren> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <Container
          as="main"
          id="main"
          size={{ '@initial': 2, '@bp1': 3, '@bp2': 4 }}
        >
          <Section>
            <PageHeading
              title={`Something went wrong`}
              description={`Well, this is embarassing. Something is so broke, that this showed up. Feel free to reach out, however, I am sure Jerome has gotten a few alerts already. 🤣️`}
            />
          </Section>
        </Container>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
