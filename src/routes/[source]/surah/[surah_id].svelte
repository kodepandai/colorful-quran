<script context="module" lang="ts">
	import type { IAya, ISurah, ITajweed } from '$contract/surah';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
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
	import Icon from '@iconify/svelte';
	let getLastSurah = '';
	let getLastAyat = '';
	export let surah: IAya[];
	export let surahDetail: ISurah;
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

	onMount(async () => {
		getLastSurah = await localStorage.getItem('last_read_surah');
		getLastAyat = await localStorage.getItem('last_read_ayat');
	});
	const saveLastReading = async (surah: any, ayat: any) => {
		getLastSurah = surah;
		getLastAyat = ayat;
		await localStorage.setItem('last_read_surah', surah);
		await localStorage.setItem('last_read_ayat', ayat);
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

	{#each surah as aya}
		{#if aya.sura_id != 1 || aya.aya_number != 1}
			<div class="flex">
				<div on:click={() => saveLastReading(aya.sura_id, aya.aya_number)}>
					{#if getLastSurah == String(aya.sura_id) && getLastAyat == String(aya.aya_number)}
						<Icon icon="emojione-monotone:open-book" color="#5C7AEA" width="20" height="20" />
					{:else}
						<Icon icon="emojione-monotone:open-book" color="#B2B1B9" width="20" height="20" />
					{/if}
				</div>
			</div>
			<div class="font-arab py-2 mb-3 border-b text-xl">
				{#each aya.tajweed as tajweed}
					<i class={tajweed.class} title={tajweed.class}>
						{aya.aya_text.slice(tajweed.start, tajweed.end)}
					</i>
				{/each}
				<p class="font-sans text-sm mt-2 pt-2" style="direction: ltr;">
					{aya.aya_number}. {aya.translation_aya_text}
				</p>
			</div>
		{/if}
	{/each}
</div>
