<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	let surah;

	const getSurah = async (source, surah_id) => {
		surah = (await import(`../../../db/${source}/surah/${surah_id}.json`)).default;
	};

	export const load: Load = async ({ page, fetch, session }) => {
		await getSurah(page.params.source, page.params.surah_id);
		return {
			status: 200,
			props: {
				surah
			}
		};
	};
</script>

<pre>
    {JSON.stringify(surah, null, 2)}
</pre>
