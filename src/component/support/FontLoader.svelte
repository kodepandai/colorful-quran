<script lang="ts">
	import { onMount } from 'svelte';

	let fonts = [
		{
			name: 'Scheherazade New',
			weight: [400]
		}
	];
	let interval = fonts.reduce((p, c) => {
		p[c.name] = null;
		return p;
	}, {});
	let media = 'print';

	const fontLoadListener = (font: string) => {
		let hasLoaded = false;

		try {
			hasLoaded = (document as any).fonts.check(`12px "${font}"`);
			console.log(font, hasLoaded);
		} catch (error) {
			console.info('CSS font loading API error', error);
			fontLoadedSuccess(font);
			return;
		}

		if (hasLoaded) {
			fontLoadedSuccess(font);
		}
	};

	const fontLoadedSuccess = (font: string) => {
		if (interval[font]) {
			clearInterval(interval[font]);
		}
		/* Apply class names */
		document
			.getElementsByTagName('body')[0]
			.classList.add(`${font.toLowerCase().replace(/ /g, '-')}--loaded`);
	};

	onMount(() => {
		document.getElementsByTagName('body')[0].classList.remove('no-js');
		media = 'all';
		fonts.map(({ name }) => {
			interval[name] = setInterval(() => fontLoadListener(name), 500);
			setTimeout(() => {
				if (interval[name]) {
					clearInterval(interval[name]);
					console.warn('font ' + name + ' not loaded');
				}
			}, 5000);
		});
	});
</script>

<!-- font checker, make it invisible -->
{#each fonts as font}
	<div class="accessible-hidden" style="font-family: '{font.name}'">&nbsp;</div>
{/each}

<svelte:head>
	<!-- https://fonts.gstatic.com is the font file origin -->
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	{#each fonts as font}
		<link
			rel="preload"
			as="style"
			href="https://fonts.googleapis.com/css2?family={font.name.replace(
				' ',
				'+'
			)}:wght@{font.weight.join(';')}&display=swap"
		/>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family={font.name.replace(
				' ',
				'+'
			)}:wght@{font.weight.join(';')}&display=swap"
			media={media[font.name]}
		/>
	{/each}

	<noscript>
		{#each fonts as font}
			<link
				href="https://fonts.googleapis.com/css2?family={font.name.replace(
					' ',
					'+'
				)}:wght@{font.weight.join(';')}&display=swap"
				rel="stylesheet"
			/>
		{/each}
	</noscript>
</svelte:head>

<style>
	/* Accessible hiding */
	.accessible-hidden {
		position: absolute;
		overflow: hidden;
		clip: rect(0 0 0 0);
		height: 1px;
		width: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
	}

	:global(body.no-js) {
		--font-arab: 'Scheherazade New';
	}
	:global(.scheherazade-new--loaded) {
		--font-arab: 'Scheherazade New';
	}

	/* fallback when font not loaded */
	:global(body):not(.no-js):not(.scheherazade-new--loaded) {
		--font-arab: 'Geeza Pro', 'Nadeem', 'Al Bayan', 'DecoType Naskh', 'DejaVu Serif', 'STFangsong',
			'STHeiti', 'STKaiti', 'STSong', 'AB AlBayan', 'AB Geeza', 'AB Kufi', 'DecoType Naskh',
			'Aldhabi', 'Andalus', 'Sakkal Majalla', 'Simplified arab', 'Traditional arab',
			'arab Typesetting', 'Urdu Typesetting', 'Droid Naskh', 'Droid Kufi', 'Roboto', 'Tahoma',
			'Times New Roman', 'Arial', serif;
		line-height: 1.6;
		font-weight: 400;
		letter-spacing: -0.6px;
		word-spacing: -2px;
	}
</style>
