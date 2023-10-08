import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/git-switch.mjs',
    format: 'es'
  },
  plugins: [resolve(), commonjs()]
}