// import Emoji from '~components/Notion/Emoji'

const ImageCaption = ({ caption }) => {
  return (
    <p className="text-xs py-3.5">
      {/* <Emoji character={`📸️`} margin={true} /> */}
      {caption}
    </p>
  )
}

export default ImageCaption
