<script context="module" lang="ts">
	import type { IAya, ITajweed } from '$contract/surah';
	import type { Load } from '@sveltejs/kit';
	let basmalah = 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ';
	let basmalah01 = 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.';

	const getSurah = async (source, surah_id) => {
		return (await import(`../../../db/${source}/surah/${surah_id}.json`)).default as IAya[];
	};

	const getNameSurah = async () => {
		return await (
			await import(`../../../db/kemenag/list.json`)
		).default;
	};

	export const load: Load = async ({ page }) => {
		const surah = await getSurah(page.params.source, page.params.surah_id);
		const nameSurah = await getNameSurah();

		return {
			status: 200,
			props: {
				surah,
				nameSurah
			}
		};
	};
</script>

<script lang="ts">
	export let surah: IAya[];
	export let nameSurah;
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

<div class="sm:w-1/2 flex flex-col p-4 mx-auto">
	<div class="text-center mb-2">
		<span class="font-bold text-indigo-900 text-xl">Colorfull Quran</span>
	</div>
	<div
		class="from-blue-500 to-indigo-700 bg-gradient-to-br rounded-xl px-8 py-5 mb-4 flex flex-col text-center"
	>
		<span class="text-lg text-white">{nameSurah[0].surat_name}</span>
		<span class="text-md text-white mb-1">{nameSurah[0].surat_terjemahan}</span>
		<hr />
		<span class="text-sm text-white mt-2 mb-4">{nameSurah[0].count_ayat} ayat</span>
		<span class="text-white text-3xl mb-2">{basmalah}</span>
		<span class="text-white text-xs">{basmalah01}</span>
	</div>

	{#each surah as aya}
		{#if aya.sura_id != 1 || aya.aya_number != 1}
			<div class="font-arab py-2 mb-3 border-b text-xl">
				{#each aya.tajweed as tajweed}
					<i class={tajweed.class}>
						{aya.aya_text.slice(tajweed.start, tajweed.end)}
					</i>
				{/each}
				<p class="font-sans text-sm mt-2 pt-2" style="direction: ltr;">
					{aya.sura_id == 1 && aya.aya_number != 1 ? aya.aya_number - 1 : aya.aya_number}. {aya.translation_aya_text}
				</p>
			</div>
		{/if}
	{/each}
</div>
