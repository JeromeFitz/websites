import Emoji from '~components/Notion/Emoji'

const ImageCaption = ({ caption }) => {
  return (
    <p className="text-xs italic pb-2">
      <Emoji character={`📸️`} margin={true} />
      {caption}
    </p>
  )
}

export default ImageCaption
