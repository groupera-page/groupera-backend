module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: 'eslint:recommended',
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		indent: ['error', 'tab', { 'SwitchCase': 1 }],
		'no-throw-literal': 0,
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		'semi-style': ['error', 'last'],
	},
}
