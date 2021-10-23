<script lang="ts">
	import type { IAya, ITajweed } from '$contract/surah';
	import { Setting$ } from '$store/Setting';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import AyaNumber from './AyaNumber.svelte';
	const dispatch = createEventDispatcher();

	export let surah: IAya[];
	interface IToolTip {
		tajweed: ITajweed;
		position: {
			x: number;
			y: number;
			inverseX: boolean;
		};
	}
	let tooltip: IToolTip = {
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
		console.log(e.clientX, window.innerWidth, e.clientX < window.innerWidth / 2);
		tooltip = {
			tajweed,
			position: {
				x: e.clientX,
				y: e.clientY,
				inverseX: e.clientX > window.innerWidth / 2
			}
		};
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
	{#if aya.sura_id != 1 || aya.aya_number != 1}
		<div class="flex">
			<button on:click={() => saveLastReading(aya)}>
				{#if $Setting$.last_read_surah == aya.sura_id.toString() && $Setting$.last_read_aya == aya.aya_number.toString()}
					<Icon icon="emojione-monotone:open-book" color="#5C7AEA" width="20" height="20" />
				{:else}
					<Icon icon="emojione-monotone:open-book" color="#B2B1B9" width="20" height="20" />
				{/if}
			</button>
		</div>
		<div
			class="font-arab py-2 mb-3 border-b text-xl overscroll-auto dark:text-white"
			id={aya.aya_number.toString()}
		>
			<span
				style="font-size: {$Setting$.ukuranAyat}px; line-height: {$Setting$.ukuranAyat + 50}px "
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
			<AyaNumber number={aya.aya_number} />
			<p
				class="font-sans mt-2 pt-2 dark:text-white"
				style="direction: ltr; font-size: {$Setting$.ukuranTerjemahan}px;"
			>
				{aya.aya_number}. {aya.translation_aya_text}
			</p>
		</div>
	{/if}
{/each}

{#if tooltip?.tajweed?.class}
	<div
		class="fixed flex justify-center items-center bg-black bg-opacity-25 inset-0"
		on:click={() => (tooltip.tajweed = null)}
	>
		<div class="relative h-full w-full">
			<div
				class="capitalize font-semibold border rounded bg-white p-4 whitespace-nowrap shadow absolute {tooltip
					.position.inverseX
					? '-translate-x-full'
					: ''} -translate-y-full"
				style={`top: ${tooltip.position.y}px; left: ${tooltip.position.x}px; border-color: var(--color-${tooltip.tajweed.class})`}
			>
				{tooltip.tajweed.class.replace(/-/g, ' ')}
			</div>
			<div
				class="capitalize   border rounded bg-white p-4  shadow fixed bottom-0 left-0 right-0"
				style={`border-color: var(--color-${tooltip.tajweed.class})`}
			>
				<p class="whitespace-nowrap font-semibold">
					Cara Membaca {tooltip.tajweed.class.replace(/-/g, ' ')} :
				</p>

				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'madd wajib' || tooltip.tajweed.class.replace(/-/g, ' ') === 'madd-jaiz'}
					<p>
						mad bermakna memanjangkan suara dengan lanjutan menurut kedudukan salah satu dari huruf
						mad.
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'madd arid lissukun'}
					<p>
						bacaan panjang disebabkan huruf mad yakni ya, wawu dan alif bertemu waqaf sehingga harus
						berhenti. Panjang mad arid lissukun yaitu boleh dibaca 1 alif ( 2 harakat ), 2 alif ( 4
						harakat ) atau 3 alif ( 6 harakat ).
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'ghunnah'}
					<p>
						Dengungkanlah mim dan nun yang bertasydid.. dan namakanlah kedua huruf tersebut dengan
						huruf ghunnah dan tampakkanlah
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'idgham mimi'}
					<p>
						Apabila mim sukun(مْ) bertemu dengan mim yang berharokat (م), maka cara membacanya
						adalah seperti menyuarakan mim rangkap atau ditasyidkan dan wajib dibaca dengung.
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'ikhfa syafawi'}
					<p>
						Apabila mim mati (مْ) bertemu dengan ba (ب), maka cara membacanya harus dibunyikan
						samar-samar di bibir dan didengungkan.
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'idgham bighunnah'}
					<p>
						Jika nun mati atau tanwin bertemu huruf huruf seperti: mim (م), nun (ن) wau (و), dan ya'
						(ي), ia harus dibaca dengan ditahan.
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'idgham bilaghunnah'}
					<p>
						Jika nun mati atau tanwin bertemu huruf huruf seperti: mim (م), nun (ن) wau (و), dan ya'
						(ي), ia harus dibaca dengan ditahan. Jika nun mati atau tanwin bertemu huruf-huruf
						seperti ra' (ر) dan lam (ل), maka ia dibaca tanpa ditahan.
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'ikhfa'}
					<p>
						Jika nun mati atau tanwin bertemu dengan huruf-huruf seperti ta'(ت), tsa' (ث), jim (ج),
						dal (د), żal (ذ), zai (ز), sin (س), syin (ش), sad (ص), dad (ض), tha (ط), zha (ظ), fa'
						(ﻑ), qaf (ق), dan kaf (ك), ia harus dibaca samar-samar
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'iqlab'}
					<p>
						Hukum ini terjadi apabila nun mati atau tanwin bertemu dengan huruf ba' (ب). Dalam
						bacaan ini, bacaan nun mati atau tanwin berubah menjadi bunyi mim.
					</p>
				{/if}
				{#if tooltip.tajweed.class.replace(/-/g, ' ') === 'qalqalah'}
					<p>
						bacaan pada huruf-huruf qalqalah dengan bunyi seakan-akan berdetik atau memantul. Huruf
						qalqalah ada lima yaitu ba (ب), jim (ج), dal (د), ta (ط), dan qaf (ق).
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<svelte:window on:scroll|passive={() => (tooltip.tajweed = null)} />
