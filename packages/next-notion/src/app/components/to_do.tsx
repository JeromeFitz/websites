const to_do = ({ content, id }) => {
  // console.dir(`to_do`)
  // console.dir(content)
  return (
    <div className="my-3 items-center">
      {/* <Checkbox disabled checked={content.checked} id={id} /> */}
      <input type="checkbox" value={content.checked} id={id} />
      <label className="pl-5" htmlFor={id}>
        {content?.rich_text[0]?.plain_text}
      </label>
    </div>
  )
}

export default to_do
