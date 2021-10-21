<script lang="ts">
	import type { IAya, ITajweed } from '$contract/surah';
	import { Setting$ } from '$store/Setting';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const saveLastReading = (aya: IAya) => {
		dispatch('saveLastReading', aya);
	};
	export let surah: IAya[];

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
