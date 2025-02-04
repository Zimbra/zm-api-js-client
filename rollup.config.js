import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import graphql from '@rollup/plugin-graphql';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';

const FORMAT = process.env.FORMAT;
const isESM = FORMAT === 'es';

const externalDeps = [
    '@apollo/client',
    'graphql',
    'lodash',
    'mitt'
];

const getExternalDeps = id => externalDeps.find(pkgName => id.includes('/node_modules/' + pkgName  + '/'));

export default {
    input: 'index.ts',
    external: isESM ? getExternalDeps : [],
    context: 'commonjsGlobal',
    plugins: [
        graphql(),
        nodeResolve({
            extensions: ['.js', '.ts', '.json']
        }),
        commonjs(),
        typescript(),
        babel({
            extensions: ['.ts'],
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        ...(process.env.visualize ? [visualizer({ open: true })] : [])
    ],
    output: {
        ...(isESM
            ? { file: `dist/zm-api-js-client.esm.js`, format: FORMAT } // Correct file name for ESM
            : FORMAT === 'umd'
            ? { file: `dist/zm-api-js-client.umd.js`, format: FORMAT, name: 'zmApiJsClient' } // Correct file name for UMD, and add 'name'
            : { file: `dist/zm-api-js-client.js` }), // Correct file name for CJS
        exports: isESM ? null : 'named',
        sourcemap: true
    }
};
