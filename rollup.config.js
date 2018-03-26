import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import graphql from 'rollup-plugin-graphql';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';


export default {
	input: 'index.ts',
	plugins: [
		graphql(),
		typescript({
			typescript: require('typescript')
		}),
		babel({
			exclude: [
				'*.json'
			],
			presets: [
				[ 'env', {
					targets: {
						browsers: ['last 2 versions', 'not ie > 0', 'iOS >= 8']
					},
					modules: false,
					loose: true
				}]
			],
			plugins: [
				'transform-object-assign'
			]
		}),
		nodeResolve({
			jsnext: true,
			extensions: [ '.ts', '.json' ]
		})
	],
  output: [{
		dest: pkg["main"],
		format: "umd",
		moduleName: "zm-x-api-js-client",
		sourceMap: true
	}, {
		dest: pkg["module"],
		format: "es",
		sourceMap: true
	}],
};
