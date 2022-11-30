const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const { default: dts } = require('rollup-plugin-dts');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
// eslint-disable-next-line import/extensions
const pkg = require('./package.json');


const buildPath = path.dirname(pkg.module);

module.exports = [
  {
    input: './src/index.ts',
    output: {
      dir: buildPath,
      entryFileNames: path.basename(pkg.module),
      format: 'es',
      sourcemap: true,
    },
    external: Object.keys(pkg.dependencies || {}),
    plugins: [nodeResolve({browser: true}), typescript()],
  },
  {
    input: './build/dts/index.d.ts',
    output: [{
      file: path.join(buildPath, `${path.basename(pkg.module, '.js')}.d.ts`),
      format: 'es',
    }],
    plugins: [dts()],
  },
];
