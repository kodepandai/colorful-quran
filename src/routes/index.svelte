<script lang="ts">
	import list from '$db/kemenag/list.json';
	import Icon from '@iconify/svelte';
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
		getLastSurah = list.find(
			(data) => data.id.toString() == localStorage.getItem('last_read_surah')
		)?.surat_name;
		getLastAyat = localStorage.getItem('last_read_ayat');
	});
</script>

<div class="sm:w-1/2 flex flex-col p-4 mx-auto">
	<div class="text-center mb-2">
		<span class="font-bold text-indigo-900 text-xl">Colorful Quran</span>
	</div>
	<div
		class=" from-blue-500 to-indigo-700 bg-gradient-to-br rounded-xl pl-4 pt-6 mb-2 flex flex-row"
	>
		<div class="lg:w-9/12 w-8/12 flex flex-col pb-6">
			<span class="text-white text-sm mb-2">Assalamualaikum</span>
			<div class="flex flex-row mb-2">
				<Icon icon="ant-design:read-outlined" color="#fff" width="20" height="20" />
				<span class="text-white text-xs ml-1">surah terakhir dibaca</span>
			</div>
			<div class="flex">
				{#if getLastSurah == ''}
					<span class="text-white text-xs">tidak ada surat yang disimpan</span>
				{:else}
					<span class="text-white text-xs">Surah: {getLastSurah}</span>
					<span class="text-white text-xs"> &nbsp; ayat {getLastAyat}</span>
				{/if}
			</div>
		</div>
		<div class="lg:w-3/12 w-4/12 justify-center flex">
			<img src="icon.png" alt="" class="lg:h-24" />
		</div>
	</div>
	<div class="bg-gray-200 rounded-xl flex flex-row py-2 pl-4 pr-1 mb-4">
		<input
			bind:value={querySearch}
			type="text"
			placeholder="Search Surah"
			class="bg-transparent focus:outline-none w-11/12"
		/>
		<div class="px-2 align-middle flex" style="padding-top: 0.2rem;">
			<Icon icon="et:search" width="20" height="20" />
		</div>
	</div>

	{#if dataFiltered.length <= 0}
		<span class="text-center text-gray-500 ">Surah tidak ditemukan</span>
	{/if}
	{#each dataFiltered as surah}
		<a class="flex flex-row py-3 mb-2 justify-between border-b" href={`/kemenag/surah/${surah.id}`}>
			<div class="flex">
				<div class="flex p-1 w-10 justify-center rounded-lg bg-blue-700">
					<span class="inline-block align-middle text-white">{surah.id}</span>
				</div>
				<div class="flex flex-col line ml-3">
					<span class="text-sm">{` ${surah.surat_name}`}</span>
					<div class="flex flex-row">
						<span class="text-xs text-gray-400">{` ${surah.surat_terjemahan}`}</span>
						<span class="text-xs ml-2 text-gray-400">{` ${surah.count_ayat}`} ayat</span>
					</div>
				</div>
			</div>
			<span class="font-arab inline-block align-baseline font-bold text-indigo-900"
				>{surah.surat_text}</span
			>
		</a>
	{/each}
</div>
