module.exports = {
	darkMode: 'class',
	mode: 'jit',
	purge: ['./src/component/**/*.svelte', './src/routes/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				arab: 'var(--font-arab)',
				sans: 'var(--font-sans)'
			},
			colors: {
				primary: '#14279B',
				secondary: '#3D56B2',
				thertiary: '#5C7AEA',
				graySecond: '#757575',
				dark: '#090e11'
			}
		}
	}
};
