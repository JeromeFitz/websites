import cx from 'clsx'

import Layout from '~components/Layout'
import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'

const Offline = () => {
  return (
    <>
      <Layout>
        <h3
          className={cx(
            'flex flex-row items-center',
            'gradient text-2xl md:text-4xl',
            'leading-tight md:leading-tight',
            'mt-0 mb-3'
          )}
          style={WEBKIT_BACKGROUND__BREAK}
        >
          Offline
        </h3>
        <div className={cx('spacer bg-gray-600 dark:bg-gray-300')} />
        <p>You are currently offline. Please check your internet connection.</p>
      </Layout>
    </>
  )
}

export default Offline
