import { defineConfig } from 'tsdown'

import { config as _config } from '../../tsdown.config'

const entry = ['src/**']
const config = {
  ..._config,
  entry,
}

export default defineConfig({
  ...config,
})
