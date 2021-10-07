<script context="module" lang="ts">
	import type { IAya, ITajweed } from '$contract/surah';
	import type { Load } from '@sveltejs/kit';

	const getSurah = async (source, surah_id) => {
		return (await import(`../../../db/${source}/surah/${surah_id}.json`)).default as IAya[];
	};

	export const load: Load = async ({ page }) => {
		const surah = await getSurah(page.params.source, page.params.surah_id);
		return {
			status: 200,
			props: {
				surah
			}
		};
	};
</script>

<script lang="ts">
	export let surah: IAya[];
	surah.map((aya) => {
		let sliceAya: ITajweed[] = [
			{
				class: '',
				start: 0,
				end: 0
			}
		];
		aya.tajweed?.forEach((t) => {
			const lastSlice = sliceAya[sliceAya.length - 1];
			if (lastSlice.end < t.start) {
				sliceAya.push({
					class: '',
					start: lastSlice.end,
					end: t.start
				});
				sliceAya.push(t);
			} else {
				sliceAya.push(t);
			}
		});
		sliceAya.push({
			class: '',
			start: sliceAya[sliceAya.length - 1].end,
			end: aya.aya_text.length
		});
		sliceAya.shift();
		aya.tajweed = sliceAya;
		return aya;
	});
</script>

<div class="h-full w-full bg-gray-200">
	<div class="container mx-auto p-4">
		{#each surah as aya}
			<div class="font-arab p-3 shadow rounded-md mb-4 bg-white text-xl">
				{#each aya.tajweed as tajweed}
					<i class={tajweed.class}>
						{aya.aya_text.slice(tajweed.start, tajweed.end)}
					</i>
				{/each}
				<p class="font-sans text-sm mt-2 border-t pt-2" style="direction: ltr;">
					{aya.aya_number}. {aya.translation_aya_text}
				</p>
			</div>
		{/each}
	</div>
</div>
