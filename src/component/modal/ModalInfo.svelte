<script lang="ts">
	import Modal from '$component/Modal.svelte';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import snarkdown from 'snarkdown';
	export let show = false;

	interface Icontributor {
		avatar_url: string;
		login: string;
		html_url: string;
		url: string;
	}
	let contributor: Icontributor[] = [];
	// let changelog: string;
	onMount(async () => {
		contributor = await fetch(
			'https://api.github.com/repos/kodepandai/colorful-quran/contributors'
		).then((data) => data.json());
	});

	let tabs = 'aboutUs';

	const moveTabs = (params) => {
		tabs = params;
	};
</script>

{#if show}
	<Modal on:dismiss={() => (show = false)} title="Colorful Quran {process.env.VERSION}">
		<tabs class="flex flex-row mb-2">
			<button
				class="text-gray-500 w-1/2 py-2 px-6 block hover:text-secondary focus:outline-none {tabs ==
				'aboutUs'
					? 'aktive'
					: ''}"
				on:click={() => moveTabs('aboutUs')}
			>
				Tentang Kami
			</button>
			<button
				class="text-gray-500 w-1/2 py-2 px-6 block hover:text-secondary focus:outline-none {tabs ==
				'changelog'
					? 'aktive'
					: ''}"
				on:click={() => moveTabs('changelog')}
			>
				Log Perubahan
			</button>
		</tabs>

		{#if tabs == 'aboutUs'}
			<div class="flex flex-col text-sm">
				<p class="mb-3">
					Aplikasi ini merupakan sumber terbuka yang bisa digunakan secara bebas. Data surat dan
					ayat diambil dari Kementrian Agama Indonesia. Aplikasi ini masih jauh dari sempurna. Jika
					anda menemukan kesalahan atau mempunyai saran, silakan submit issue ke repository github
					kami, segera akan kami perbaiki di versi selanjutnya.
				</p>
				<a
					href="https://github.com/kodepandai/colorful-quran"
					alt="github repository"
					class="flex items-center mb-4"
				>
					<Icon icon="akar-icons:github-fill" width="25" height="25" />
					<span class="ml-2">Github/KodePandai</span>
				</a>

				<h3 class="mb-2">Contributor</h3>
				<div class="grid grid-cols-4 gap-3">
					{#each contributor as contribute}
						<a href={contribute.html_url} target="_blank" class="w-20 items-center flex flex-col">
							<img src={contribute.avatar_url} alt={contribute.login} class="w-16 rounded-full" />
							<span class="text-sm text-center">{contribute.login}</span>
						</a>
					{/each}
					<a
						href="https://instagram.com/hizkiariel"
						target="_blank"
						class="w-20 items-center flex flex-col"
					>
						<img src="hizkiariel.jpeg" alt="Hisky Ariel" class="w-16 rounded-full" />
						<span class="text-sm text-center">Hizkiariel</span>
					</a>
				</div>
			</div>
		{/if}

		{#if tabs == 'changelog'}
			<div class="flex flex-col markdown overflow-y-scroll">
				{@html snarkdown(process.env.CHANGELOG)}
			</div>
		{/if}
	</Modal>
{/if}

<style>
	.aktive {
		@apply text-primary;
		@apply border-b-2;
		@apply font-medium;
		@apply border-primary;
	}
	:global(.markdown h2) {
		@apply font-bold;
	}
	:global(.markdown h3) {
		@apply pl-2;
		@apply italic;
		@apply text-sm;
	}
	:global(.markdown ul) {
		@apply text-xs;
		@apply list-disc;
		@apply pl-6;
	}
</style>
