import type { Options } from 'tsdown'

import { defineConfig } from 'tsdown'

const config: Options = {
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
