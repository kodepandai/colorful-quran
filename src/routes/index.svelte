<script lang="ts">
	import list from '$db/kemenag/list.json';
</script>

<h1 class="text-7xl text-center font-lato">Al Qur'an</h1>
<div class="sm:w-1/2 w-full px-4 mx-auto">
	{#each list as surah}
		<div class="p-2 ">
			<div
				class=" p-3 w-full px-8 hover:bg-green-300 bg-gray-400 rounded-full  justify-between flex items-center"
			>
				<a class="text-base" href={`/kemenag/surah/${surah.id}`}>
					{surah.id}.{` ${surah.surat_name}`}
				</a>
				<a class=" font-arab text-base" href={`/kemenag/surah/${surah.id}`}>
					{surah.id}.{surah.surat_text}
				</a>
			</div>
		</div>
	{/each}
</div>
