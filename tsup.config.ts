import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

const config: Options = {
  clean: false,
  dts: true,
  format: ['esm', 'cjs'],
  minify: true,
  onSuccess: 'yarn copy',
  outDir: 'dist',
  silent: true,
  sourcemap: false,
  splitting: false,
  target: ['node16'],
  treeshake: false,
}

export { config }
export default defineConfig({ ...config })
