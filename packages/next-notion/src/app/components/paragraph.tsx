// import { Paragraph } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const paragraph = ({ content, id }) => {
  return (
    <p className="mb-4 text-lg font-normal leading-normal">
      {getContentTypeDetail({ content, id })}
    </p>
  )
}

export default paragraph
