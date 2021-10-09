<script lang="ts">
	import list from '$db/kemenag/list.json';
	import IconSearch from '../icon/search.svelte';
	import IconBookOpen from '../icon/book-open.svelte';

	let dataView = list;
	let querySearch = '';
	let dataFiltered = [];
	$: {
		dataFiltered = dataView.filter((data) => {
			if (querySearch != null) {
				return data.surat_name.toLocaleLowerCase().includes(querySearch);
			}
		});
	}
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
				<IconBookOpen fill="#fff" width={15} height={15} />
				<span class="text-white text-xs ml-1">surah terakhir dibaca</span>
			</div>
			<span class="text-white text-xs">tidak ada surat yang disimpan</span>
		</div>
		<div class="lg:w-3/12 w-4/12 justify-center flex">
			<img src="icon.png" alt="" class="lg:h-24" />
		</div>
	</div>
	<div class="bg-gray-200 rounded-xl flex flex-row py-2 px-4 mb-4">
		<input
			bind:value={querySearch}
			type="text"
			placeholder="Search Surah"
			class="bg-transparent focus:outline-none w-11/12"
		/>
		<div class="px-2 align-middle flex" style="padding-top: 0.2rem;">
			<IconSearch fill="#000" width={20} height={20} />
		</div>
	</div>
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
