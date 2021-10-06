import preprocess from 'svelte-preprocess';
import {resolve} from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					"$db": resolve("./src/db"),
					"$contract": resolve('./src/contract'),
					"$component": resolve('./src/component')
				}
			}
		}
	}
};

export default config;
