import { useState } from 'react'
import cx from 'clsx'
import _title from 'title'

import { Banner as AlertBanner } from '~components/Alert'
import { Container, Grid, Skeleton, Button } from '~components/UI'
import Header from '~components/Header'
import Layout from '~components/Layout'
import Seo from '~components/Seo'

import { useUI } from '~context/ManagedUIContext'
import { useNotification } from '~context/Notification'

import rangeMap from '~utils/rangeMap'

const mockTrueFalse = [
  { value: true, title: 'true ' },
  { value: false, title: 'false' },
]

const mockTypes = [
  { description: 'Description of ', value: 'error', title: 'error' },
  { description: 'Description of ', value: 'info', title: 'info' },
  { description: 'Description of ', value: 'success', title: 'error' },
  { description: 'Description of ', value: 'warning', title: 'warning' },
]

const Playground = () => {
  const { openModal, setModalView } = useUI()
  const [loading] = useState(false)
  const [disabled] = useState(false)

  const { addNotification } = useNotification()
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
    noindex: true,
    openGraph: {
      url,
      title,
      description,
    },
  }

  const handleModalTest = () => {
    setModalView('MODAL_TEST_VIEW')
    openModal()
  }

  return (
    <>
      <Layout>
        <Seo {...seo} />
        <Header {...header} />
        <div id="content">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
            onClick={() => handleModalTest()}
          >
            Modal Test
          </Button>
          <Container>
            <Grid layout="normal">
              {rangeMap(12, (i) => (
                <Skeleton
                  key={i}
                  className="w-full animated fadeIn"
                  height={9}
                  width={9}
                />
              ))}
            </Grid>
          </Container>
          <h3 className="w-full bg-success text-white rounded pl-2 py-2">
            Notification
          </h3>
          <div className="flex flex-col md:flex-row items-start justify-items-start justify-between mt-4 mb-6 w-full overflow-hidden">
            <div className="flex flex-col md:flex-col">
              <fieldset className="flex flex-col mb-4">
                <div>
                  <legend className="text-base font-medium text-secondary">
                    Preserved
                  </legend>
                  <p className="text-sm text-secondary">
                    Should the notification be preserved until User Action?
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  {mockTrueFalse.map((item, itemIdx) => {
                    return (
                      <div
                        className="flex items-center"
                        key={`mockTrueFalse--${itemIdx}`}
                      >
                        <input
                          checked={preserve === item.value}
                          className={cx(
                            'h-4 w-4 ',
                            'border-gray-700 dark:border-gray-300',
                            'text-secondary',
                            'focus:ring-yellow-400'
                          )}
                          id={item.title}
                          name="preserve"
                          onChange={preserveHandleChange}
                          type="radio"
                          value={item.value.toString()}
                        />
                        <label
                          className="ml-3 block text-sm font-medium text-secondary"
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
                  <legend className="text-base font-medium text-secondary">
                    Message
                  </legend>
                  <p className="text-sm text-secondary">
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
                      className="mt-1 p-4 focus:ring-yellow-500 focus:border-yellow-500 block shadow-sm sm:text-sm border border-gray-800 dark:border-gray-300 rounded-md text-black"
                      value={text}
                      onChange={(e) => textSet(e.target.value)}
                    />
                  </div>
                  <div className="py-3 text-left sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-secondary bg-primary hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      onClick={() => {
                        if (text) {
                          addNotification({ preserve, text, type })
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
                <legend className="text-base font-medium text-secondary">
                  Types
                </legend>
                <p className="text-sm text-secondary">
                  What type of Notification should be shown to User?
                </p>
              </div>
              <div className="mt-4 space-y-4">
                {mockTypes.map((item, itemIdx) => {
                  return (
                    <div className="flex items-start" key={`mockType--${itemIdx}`}>
                      <div className="flex items-center h-5">
                        <input
                          id={item.title}
                          name="types"
                          type="checkbox"
                          className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                          onChange={typeHandleChange}
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
      {/* <AlertNotification>Notification Test</AlertNotification> */}
      <></>
      <AlertBanner>Notification Test</AlertBanner>
    </>
  )
}

export default Playground
