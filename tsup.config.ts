import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const config: Options = {
  clean: false,
  dts: true,
  format: ['esm', 'cjs'],
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
