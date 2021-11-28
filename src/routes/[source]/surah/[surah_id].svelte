<script context="module" lang="ts">
	import type { IAya, ISurah } from '$contract/surah';
	import type { Load } from '@sveltejs/kit';
	import Icon from '@iconify/svelte';
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
	import { goto } from '$app/navigation';
	import Share from '$component/button/share.svelte';
	import Header from '$component/header.svelte';
	import ModalGoToAyat from '$component/modal/ModalGoToAyat.svelte';

	export let surah: IAya[];
	export let surahDetail: ISurah;

	let showModalGoToAyat = false;

	const saveLastReading = ({ detail: { sura_id, aya_number } }: { detail: IAya }) => {
		$Setting$.last_read_aya = aya_number.toString();
		$Setting$.last_read_surah = sura_id.toString();
		alert('Data berhasil disimpan');
	};

	const nextSurah = () => {
		let page = surahDetail.id + 1;
		goto(page.toString());
	};
	const prevSurah = () => {
		let page = surahDetail.id - 1;
		goto(page.toString());
	};
</script>

<Header />
<div
	class="flex justify-between items-center px-4 pt-4 pb-2 border-b sticky top-14 bg-white dark:bg-dark"
>
	<div class="w-8 cursor-pointer dark:text-white" on:click={() => prevSurah()}>
		{#if surahDetail.id > 1}
			<Icon icon="ant-design:double-left-outlined" width="30" height="30" />
		{/if}
	</div>
	<div class="flex flex-col cursor-pointer" on:click={() => (showModalGoToAyat = true)}>
		<span class="text-lg font-bold text-center dark:text-white">{surahDetail.surat_name}</span>
		<div class="flex">
			<span class="text-xs text-graySecond dark:text-white">{surahDetail.surat_terjemahan}</span>
			<span class="text-xs text-graySecond dark:text-white">
				&nbsp;{surahDetail.count_ayat} ayat</span
			>
		</div>
	</div>
	<div class="w-8 cursor-pointer dark:text-white" on:click={() => nextSurah()}>
		{#if surahDetail.id < 114}
			<Icon icon="ant-design:double-right-outlined" width="30" height="30" />
		{/if}
	</div>
</div>
{#if surahDetail.id != 9}
	<div class="group flex flex-col items-center my-4 pb-2 dark:text-white">
		<span
			class="mb-2 font-arab"
			style="font-size: {$Setting$.ukuranAyat}px; line-height: {Number($Setting$.ukuranAyat) +
				50}px ">{basmalah}</span
		>
		{#if $Setting$.showTranslate}
			<span class="text-xs" style="direction: ltr; font-size: {$Setting$.ukuranTerjemahan}px;"
				>{surahDetail.id == 1 ? '1. ' : ''}{basmalah01}</span
			>
		{/if}
		<div class="hidden group-hover:flex mt-2 justify-between">
			<Share text={decodeURIComponent(`${basmalah} %0A${basmalah01}`)} />
		</div>
	</div>
{/if}
<div class="p-4">
	<TajweedView {surah} {surahDetail} on:saveLastReading={saveLastReading} />
</div>

<ModalGoToAyat bind:show={showModalGoToAyat} />
