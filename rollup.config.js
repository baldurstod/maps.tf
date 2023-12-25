import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';

export default [
	{
		input: './src/js/application.js',
		output: {
			file: './dist/js/application.js',
			format: 'esm'
		},
		plugins: [
			/*replace({
				preventAssignment: true,
				TESTING: isDev,
			}),*/
			//isProduction ? del({targets: 'dist/*'}) : null,
			postcss({
			}),
			/*json({
				compact: true,
			}),*/
			//image(),
			nodeResolve(),
			//terser(),
			copy({
				copyOnce: true,
				targets: [
					{src: 'src/index.html', dest: 'dist/'},
				]
			}),
		],
	},
];
