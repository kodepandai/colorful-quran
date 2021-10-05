<script lang="ts">
	import list from '$db/kemenag/list.json';
</script>

<h1>Al Qur'an</h1>
<div class="bg-green-300">
	<h2>List Surah</h2>
	<ul class="list-inside">
		{#each list as surah}
			<li class="list-item list-decimal">
				<a href={`/kemenag/surah/${surah.id}`}>
					{surah.surat_name}
				</a>
			</li>
		{/each}
	</ul>
</div>
