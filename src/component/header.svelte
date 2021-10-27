<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from './Modal.svelte';
	import { Setting$ } from '$store/Setting';
	let showModal = false;

	const themeMode = () => {
		let gettheme = window.document.getElementsByTagName('html')[0].classList.toggle('dark');
		let theme = gettheme ? 'dark' : 'light';
		$Setting$.theme = theme;
	};

	const copyUrl = () => {
		let url = window.location.href;
		navigator.clipboard.writeText(url);
		alert('Url berhasil disalin');
	};

	const changeUkuranAyat = (e) => {
		$Setting$.ukuranAyat = e.target.value;
	};
	const changeUkuranTerjemahan = (e) => {
		$Setting$.ukuranTerjemahan = e.target.value;
	};

	const hideTranslate = () => {
		$Setting$.showTranslate = !$Setting$.showTranslate;
	};
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
		<div class="border-b py-2 flex mb-3 cursor-pointer" on:click={() => themeMode()}>
			<div class="w-12 flex justify-center">
				<Icon icon="fluent:dark-theme-24-filled" width="20" height="20" />
			</div>
			<span>Tema {$Setting$.theme == 'dark' ? 'terang' : 'gelap'}</span>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer" on:click={() => copyUrl()}>
			<div class="w-12 flex justify-center">
				<Icon icon="ant-design:copy-outlined" width="20" height="20" />
			</div>
			<span>Salin tautan surah ini</span>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer" on:click={() => hideTranslate()}>
			<div class="w-12 flex justify-center">
				<Icon icon="bi:translate" width="20" height="20" />
			</div>
			<span>{$Setting$.showTranslate ? 'Hilangkan' : 'Tampilkan'} terjemahan</span>
		</div>
		<!-- <div class="border-b py-2 flex mb-3 cursor-pointer">
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
		</div> -->
		<div class="border-b py-2 flex mb-3">
			<div class="w-12 flex justify-center">
				<Icon icon="bx:bx-font-size" width="20" height="20" />
			</div>
			<div class="block">
				<span>Ukuran Ayat</span>
				<input
					type="range"
					min="10"
					max="40"
					class="w-full"
					on:change={changeUkuranAyat}
					value={$Setting$.ukuranAyat}
				/>
				<span class="text-xs text-graySecond">{$Setting$.ukuranAyat} px</span>
			</div>
		</div>
		<div class="border-b py-2 flex mb-3 cursor-pointer">
			<div class="w-12 flex justify-center">
				<Icon icon="bx:bx-font-size" width="20" height="20" />
			</div>
			<div class="block">
				<span>Ukuran Terjemahan</span>
				<input
					type="range"
					min="10"
					max="40"
					class="w-full"
					on:change={changeUkuranTerjemahan}
					value={$Setting$.ukuranTerjemahan}
				/>
				<span class="text-xs text-graySecond">{$Setting$.ukuranTerjemahan} px</span>
			</div>
		</div>
	</Modal>
{/if}
