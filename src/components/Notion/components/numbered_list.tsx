import { Flex } from '~styles/system/components'

const numbered_list = ({ children }) => {
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

export default numbered_list
