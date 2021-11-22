const relation = ({ content }) => {
  console.dir(`@todo(notion) relation`)
  console.dir(content)
  return !!content[0] && content
}

export default relation
