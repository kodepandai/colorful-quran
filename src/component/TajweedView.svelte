<script lang="ts">
	import type { IAya, ISurah, ITajweed } from '$contract/surah';
	import { Setting$ } from '$store/Setting';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import AyaNumber from './AyaNumber.svelte';
	import Share from './button/share.svelte';
	const dispatch = createEventDispatcher();

	export let surah: IAya[];
	export let surahDetail: ISurah = null;
	interface IToolTip {
		tajweed: ITajweed;
		showDesc: boolean;
		disableDismiss: boolean;
		position: {
			x: number;
			y: number;
			inverseX: boolean;
		};
	}
	let tooltip: IToolTip = {
		disableDismiss: false,
		showDesc: false,
		tajweed: null,
		position: {
			x: 0,
			y: 0,
			inverseX: false
		}
	};

	const saveLastReading = (aya: IAya) => {
		dispatch('saveLastReading', aya);
	};

	const showToolTip = (e: MouseEvent, tajweed: ITajweed) => {
		tooltip = {
			disableDismiss: false,
			showDesc: false,
			tajweed,
			position: {
				x: e.clientX,
				y: e.clientY,
				inverseX: e.clientX > window.innerWidth / 2
			}
		};
	};

	const hideToolTip = () => {
		if (!tooltip.disableDismiss) {
			tooltip.tajweed = null;
		}
	};

	const showDescription = () => {
		tooltip.disableDismiss = true;
		tooltip.showDesc = true;
		setTimeout(() => {
			tooltip.disableDismiss = false;
		}, 500);
	};

	$: surah = surah.map((aya) => {
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

{#each surah as aya}
	<div class="group flex flex-row border-b py-2">
		{#if aya.sura_id != 1 || aya.aya_number != 1}
			<div
				class="font-arab text-xl overscroll-auto dark:text-white pr-5 flex flex-1 flex-col"
				id={aya.aya_number.toString()}
			>
				<div class="flex flex-row align-middle">
					<span
						style="font-size: {$Setting$.ukuranAyat}px; line-height: {Number($Setting$.ukuranAyat) +
							50}px "
					>
						{#each aya.tajweed as tajweed}
							<i
								class={tajweed.class ? 'cursor-pointer ' + tajweed.class : ''}
								title={tajweed.class}
								on:click={(e) => showToolTip(e, tajweed)}
								>{aya.aya_text.slice(tajweed.start, tajweed.end)}</i
							>
						{/each}
					</span>
					<div class="p-2">
						<AyaNumber number={aya.aya_number} />
					</div>
				</div>
				<p
					class="font-sans mt-2 pt-2 dark:text-white  {$Setting$.showTranslate
						? 'h-auto leading-normal'
						: 'h-0 overflow-hidden leading-none'}"
					style="direction: ltr; font-size: {$Setting$.ukuranTerjemahan}px;"
				>
					{aya.aya_number}. {aya.translation_aya_text}
				</p>
			</div>
			{#if surahDetail}
				<div class="flex flex-col items-center space-y-2">
					<button on:click={() => alert('fitur masih dalam tahap pengembangan')}>
						<!-- ini kondisi nonaktif -->
						<Icon icon="uit:bookmark" color="#626262" width="24" height="24" />

						<!-- ini ketika di bookmark -->
						<!-- <Icon icon="bi:bookmark-check-fill" width="24" height="24" /> -->
					</button>

					<button on:click={() => saveLastReading(aya)}>
						{#if $Setting$.last_read_surah == aya.sura_id.toString() && $Setting$.last_read_aya == aya.aya_number.toString()}
							<Icon icon="emojione-monotone:open-book" color="#5C7AEA" width="24" height="24" />
						{:else}
							<Icon icon="emojione-monotone:open-book" color="#626262" width="24" height="24" />
						{/if}
					</button>

					<Share
						text={decodeURIComponent(
							`${aya.aya_text} %0A${aya.translation_aya_text} (${surahDetail.surat_name}:${aya.aya_number})`
						)}
					/>
				</div>
			{/if}
		{/if}
	</div>
{/each}

{#if tooltip?.tajweed?.class}
	<div
		class="fixed flex justify-center items-center bg-black bg-opacity-25 inset-0"
		on:click={hideToolTip}
	>
		<div class="relative h-full w-full">
			<button
				on:click={showDescription}
				class="inline-flex flex-row items-center capitalize font-semibold border rounded bg-white p-4 whitespace-nowrap shadow absolute {tooltip
					.position.inverseX
					? '-translate-x-full'
					: ''} -translate-y-full"
				style={`top: ${tooltip.position.y}px; left: ${tooltip.position.x}px; border-color: var(--color-${tooltip.tajweed.class})`}
			>
				{tooltip.tajweed.class.replace(/-/g, ' ')} &nbsp;<Icon
					icon="bi:question-circle-fill"
					inline
				/>
			</button>
			{#if tooltip.showDesc}
				<div
					class="capitalize   border rounded bg-white p-4  shadow fixed bottom-0 left-0 right-0"
					style={`border-color: var(--color-${tooltip.tajweed.class})`}
				>
					<p class="whitespace-nowrap font-semibold">
						Cara Membaca {tooltip.tajweed.class.replace(/-/g, ' ')} :
					</p>

					{#if tooltip.tajweed.class === 'madd-wajib' || tooltip.tajweed.class === 'madd-jaiz'}
						<p>
							mad bermakna memanjangkan suara dengan lanjutan menurut kedudukan salah satu dari
							huruf mad.
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'madd-arid-lissukun'}
						<p>
							bacaan panjang disebabkan huruf mad yakni ya, wawu dan alif bertemu waqaf sehingga
							harus berhenti. Panjang mad arid lissukun yaitu boleh dibaca 1 alif ( 2 harakat ), 2
							alif ( 4 harakat ) atau 3 alif ( 6 harakat ).
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'ghunnah'}
						<p>
							Dengungkanlah mim dan nun yang bertasydid.. dan namakanlah kedua huruf tersebut dengan
							huruf ghunnah dan tampakkanlah
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'idgham-mimi'}
						<p>
							Apabila mim sukun(مْ) bertemu dengan mim yang berharokat (م), maka cara membacanya
							adalah seperti menyuarakan mim rangkap atau ditasyidkan dan wajib dibaca dengung.
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'ikhfa-syafawi'}
						<p>
							Apabila mim mati (مْ) bertemu dengan ba (ب), maka cara membacanya harus dibunyikan
							samar-samar di bibir dan didengungkan.
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'idgham-bighunnah'}
						<p>
							Jika nun mati atau tanwin bertemu huruf huruf seperti: mim (م), nun (ن) wau (و), dan
							ya' (ي), ia harus dibaca dengan ditahan.
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'idgham-bilaghunnah'}
						<p>
							Jika nun mati atau tanwin bertemu huruf huruf seperti: mim (م), nun (ن) wau (و), dan
							ya' (ي), ia harus dibaca dengan ditahan. Jika nun mati atau tanwin bertemu huruf-huruf
							seperti ra' (ر) dan lam (ل), maka ia dibaca tanpa ditahan.
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'ikhfa'}
						<p>
							Jika nun mati atau tanwin bertemu dengan huruf-huruf seperti ta'(ت), tsa' (ث), jim
							(ج), dal (د), żal (ذ), zai (ز), sin (س), syin (ش), sad (ص), dad (ض), tha (ط), zha (ظ),
							fa' (ﻑ), qaf (ق), dan kaf (ك), ia harus dibaca samar-samar
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'iqlab'}
						<p>
							Hukum ini terjadi apabila nun mati atau tanwin bertemu dengan huruf ba' (ب). Dalam
							bacaan ini, bacaan nun mati atau tanwin berubah menjadi bunyi mim.
						</p>
					{/if}
					{#if tooltip.tajweed.class === 'qalqalah'}
						<p>
							bacaan pada huruf-huruf qalqalah dengan bunyi seakan-akan berdetik atau memantul.
							Huruf qalqalah ada lima yaitu ba (ب), jim (ج), dal (د), ta (ط), dan qaf (ق).
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<svelte:window on:scroll|passive={() => (tooltip.tajweed = null)} />
