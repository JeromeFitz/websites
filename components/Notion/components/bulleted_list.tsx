import { Flex } from '~styles/system/components/Flex'

const bulleted_list = ({ children }) => {
  return (
    <Flex
      as="ul"
      css={{
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'disc',
        listStylePosition: 'outside',
      }}
    >
      {children}
    </Flex>
  )
}

export default bulleted_list
