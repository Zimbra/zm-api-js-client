import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import graphql from '@rollup/plugin-graphql';
import localResolve from 'rollup-plugin-local-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';

const FORMAT = process.env.FORMAT;

const externalDeps = [
	'@apollo/client',
	'graphql',
	'lodash',
	'mitt'
];

const getExternalDeps = id => externalDeps.find(pkgName => id.includes('/node_modules/' + pkgName  + '/'));

export default {
	...(FORMAT==='es' && { external: getExternalDeps }),
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
		}),
		...(process.env.visualize ? [visualizer({ open: true }) ] : [])
	],
	output: {
		exports: FORMAT==='es' ? null : 'named'
	}
};
