import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styler';

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
			styles({
				mode: [
					'inject',
					(varname) => `import { styleInject } from 'harmony-ui';styleInject(${varname});`
				],
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
