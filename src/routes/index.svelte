<script lang="ts">
	import list from '$db/kemenag/list.json';
	import SurahId from './[source]/surah/[surah_id].svelte';
</script>

<h1 class="text-7xl text-center font-lato">Al Qur'an</h1>
<div class=" xl:w-6/12 mx-auto px-4">
	{#each list as surah}
		<div class="p-2 ">
			<div
				class=" p-3 w-full hover:bg-green-300 bg-gray-400 rounded-full  text-center flex-row grid"
			>
				<a class=" font-arab text-2xl" href={`/kemenag/surah/${surah.id}`}>
					{surah.surat_text}
				</a>
				<a class="text-xs" href={`/kemenag/surah/${surah.id}`}>
					{surah.surat_name}
				</a>
			</div>
		</div>
	{/each}
</div>
