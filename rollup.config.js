import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import graphql from 'rollup-plugin-graphql';
import localResolve from 'rollup-plugin-local-resolve';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import * as graphqlType from 'graphql/type';
import * as graphqlLanguage from 'graphql/language';
import * as graphqlExecution from 'graphql/execution';
import * as graphqlSubscription from 'graphql/subscription';
import * as graphqlError from 'graphql/error';
import * as graphqlUtilities from 'graphql/utilities';
import * as graphqlValidators from 'graphql/validation';

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
		commonjs({
			namedExports: {
				// 'graphql-tools': [ 'makeExecutableSchema' ],
				'graphql/type': Object.keys(graphqlType),
				'graphql/language': Object.keys(graphqlLanguage),
				'graphql/execution': Object.keys(graphqlExecution),
				'graphql/subscription': Object.keys(graphqlSubscription),
				'graphql/error': Object.keys(graphqlError),
				'graphql/utilities': Object.keys(graphqlUtilities),
				'graphql/validation': Object.keys(graphqlValidators)
			}
		}),
		typescript({
			typescript: require('typescript')
		}),
		babel({
			extensions: ['.ts'],
			exclude: 'node_modules/**'
		})
	],
	output: {
		exports: FORMAT==='es' ? null : 'named'
	},
};
