module.exports = {
	mode: 'jit',
	purge: ['./src/component/**/*.svelte', './src/routes/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				arab: 'var(--font-arab)',
				sans: 'var(--font-sans)'
			}
		}
	}
};
