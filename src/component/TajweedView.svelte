<script lang="ts">
	import type { IAya, ITajweed } from '$contract/surah';
	import { Setting$ } from '$store/Setting';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let surah: IAya[];
	interface IToolTip {
		tajweed: ITajweed;
		position: {
			x: number;
			y: number;
		};
	}
	let tooltip: IToolTip = {
		tajweed: null,
		position: {
			x: 0,
			y: 0
		}
	};

	const saveLastReading = (aya: IAya) => {
		dispatch('saveLastReading', aya);
	};

	const showToolTip = (e: MouseEvent, tajweed: ITajweed) => {
		tooltip = {
			tajweed,
			position: {
				x: e.clientX,
				y: e.clientY
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
		<div class="font-arab py-2 mb-3 border-b text-xl overscroll-auto" id={aya.aya_number}>
			{#each aya.tajweed as tajweed}
				<i
					class={'leading-[4rem] ' + (tajweed.class ? 'cursor-pointer ' + tajweed.class : '')}
					title={tajweed.class}
					on:click={(e) => showToolTip(e, tajweed)}
				>
					{aya.aya_text.slice(tajweed.start, tajweed.end)}
				</i>
			{/each}
			<p class="font-sans text-sm mt-2 pt-2" style="direction: ltr;">
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
				class="capitalize font-semibold border rounded bg-white p-4 whitespace-nowrap shadow absolute -translate-x-full -translate-y-full"
				style={`top: ${tooltip.position.y}px; left: ${tooltip.position.x}px; border-color: var(--color-${tooltip.tajweed.class})`}
			>
				{tooltip.tajweed.class.replace(/-/g, ' ')}
			</div>
		</div>
	</div>
{/if}

<svelte:window on:scroll|passive={() => (tooltip.tajweed = null)} />
