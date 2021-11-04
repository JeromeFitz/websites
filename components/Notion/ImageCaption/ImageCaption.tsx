import { Text } from '@modulz/design-system'
// import Emoji from '~components/Notion/Emoji'

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
