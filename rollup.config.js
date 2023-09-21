import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import graphql from 'rollup-plugin-graphql';
import localResolve from 'rollup-plugin-local-resolve';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json';

let FORMAT = process.env.FORMAT;

// graphql-tools currently has a rollup build failure, so always call it an external until they fix it
// otherwise, make all npm production dependencies external, plus their subpath usages
// throughout the codebase, which rollup doesn't automatically pick up on
let external = (Object.keys(pkg.dependencies) || [])
	.concat(
		['castArray', 'get','isError', 'isObject', 'mapValues', 'reduce', 'omitBy', 'uniqBy', 'concat', 'uniqBy', 'differenceBy', 'forEach'].map(v => 'lodash/'+v)
	);

export default {
	external,
	context: 'commonjsGlobal', // what should "this" be at the top level when it is used by another module
	plugins: [
		graphql(),
		localResolve(),
		typescript(),
		babel({
			extensions: ['.ts'],
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		visualizer()
	],
	output: {
		exports: FORMAT==='es' ? null : 'named'
	},
};
