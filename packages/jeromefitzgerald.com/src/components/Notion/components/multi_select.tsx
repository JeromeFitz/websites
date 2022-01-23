import _map from 'lodash/map'

const multi_select = ({ content }) => {
  return (
    <>
      {_map(content, (tag) => {
        // console.dir(`> tag`)
        // console.dir(tag)
        return (
          <li className={`badge`} key={tag.id}>
            {tag.name}
          </li>
        )
      })}
    </>
  )
}

export default multi_select
