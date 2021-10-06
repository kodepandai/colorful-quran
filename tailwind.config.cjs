module.exports = {
	mode: 'jit',
	purge: ['./src/lib/component/**/*.svelte', './src/routes/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				arab: 'var(--font-arab)'
			}
		}
	}
};
