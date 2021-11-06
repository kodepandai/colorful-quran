import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { resolve } from 'path';
import {version, changelog} from './constant.cjs'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$db: resolve('./src/db'),
					$contract: resolve('./src/contract'),
					$component: resolve('./src/component'),
					$store: resolve('./src/store'),
					$tajweed: resolve('./src/tajweed')
				}
			},
			define: {
				"process.env.VERSION": JSON.stringify("V"+version),
				"process.env.CHANGELOG": JSON.stringify(changelog)
			}
		}
	}
};

export default config;
