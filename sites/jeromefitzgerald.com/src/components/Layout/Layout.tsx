import dynamic from 'next/dynamic.js'

import { Wrapper } from '@/components/Wrapper/index'

const Footer = dynamic(
  async () => {
    const { Footer: Component } = await import('@/app/_temp/Footer')
    return { default: Component }
  },
  { ssr: true },
)

function Layout({ children }) {
  return (
    <>
      <Wrapper as="main" className="">
        {children}
      </Wrapper>
      <Wrapper as="footer" className="">
        <Footer />
      </Wrapper>
    </>
  )
}

export { Layout }
