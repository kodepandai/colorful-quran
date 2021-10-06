<script context="module" lang="ts">
	import type { IAya } from '$contract/surah';

	import type { Load } from '@sveltejs/kit';
	let surah: IAya[];

	const getSurah = async (source, surah_id) => {
		surah = (await import(`../../../db/${source}/surah/${surah_id}.json`)).default;
	};

	export const load: Load = async ({ page }) => {
		await getSurah(page.params.source, page.params.surah_id);
		return {
			status: 200,
			props: {
				surah
			}
		};
	};
</script>

{#each surah as aya}
<div class="p-2">
	<div class="font-arab p-3 bg-gray-400 rounded-md" style="direction: rtl;">
		{`${aya.aya_text.slice}`}
	</div>
	<div class="font-arab mt-2">
		{`${aya.aya_number}. ${aya.translation_aya_text}`}
	</div>
</div>
{/each}
