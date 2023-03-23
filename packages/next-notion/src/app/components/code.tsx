import getContentTypeDetail from '../utils/getContentTypeDetail'

const code = ({ content, id }) => {
  return (
    <div className="mb-4 w-full rounded border-l-4 border-l-blue-500 bg-slate-300 py-8 px-4">
      <code className="font-mono text-lg leading-normal text-black md:text-xl">
        {getContentTypeDetail({ content, id })}
      </code>
    </div>
  )
}

export default code
