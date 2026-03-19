import type { UserConfig } from 'tsdown'

import { defineConfig } from 'tsdown'

import { config as _config } from '../../tsdown.config.ts'

const entry = ['src/**']
const config: UserConfig = {
  ..._config,
  attw: {
    ignoreRules: ['no-resolution'],
    profile: 'esm-only',
  },
  entry,
  onSuccess: 'pnpm run copy',
  publint: false,
}

export default defineConfig({
  ...config,
})
