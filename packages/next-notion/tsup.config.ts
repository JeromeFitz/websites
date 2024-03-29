import type { Options } from 'tsup'

import { defineConfig } from 'tsup'

import { config as _config } from '../../tsup.config'

const entry = ['src/**']
const config: Options = {
  ..._config,
  entry,
  format: ['esm'],
}

export default defineConfig({
  ...config,
})
