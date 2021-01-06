import { useState } from 'react'
import cx from 'clsx'
import _title from 'title'

import Seo from '~components/Seo'
import Layout from '~components/Layout'
import Header from '~components/Header'

import { Banner as AlertBanner } from '~components/Alert'

import { useToast } from '~context/Toast'

const mockTrueFalse = [
  { value: true, title: 'true ' },
  { value: false, title: 'false' },
]

const mockTypes = [
  { description: 'Descriptoin of ', value: 'error', title: 'error' },
  { description: 'Descriptoin of ', value: 'info', title: 'info' },
  { description: 'Descriptoin of ', value: 'success', title: 'error' },
  { description: 'Descriptoin of ', value: 'warning', title: 'warning' },
]

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

  const url = 'https://jeromefitzgerald.com/playground'
  const title = 'Playground'
  const description =
    'This is just a “safe-haven” for Components that are currently being worked on.'
  const header = {
    description,
    title,
  }

  const seo = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <>
      <Layout>
        <Seo {...seo} />
        <Header {...header} />
        <div id="content">
          <h3 className="w-full bg-success text-white rounded pl-2 py-2">Toast</h3>
          <div className="flex flex-col md:flex-row items-start justify-items-start justify-between mt-4 mb-6 w-full overflow-hidden">
            <div className="flex flex-col md:flex-col">
              <fieldset className="flex flex-col mb-4">
                <div>
                  <legend className="text-base font-medium text-primary">
                    Preserved
                  </legend>
                  <p className="text-sm text-primary">
                    Should the toast be preserved until User Action?
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  {mockTrueFalse.map((item) => {
                    return (
                      <div className="flex items-center">
                        <input
                          checked={preserve === item.value}
                          className={cx(
                            'h-4 w-4 ',
                            'border-gray-700 dark:border-gray-300',
                            'text-primary',
                            'focus:ring-yellow-400'
                          )}
                          id={item.title}
                          name="preserve"
                          onChange={preserveHandleChange}
                          type="radio"
                          value={item.value.toString()}
                        />
                        <label
                          className="ml-3 block text-sm font-medium text-primary"
                          htmlFor={item.title}
                        >
                          {_title(item.title)}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>
              <fieldset className="flex flex-col mb-4">
                <div>
                  <legend className="text-base font-medium text-primary">
                    Message
                  </legend>
                  <p className="text-sm text-primary">
                    Text that should be displayed to User
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="w-full">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Text
                    </label>
                    <input
                      type="text"
                      name="message"
                      id="message"
                      className="mt-1 p-4 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border border-gray-800 dark:border-gray-300 rounded-md text-black"
                      value={text}
                      onChange={(e) => textSet(e.target.value)}
                    />
                  </div>
                  <div className="py-3 text-left sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-secondary bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        if (text) {
                          addToast({ preserve, text, type })
                          // setValue('')
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            <fieldset className="flex flex-col">
              <div>
                <legend className="text-base font-medium text-primary">Types</legend>
                <p className="text-sm text-primary">
                  What type of Toast should be shown to User?
                </p>
              </div>
              <div className="mt-4 space-y-4">
                {mockTypes.map((item) => {
                  return (
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={item.title}
                          name="types"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          onClick={typeHandleChange}
                          checked={type === item.value}
                          value={item.value}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor={item.title}
                          className="font-medium text-gray-700 dark:text-gray-200"
                        >
                          {_title(item.title)}
                        </label>
                        <p className="text-gray-500 dark:text-gray-300">
                          {_title(item.description + item.title)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </fieldset>
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
        </div>
      </Layout>
      {/* <AlertToast>Toast Test</AlertToast> */}
      <></>
      <AlertBanner>Toast Test</AlertBanner>
    </>
  )
}

export default Playground
