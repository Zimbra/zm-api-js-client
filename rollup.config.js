import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import graphql from 'rollup-plugin-graphql';
import localResolve from 'rollup-plugin-local-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

let FORMAT = process.env.FORMAT;

// graphql-tools currently has a rollup build failure, so always call it an external until they fix it
// otherwise, make all npm production dependencies external, plus their subpath usages
// throughout the codebase, which rollup doesn't automatically pick up on
let external = FORMAT==='es' ?
	Object.keys(pkg.dependencies)
		.concat(
			['castArray', 'get','isError', 'isObject', 'mapValues', 'reduce', 'omitBy', 'uniqBy', 'concat', 'uniqBy', 'differenceBy', 'forEach'].map(v => 'lodash/'+v),
			['graphql/language/printer', 'graphql/type']) :
	['graphql-tools'];


export default {
	external,
	context: 'commonjsGlobal', // what should "this" be at the top level when it is used by another module
	plugins: [
		graphql(),
		localResolve(),
		nodeResolve({
			extensions: [ '.js', '.ts', '.json' ]
		}),
		commonjs(),
		typescript(),
		babel({
			extensions: ['.ts'],
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		})
	],
	output: {
		exports: FORMAT==='es' ? null : 'named'
	},
};
