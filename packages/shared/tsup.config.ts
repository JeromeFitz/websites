// import isCI from 'is-ci'
import { defineConfig } from 'tsup'

import { config as _config } from '../../tsup.config'

const entry = ['src/**', '!src/styles/*.css']
const config = {
  ..._config,
  entry,
}

export default defineConfig({
  ...config,
})
