// @todo(lint)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Balancer from 'react-wrap-balancer'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_3 = ({ content, id }) => {
  return (
    <h4 className="mb-3 text-lg font-black md:text-2xl">
      {/* <Balancer>{getContentTypeDetail({ content, id })}</Balancer> */}
      {getContentTypeDetail({ content, id })}
    </h4>
  )
}

export default heading_3
