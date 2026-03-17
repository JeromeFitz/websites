import type { UserConfig } from 'tsdown'

import { defineConfig } from 'tsdown'

const config: UserConfig = {
  dts: true,
  minify: true,
  onSuccess: 'pnpm copy',
  outDir: 'dist',
  silent: true,
  sourcemap: false,
  target: ['node22'],
  treeshake: false,
}

export { config }
export default defineConfig({ ...config })
