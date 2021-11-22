import { Text } from '~styles/system/components/Text'
// import Emoji from '~components/Emoji'

const ImageCaption = ({ caption }) => {
  return (
    <Text
      as="p"
      css={{
        fontSize: '$2',
        lineHeight: '1.25',
        ml: '$1',
        py: '$3',
      }}
    >
      {/* <Emoji character={`📸️`} margin={true} /> */}
      {caption}
    </Text>
  )
}

export default ImageCaption
