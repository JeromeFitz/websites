// @todo(lint)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Balancer from 'react-wrap-balancer'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_2 = ({ content, id }) => {
  return (
    <h3 className="mb-4 mt-4 text-xl font-black md:mt-0 md:text-4xl">
      {/* <Balancer>{getContentTypeDetail({ content, id })}</Balancer> */}
      {getContentTypeDetail({ content, id })}
    </h3>
  )
}

export default heading_2
