import type { Options } from 'tsup'

import { defineConfig } from 'tsup'

import { config as _config } from '../../tsup.config'

const entry = ['src/**']
const config: Options = {
  ..._config,
  entry,
  tsconfig: './tsconfig.build.json',
}

export default defineConfig({
  ...config,
})
