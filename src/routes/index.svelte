<script lang="ts">
	import { goto } from '$app/navigation';

	import list from '$db/kemenag/list.json';
	import Icon from '@iconify/svelte';
	import { Setting$ } from '$store/Setting';
	import { onMount } from 'svelte';

	let querySearch = '';
	let dataFiltered = [];
	let getLastSurah = '';
	let getLastAyat = '';
	$: {
		dataFiltered = list.filter((data) => {
			return data.surat_name.toLocaleLowerCase().includes(querySearch.toLocaleLowerCase());
		});
	}

	onMount(() => {
		getLastSurah = list.find((data) => data.id.toString() == $Setting$.last_read_surah)?.surat_name;
		getLastAyat = $Setting$.last_read_aya;
	});

	const gotoLastRead = () => {
		goto('/kemenag/surah/' + $Setting$.last_read_surah + '#' + $Setting$.last_read_aya);
	};
</script>

<div
	class="bg-[#F3F3F3] rounded-full flex py-2 px-4 my-4 justify-between items-center border border-[#E6E6E6]"
>
	<Icon icon="bx:bx-search" width="20" height="20" color="#757575" />
	<input
		bind:value={querySearch}
		type="text"
		placeholder="Cari surah yang diinginkan"
		class="bg-transparent focus:outline-none w-11/12 text-graySecond"
	/>
</div>
<div class="bg-secondary rounded-xl p-3 mb-4 flex">
	<div class="bg-[#F3F3F3] rounded-lg w-40 md:w-1/2 flex flex-col p-2">
		<div class="flex">
			<Icon icon="codicon:book" width="14" height="14" />
			<span class="text-xs pl-2"> Surah terakhir dibaca</span>
		</div>
		{#if !getLastSurah}
			<span class="text-xs">tidak ada surat yang disimpan</span>
		{:else}
			<span class="text-xs">Surah: {getLastSurah}</span>
			<span class="text-xs">Ayat: {getLastAyat}</span>
		{/if}
	</div>
	<div class="flex items-center justify-between w-60 md:w-1/2 px-4">
		<div class="flex flex-col items-center cursor-pointer" on:click={() => gotoLastRead()}>
			<Icon icon="emojione-monotone:open-book" color="#fff" width="30" height="30" />
			<span class="text-xs text-white">Last read</span>
		</div>
		<div class="flex flex-col items-center cursor-pointer">
			<Icon icon="bx:bx-bookmark-alt" color="#fff" width="30" height="30" />
			<span class="text-xs text-white">Penanda</span>
		</div>
		<div class="flex flex-col items-center cursor-pointer">
			<Icon icon="gg:apple-watch" color="white" width="30" height="30" />
			<span class="text-xs text-white">Tasbih</span>
		</div>
	</div>
</div>

{#if dataFiltered.length <= 0}
	<div class="flex w-full justify-center">
		<span class="text-gray-500 ">Surah tidak ditemukan</span>
	</div>
{/if}
{#each dataFiltered as surah}
	<a class="flex flex-row py-3 mb-2 justify-between border-b" href={`/kemenag/surah/${surah.id}`}>
		<div class="flex">
			<div class="inline-flex p-1 w-14 justify-center items-center">
				<img src={'/border.png'} class="w-full" alt="" />
				<span class="align-middle absolute text-sm">{surah.id}</span>
			</div>
			<div class="flex flex-col line ml-3">
				<span class="text-sm">{` ${surah.surat_name}`}</span>
				<div class="flex flex-row">
					<span class="text-xs text-gray-400">{` ${surah.surat_terjemahan}`}</span>
					<span class="text-xs ml-2 text-gray-400">{` ${surah.count_ayat}`} ayat</span>
				</div>
			</div>
		</div>
		<span class="font-arab inline-block align-baseline font-bold text-primary"
			>{surah.surat_text}</span
		>
	</a>
{/each}
