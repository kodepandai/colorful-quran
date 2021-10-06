module.exports = {
	mode: 'jit',
	purge: ['./src/lib/component/**/*.svelte', './src/routes/**/*.svelte'],
	theme: {
		extend: {
			fontFamily: {
				lato: ['Lato', 'sans-seri'],
				arab: ['Scheherazade New', 'serif']
			},
			fontSize: { text24: '24px' }
		}
	}
};
