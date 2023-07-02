import { cx } from '@jeromefitz/shared/src/utils'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const code = ({ content, id }) => {
  return (
    <div
      className={cx(
        'mb-4 w-full bg-slate-300 px-4 py-8',
        'rounded border-l-4 border-l-blue-500'
      )}
    >
      <code
        className={cx(
          'font-mono leading-normal',
          'text-black',
          'text-lg md:text-xl'
        )}
      >
        {getContentTypeDetail({ content, id })}
      </code>
    </div>
  )
}

export default code
