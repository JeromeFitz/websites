import { Text } from '~styles/system/components'

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
      {caption}
    </Text>
  )
}

export default ImageCaption
