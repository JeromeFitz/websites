/**
 * @todo(design-system) Checkbox props changed
 */
// import { Checkbox, Flex, Label } from '@jeromefitz/design-system'
import { Flex, Label } from '@jeromefitz/design-system'

const to_do = ({ content, id }) => {
  return (
    <Flex css={{ alignItems: 'center', my: '$3' }}>
      {/* <Checkbox disabled checked={content.checked} id={id} /> */}
      <Label css={{ paddingLeft: '$5' }} htmlFor={id}>
        {content.text[0].plain_text}
      </Label>
    </Flex>
  )
}

export default to_do
