import { Flex } from '~styles/system/components/Flex'

const UL = ({ children }) => {
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

export default UL
