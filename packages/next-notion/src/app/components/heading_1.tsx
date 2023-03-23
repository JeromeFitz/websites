// @todo(lint)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Balancer from 'react-wrap-balancer'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_1 = ({ content, id }) => {
  return (
    <h2 className="mb-3 text-3xl font-black md:mb-5 md:text-5xl">
      {/* <Balancer>{getContentTypeDetail({ content, id })}</Balancer> */}
      {getContentTypeDetail({ content, id })}
    </h2>
  )
}

export default heading_1
