// import { Text } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const bulleted_list_item = ({ content, id }) => {
  return (
    <li>
      <span className="mb-3 inline-block leading-tight text-black dark:text-white">
        {getContentTypeDetail({ content, id })}
      </span>
    </li>
  )
}

export default bulleted_list_item
