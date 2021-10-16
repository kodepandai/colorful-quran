<script lang="ts">
	import type { IAya, ITajweed } from '$contract/surah';

	import list from '$db/kemenag/list.json';
	import GenerateRule from '$tajweed/GenerateRule';
	import Ghunnah from '$tajweed/kemenag/rule/Ghunnah';
	import IdghamBighunnah from '$tajweed/kemenag/rule/IdghamBighunnah';
	import IdghamBilaghunnah from '$tajweed/kemenag/rule/IdghamBilaghunnah';
	import Ikhfa from '$tajweed/kemenag/rule/Ikhfa';
	import Iqlab from '$tajweed/kemenag/rule/Iqlab';
	import MaddJaiz from '$tajweed/kemenag/rule/MaddJaiz';
	import MaddWajib from '$tajweed/kemenag/rule/MaddWajib';
	import Qalqalah from '$tajweed/kemenag/rule/Qalqalah';

	let surahJson: IAya[] = [];
	const updateAyaList = async (e) => {
		surahJson = (await import(`../../db/kemenag/surah/${e.target.value}.json`)).default;
	};

	const generateTajeed = () => {
		Promise.all(
			surahJson.map(async (aya, i) => {
				const tajweed = await GenerateRule(aya.aya_text, [
					Ghunnah,
					IdghamBighunnah,
					IdghamBilaghunnah,
					Qalqalah,
					Ikhfa,
					Iqlab,
					MaddJaiz,
					MaddWajib
				]);
				surahJson[i].tajweed = tajweed;
			})
		);
	};

	$: if (surahJson) {
		surahJson = surahJson.map((aya) => {
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
	}
</script>

<div class="p-4">
	<table class="w-full">
		<tr>
			<td>
				<label for="surah">Choose Surah</label>
				<select name="surah" id="surah" on:change={updateAyaList}>
					<option value="">select surah</option>
					{#each list as surah}
						<option value={surah.id}>{surah.surat_name}</option>
					{/each}
				</select>
			</td>
		</tr>
	</table>
	<center>
		<button on:click={generateTajeed}> GENERATE TAJWEED</button>
	</center>

	<div class="flex flex-row mt-4 flex-wrap">
		<div class="w-full md:w-1/2 pr-4">
			<div>Tajweed Preview</div>
			{#each surahJson as aya}
				{#if aya.sura_id != 1 || aya.aya_number != 1}
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
		<div class="w-full md:w-1/2">
			<div>
				<label for="">JSON</label>
				<pre
					style="font-size: xx-small;"
					class="shadow-inner p-2 bg-gray-200 font-mono w-full h-auto overflow-x-scroll">
				 {JSON.stringify(surahJson, null, 2)}
				</pre>
			</div>
		</div>
	</div>
</div>

<style>
	button {
		@apply bg-gray-700 text-white p-2 rounded-sm;
	}
</style>
