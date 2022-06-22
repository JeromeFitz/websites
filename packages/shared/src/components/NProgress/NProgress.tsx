/* eslint-disable @typescript-eslint/no-implied-eval */
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import * as React from 'react'

const NProgressImpl = () => {
  const router = useRouter()

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    const start = () => {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      // eslint-disable-next-line @typescript-eslint/unbound-method
      timeout = setTimeout(NProgress.start, 100)
    }

    const done = () => {
      clearTimeout(timeout)
      NProgress.done()
    }

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', done)
      router.events.off('routeChangeError', done)
    }
  }, [router.events])
  return <React.Fragment />
}

export { NProgressImpl as NProgress }
