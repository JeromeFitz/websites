import { useState } from 'react'
import { NextSeo } from 'next-seo'

import Layout from '~components/Layout'
import Header from '~components/Header'

import { Banner as AlertBanner } from '~components/Alert'

import { useToast } from '~context/Toast'

const url = 'https://jeromefitzgerald.com/playground'
const title = 'Playground'
const description =
  'This is just a “safe-haven” for Components that are currently being worked on.'
const header = {
  description,
  title,
}

const Playground = () => {
  const { addToast } = useToast()
  const [value, setValue] = useState('')

  return (
    <>
      <Layout>
        <NextSeo
          title={title}
          description={description}
          canonical={url}
          openGraph={{
            url,
            title,
            description,
          }}
        />
        <Header {...header} />
        <>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button
            onClick={() => {
              if (value) {
                addToast(value)
                // setValue('')
              }
            }}
          >
            Add toast
          </button>
        </>
      </Layout>
      {/* <AlertToast>Toast Test</AlertToast> */}
      <></>
      <AlertBanner>Toast Test</AlertBanner>
    </>
  )
}

export default Playground
