<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from './Modal.svelte';

	let showModal = false;
</script>

<div class="flex justify-between h-14 sticky top-0 bg-primary">
	{#if $page.path != '/'}
		<div on:click={() => goto('/')} class="h-full cursor-pointer items-center flex ml-4">
			<Icon icon="akar-icons:arrow-left" width="30" height="30" color="#fff" />
		</div>
	{/if}
	<div class="flex-grow items-center flex justify-center">
		<h1 class="font-bold text-xl text-white">Colorful Quran</h1>
	</div>
	{#if $page.path != '/'}
		<div class="h-full cursor-pointer items-center flex mr-4" on:click={() => (showModal = true)}>
			<Icon icon="clarity:cog-line" width="30" height="30" color="#fff" />
		</div>
	{/if}
</div>

{#if showModal}
	<Modal on:dismiss={() => (showModal = false)}>
		<div class="border-b py-2 flex mb-3 cursor-pointer">
			<div class="w-12 flex justify-center">
				<Icon icon="fluent:dark-theme-24-filled" width="20" height="20" />
			</div>
			<span>Tema gelap / terang</span>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer">
			<div class="w-12 flex justify-center">
				<Icon icon="ant-design:copy-outlined" width="20" height="20" />
			</div>
			<span>Salin tautan surah ini</span>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer">
			<div class="w-12 flex justify-center">
				<Icon icon="emojione-monotone:bookmark" width="20" height="20" />
			</div>
			<span>Tandai surah ini</span>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer">
			<div class="w-12 flex justify-center">
				<Icon icon="codicon:book" width="20" height="20" />
			</div>
			<span>Mode Buku / per ayat</span>
		</div>
		<div class="border-b py-2 flex mb-3">
			<div class="w-12 flex justify-center">
				<Icon icon="bx:bx-font-size" width="20" height="20" />
			</div>
			<div class="block">
				<span>Ukuran Ayat</span>
				<input type="range" min="1" max="100" value="12" class="w-full" />
				<span class="text-xs text-graySecond">12 px</span>
			</div>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer">
			<div class="w-12 flex justify-center">
				<Icon icon="bx:bx-font-size" width="20" height="20" />
			</div>
			<div class="block">
				<span>Ukuran Terjemahan</span>
				<input type="range" min="1" max="100" value="12" class="w-full" />
				<span class="text-xs text-graySecond">12 px</span>
			</div>
		</div>
	</Modal>
{/if}
