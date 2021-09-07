import cx from 'clsx'

import Container from '~components/Container'

const CTA = () => {
  return (
    <div className="bg-gray-300 w-full">
      <Container>
        <div
          className={cx(
            'w-full mx-auto py-12 px-4 sm:px-6 md:py-16 md:px-8 md:flex md:items-center md:justify-between'
          )}
        >
          <h2
            className={cx(
              'text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'
            )}
          >
            <span className="block">Question?</span>
            <span className="block text-green-600">Statement.</span>
          </h2>
          <div className={cx('mt-8 lex md:mt-0 md:flex-shrink-0')}>
            <div className={cx('inline-flex rounded-md shadow')}>
              <a
                href="#"
                className={cx(
                  'inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700'
                )}
              >
                Action
              </a>
            </div>
            <div className={cx('ml-3 inline-flex rounded-md shadow')}>
              <a
                href="#"
                className={cx(
                  'inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black-600 bg-white hover:bg-gray-500 hover:text-black',
                  'transition-colors ease-in-out transform-gpu'
                )}
              >
                CTA 2
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CTA
