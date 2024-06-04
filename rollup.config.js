import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-import-css';

export default [
	{
		input: './src/client/js/application.js',
		output: {
			file: './build/client/js/application.js',
			format: 'esm'
		},
		plugins: [
			/*replace({
				preventAssignment: true,
				TESTING: isDev,
			}),*/
			//isProduction ? del({targets: 'dist/*'}) : null,
			css(),
			/*json({
				compact: true,
			}),*/
			//image(),
			nodeResolve(),
			//terser(),
			copy({
				copyOnce: true,
				targets: [
					{src: 'src/client/index.html', dest: 'build/client/'},
				]
			}),
		],
	},
];
