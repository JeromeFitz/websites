import { Flex } from '@jeromefitz/design-system'
import { CheckIcon } from '@radix-ui/react-icons'

import { Checkbox, CheckboxIndicator, CheckboxLabel } from './to_do.styles'

const to_do = ({ content, id }) => {
  return (
    <Flex css={{ alignItems: 'center', my: '$2' }}>
      <Checkbox disabled checked={content.checked} id={id}>
        <CheckboxIndicator>
          <CheckIcon />
        </CheckboxIndicator>
      </Checkbox>
      <CheckboxLabel css={{ paddingLeft: 15 }} htmlFor={id}>
        {content.text[0].plain_text}
      </CheckboxLabel>
    </Flex>
  )
}

export default to_do
