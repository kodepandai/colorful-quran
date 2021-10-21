<script context="module" lang="ts">
	import type { IAya, ISurah } from '$contract/surah';
	import type { Load } from '@sveltejs/kit';
	let basmalah = 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ';
	let basmalah01 = 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.';
	const getSurah = async (source, surah_id) => {
		return (await import(`../../../db/${source}/surah/${surah_id}.json`)).default as IAya[];
	};

	const getSurahDetail = async (surah_id) => {
		const listSurah = (await import(`../../../db/kemenag/list.json`)).default;
		return listSurah[surah_id - 1];
	};

	export const load: Load = async ({ page }) => {
		const surah = await getSurah(page.params.source, page.params.surah_id);
		const surahDetail = await getSurahDetail(page.params.surah_id);

		return {
			status: 200,
			props: {
				surah,
				surahDetail
			}
		};
	};
</script>

<script lang="ts">
	import TajweedView from '$component/TajweedView.svelte';
	import { Setting$ } from '$store/Setting';

	export let surah: IAya[];
	export let surahDetail: ISurah;

	const saveLastReading = ({ detail: { sura_id, aya_number } }: { detail: IAya }) => {
		Setting$.set({
			last_read_aya: aya_number.toString(),
			last_read_surah: sura_id.toString()
		});
		alert('Data berhasil disimpan');
	};
</script>

<div class="sm:w-1/2 flex flex-col p-4 mx-auto">
	<div class="text-center mb-2">
		<span class="font-bold text-indigo-900 text-xl">Colorful Quran</span>
	</div>
	<div
		class="from-blue-500 to-indigo-700 bg-gradient-to-br rounded-xl px-8 py-5 mb-4 flex flex-col text-center"
	>
		<span class="text-lg text-white">{surahDetail.surat_name}</span>
		<span class="text-md text-white mb-1">{surahDetail.surat_terjemahan}</span>
		<hr />
		<span class="text-sm text-white mt-2 mb-4">{surahDetail.count_ayat} ayat</span>
		{#if surahDetail.id != 9}
			<span class="text-white text-3xl mb-2 font-arab">{basmalah}</span>
			<span class="text-white text-xs">{surahDetail.id == 1 ? '1. ' : ''}{basmalah01}</span>
		{/if}
	</div>
	<TajweedView {surah} on:saveLastReading={saveLastReading} />
</div>
