import { Text } from '~styles/system/components'
import { styled } from '~styles/system/stitches.config'

const EmptyContent = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bc: '$loContrast',
  br: '$2',
  py: 10,
  px: 10,
  marginTop: -15,
  boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',

  '& ::selection': {
    backgroundColor: '$blueA5',
  },
})

export function Empty() {
  return (
    <EmptyContent>
      <Text size="2" css={{ lineHeight: 1.5, mb: '$2' }}>
        Far far away, behind the word mountains, far from the countries Vokalia and
        Consonantia, there live the blind texts.
      </Text>
    </EmptyContent>
  )
}
