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
  const [text, textSet] = useState('foo')
  const [type, typeSet] = useState('info')
  const [preserve, preserveSet] = useState(false)

  const typeHandleChange = (e) => {
    typeSet(e.target.value)
  }

  const preserveHandleChange = () => {
    preserveSet(!preserve)
  }

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
          <div className="flex items-baseline mt-4 mb-6">
            <div className="space-x-2 flex">
              <label>
                <input
                  className="w-3 h-3 flex items-center justify-center "
                  checked={preserve === true}
                  name="preserve"
                  type="radio"
                  onChange={preserveHandleChange}
                  value="true"
                />
                p: yes
              </label>
              <label>
                <input
                  className="w-3 h-3 flex items-center justify-center"
                  checked={preserve === false}
                  name="preserve"
                  type="radio"
                  onChange={preserveHandleChange}
                  value="false"
                />
                p: no
              </label>
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6">
            <div className="space-x-2 flex">
              <label>
                <input
                  className="w-3 h-3 flex items-center justify-center"
                  checked={type === 'error'}
                  name="type"
                  type="radio"
                  onChange={typeHandleChange}
                  value="error"
                />
                error
              </label>
              <label>
                <input
                  className="w-3 h-3 flex items-center justify-center"
                  checked={type === 'info'}
                  name="type"
                  type="radio"
                  onChange={typeHandleChange}
                  value="info"
                />
                info
              </label>
              <label>
                <input
                  className="w-3 h-3 flex items-center justify-center"
                  checked={type === 'success'}
                  name="type"
                  type="radio"
                  onChange={typeHandleChange}
                  value="success"
                />
                success
              </label>
              <label>
                <input
                  className="w-3 h-3 flex items-center justify-center"
                  checked={type === 'warning'}
                  name="type"
                  type="radio"
                  onChange={typeHandleChange}
                  value="warning"
                />
                warning
              </label>
            </div>
          </div>
          <input
            className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
            value={text}
            onChange={(e) => textSet(e.target.value)}
          />
          <div className="flex space-x-3 mb-4 text-sm font-medium">
            <div className="flex-auto flex space-x-3">
              <button
                className="w-1/2 m-4 p-4 flex items-center justify-center rounded-md bg-black text-white"
                onClick={() => {
                  if (text) {
                    addToast({ preserve, text, type })
                    // setValue('')
                  }
                }}
              >
                Add Toast
              </button>
            </div>
          </div>

          {/* <div>
            <div>
              <div className="bg-error">bg-error</div>
              <div className="bg-error-light">bg-error-light</div>
              <div className="bg-error-lighter">bg-error-lighter</div>
              <div className="bg-error-dark">bg-error-dark</div>
            </div>
            <div>
              <div className="bg-info">bg-info</div>
              <div className="bg-info-light">bg-info-light</div>
              <div className="bg-info-lighter">bg-info-lighter</div>
              <div className="bg-info-dark">bg-info-dark</div>
            </div>
            <div>
              <div className="bg-success">bg-success</div>
              <div className="bg-success-light">bg-success-light</div>
              <div className="bg-success-lighter">bg-success-lighter</div>
              <div className="bg-success-dark">bg-success-dark</div>
            </div>
            <div>
              <div className="bg-warning">bg-warning</div>
              <div className="bg-warning-light">bg-warning-light</div>
              <div className="bg-warning-lighter">bg-warning-lighter</div>
              <div className="bg-warning-dark">bg-warning-dark</div>
            </div>
          </div> */}
        </>
      </Layout>
      {/* <AlertToast>Toast Test</AlertToast> */}
      <></>
      <AlertBanner>Toast Test</AlertBanner>
    </>
  )
}

export default Playground
