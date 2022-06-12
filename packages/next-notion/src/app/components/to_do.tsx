import { Flex, Icon } from '@jeromefitz/design-system'

import { Checkbox, CheckboxIndicator, CheckboxLabel } from './to_do.styles'

const to_do = ({ content, id }) => {
  return (
    <Flex css={{ alignItems: 'center', my: '$3' }}>
      <Checkbox disabled checked={content.checked} id={id}>
        <CheckboxIndicator>
          <Icon.Check />
        </CheckboxIndicator>
      </Checkbox>
      <CheckboxLabel css={{ paddingLeft: '$5' }} htmlFor={id}>
        {content.text[0].plain_text}
      </CheckboxLabel>
    </Flex>
  )
}

export default to_do
