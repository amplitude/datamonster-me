/*
 * This builds the lamba zip for the image share function
 */

import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/share.js',
  output: {
    file: 'index.js',
    format: 'cjs'
	},

	// Canvas is installed via a lambda layer
	external: ['canvas'],

	// This is what bundles everything else into one file
  plugins: [nodeResolve()]
};
