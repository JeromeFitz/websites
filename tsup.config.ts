import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const config: Options = {
  clean: true,
  dts: true,
  format: ['esm'],
  minify: true,
  onSuccess: 'pnpm copy',
  outDir: 'dist',
  silent: true,
  sourcemap: false,
  splitting: false,
  target: ['node20'],
  treeshake: false,
}

export { config }
export default defineConfig({ ...config })
