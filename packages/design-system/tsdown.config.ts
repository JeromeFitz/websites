import type { UserConfig } from 'tsdown'

import { defineConfig } from 'tsdown'

import { config as _config } from '../../tsdown.config'

const entry = ['src/**']
const config: UserConfig = {
  ..._config,
  entry,
  tsconfig: './tsconfig.build.json',
}

export default defineConfig({
  ...config,
})
