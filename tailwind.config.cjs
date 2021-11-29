module.exports = {
	darkMode: 'class',
	mode: 'jit',
	purge: ['./src/component/**/*.svelte', './src/routes/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				arab: 'var(--font-arab)',
				sans: 'var(--font-sans)',
				poppins: 'var(--font-poppins)'
			},
			colors: {
				primary: '#2B52A1',
				secondary: '#6A6A6A',
				thertiary: '#9B9B9B',
				dark: '#090e11'
			}
		}
	}
};
