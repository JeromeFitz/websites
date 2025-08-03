import { addons } from 'storybook/manager-api'

import * as themes from './themes'

addons.setConfig({
  theme: themes.dark,
})
