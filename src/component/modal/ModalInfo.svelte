<script lang="ts">
	import Modal from '$component/Modal.svelte';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	export let show = false;

	interface Icontributor {
		avatar_url: string;
		login: string;
		html_url: string;
		url: string;
	}
	let contributor: Icontributor[];
	onMount(async () => {
		contributor = await fetch(
			'https://api.github.com/repos/kodepintar/colorful-quran/contributors'
		).then((data) => data.json());
	});

	let tabs = 'aboutUs';

	const moveTabs = (params) => {
		tabs = params;
	};
</script>

{#if show}
	<Modal on:dismiss={() => (show = false)} title="Tentang Kami">
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
				Version Updates
			</button>
		</tabs>

		{#if tabs == 'aboutUs'}
			<div class="flex flex-col">
				<p class="mb-3">
					Ini adalah proyek sumber terbuka yang bisa digunakan secara bebas, surah yang ada di
					colorful-quran diambil dari Kementrian Agama Indonesia, jika anda menemukan kesalahan atau
					mempunyai ide yang lebih baik, silah submit issue ke repository github kami, segera akan
					kami perbaiki di versi selanjutnya.
				</p>
				<span class="text-sm mb-2">This our repository</span>
				<a
					href="https://github.com/kodepintar/colorful-quran"
					alt="github repository"
					class="flex items-center mb-4"
				>
					<Icon icon="akar-icons:github-fill" width="25" height="25" />
					<span class="ml-2">Github</span>
				</a>

				<h3 class="mb-2 text-sm">Contributor</h3>
				<div class="grid grid-cols-4 gap-3">
					{#each contributor as contribute}
						<a href={contribute.html_url} class="w-20 items-center flex flex-col">
							<img src={contribute.avatar_url} alt={contribute.login} class="w-16 rounded-full" />
							<span class="text-sm text-center">{contribute.login}</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}

		{#if tabs == 'changelog'}
			<div class="flex flex-col">
				<span class="text-xl">Perubahan</span>
				<span class="text-sm mb-2">Version: 0.3.0</span>
				<hr />
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt accusantium in aut quis
					ullam quaerat veritatis. Dolorum numquam fugit, sequi impedit, id illum accusamus
					aspernatur, voluptatem harum vel suscipit recusandae?
				</p>
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
</style>
