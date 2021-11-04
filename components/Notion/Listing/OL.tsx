import { Flex } from '@modulz/design-system'

const OL = ({ children }) => {
  return (
    <Flex
      as="ol"
      css={{
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'decimal',
        listStylePosition: 'outside',
      }}
    >
      {children}
    </Flex>
  )
}

export default OL
