import getContentTypeDetail from '../utils/getContentTypeDetail'

const numbered_list_item = ({ content, id }) => {
  return (
    <li>
      <span className="line-tight mb-3 inline-block text-black dark:text-white">
        {getContentTypeDetail({ content, id })}
      </span>
    </li>
  )
}

export default numbered_list_item
