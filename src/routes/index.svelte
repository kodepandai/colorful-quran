<script lang="ts">
	import list from '$db/kemenag/list.json';
	import IconSearch from '../icon/search.svelte';
	import IconBookOpen from '../icon/book-open.svelte';
</script>

<div class="sm:w-1/2 flex flex-col p-4 mx-auto">
	<div class="flex flex-row py-2">
		<div class="w-11/12 pl-4">
			<span class="font-bold text-indigo-900 text-xl">Colorfull Quran</span>
		</div>
		<div class="px-2">
			<IconSearch fill="#000" width={20} height={20} />
		</div>
	</div>
	<div
		class=" from-blue-500 to-indigo-700 bg-gradient-to-br rounded-xl px-4 py-8 mb-4 flex flex-row"
	>
		<div class="w-9/12 flex flex-col">
			<span class="text-white text-sm mb-2">Assalamualaikum</span>
			<div class="flex flex-row mb-2">
				<IconBookOpen fill="#fff" width={15} height={15} />
				<span class="text-white text-xs ml-1">surah terakhir dibaca</span>
			</div>
			<span class="text-white text-xs">tidak ada surat yang disimpan</span>
		</div>
		<div class="px-2 w-3/12">
			<IconBookOpen width={70} height={70} />
		</div>
	</div>
	{#each list as surah}
		<a class="flex flex-row p-4 mb-2 justify-between border-b" href={`/kemenag/surah/${surah.id}`}>
			<div class="flex">
				<div class="block pt-1">
					<span class="inline-block align-middle">{surah.id}.</span>
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
