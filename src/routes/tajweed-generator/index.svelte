<script lang="ts">
	import type { IAya, ITajweed, Rule } from '$contract/surah';

	import list from '$db/kemenag/list.json';

	const rules = [
		'hamzah-wasl',
		'silent',
		'madd-4-5',
		'madd-2-4-6',
		'madd-6',
		'ghunnah',
		'idgham-syafawi',
		'ikhfa-syafawi',
		'idgham-bighunnah',
		'idgham-bilaghunnah',
		'idgham-mutamatsilain',
		'idgham-mutajanisain',
		'ikhfa',
		'iqlab',
		'qalqalah'
	];
	let mode: 'insert' | 'edit' = 'insert';
	let editedRule: number;
	let listAya = [];
	let surahDetail: IAya[] = [];
	let selectedAya = '',
		selectedClass: Rule = '';
	let tracking = false;
	let start, end, startSlice, endSlice;
	let modalIsOpen = false;
	let tajweedList: ITajweed[] = [],
		tajweedListPreview: ITajweed[] = [];

	let tajweedJson = JSON.stringify(
		{
			tajweed: []
		},
		null,
		2
	);
	const updateAyaList = async (e) => {
		surahDetail = (await import(`../../db/kemenag/surah/${e.target.value}.json`)).default;
		listAya = surahDetail.map((s) => s.aya_number);
		selectedAya = surahDetail[0].aya_text;
		tajweedList = surahDetail[0].tajweed ?? [];
	};

	const renderAya = (e) => {
		selectedAya = surahDetail[e.target.value - 1].aya_text;
		tajweedList = surahDetail[e.target.value - 1].tajweed ?? [];
	};
	const track = (i) => {
		if (tracking) {
			if (!start) {
				start = i;
			} else {
				end = i;
			}
		}
	};

	const openModal = () => {
		[startSlice, endSlice] = [start, end].sort((a, b) => a - b);
		start = null;
		end = null;
		mode = 'insert';
		modalIsOpen = true;
	};

	const addTajweed = () => {
		if (!selectedClass) {
			return alert('please choose class');
		}
		if (mode == 'insert') {
			tajweedList = [
				...tajweedList,
				{
					class: selectedClass,
					start: startSlice,
					end: endSlice
				}
			];
		} else {
			tajweedList = tajweedList.map((rule, i) => {
				if (editedRule == i) {
					rule.class = selectedClass;
					rule.start = startSlice;
					rule.end = endSlice;
				}
				return rule;
			});
		}
		modalIsOpen = false;
	};

	const editTajweed = (i) => {
		const rule = tajweedList[i];
		[startSlice, endSlice] = [rule.start, rule.end].sort((a, b) => a - b);
		selectedClass = rule.class;
		mode = 'edit';
		editedRule = i;
		modalIsOpen = true;
	};

	const appendTajweed = (i) => {
		const rule = tajweedList[i];
		tajweedList.splice(i, 0, {
			class: rule.class,
			start: rule.end,
			end: rule.end + 1
		});
		tajweedList = tajweedList;
	};
	const deleteTajweed = (i) => {
		if (confirm('Are you sure?')) {
			tajweedList = tajweedList.filter((x, id) => id != i);
		}
	};

	$: if (tajweedList) {
		let sliceAya: ITajweed[] = [
			{
				class: '',
				start: 0,
				end: 0
			}
		];
		tajweedList.forEach((t) => {
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
			end: selectedAya.length
		});
		sliceAya.shift();
		tajweedListPreview = sliceAya;
		tajweedJson = JSON.stringify(
			{
				tajweed: tajweedList
			},
			null,
			2
		);
	}
</script>

<div class="p-4">
	<table class="w-full">
		<tr>
			<td>
				<label for="surah">Choose Surah</label>
				<select name="surah" id="surah" on:change={updateAyaList}>
					{#each list as surah}
						<option value={surah.id}>{surah.surat_name}</option>
					{/each}
				</select>
			</td>
			<td>
				<label for="surah">Choose Aya</label>
				<select name="surah" id="surah" on:change={renderAya}>
					{#each listAya as aya}
						<option value={aya}>{aya}</option>
					{/each}
				</select>
			</td>
		</tr>
	</table>
	{#if selectedAya != ''}
		<i>Block text you want to add tajweed anotation, then click "ADD ANOTATION"</i>
	{/if}
	<p
		class="font-arab text-3xl p-4 border-t mt-4"
		on:mousedown={() => (tracking = true)}
		on:mouseup={() => (tracking = false)}
	>
		{#each selectedAya.split('') as huruf, i}
			<i on:mouseenter={() => track(i)}>{huruf}</i>
		{/each}
	</p>
	<div>Tajweed Preview</div>
	<div class="font-arab py-2 mb-3 text-xl bg-yellow-50">
		{#each tajweedListPreview as tajweed}
			<i class={tajweed.class}>{selectedAya.slice(tajweed.start, tajweed.end)}</i>
		{/each}
	</div>
	<center>
		<button on:click={openModal}> ADD ANOTATION </button>
	</center>
	<div class="flex flex-col mt-5">
		{#each tajweedList as rule, i}
			<div>
				<span>{rule.class}</span> <span>{rule.start} - {rule.end}</span>
				<span class="cursor-pointer text-blue-700" on:click={() => editTajweed(i)}>edit</span>
				<span class="cursor-pointer text-green-700" on:click={() => appendTajweed(i)}>append</span>
				<span class="cursor-pointer text-red-400" on:click={() => deleteTajweed(i)}>delete</span>
			</div>
		{/each}
	</div>

	<div>
		<label for="">JSON</label>
		<textarea
			name="json"
			rows="10"
			bind:value={tajweedJson}
			class="shadow-inner p-2 bg-gray-200 text-xs font-mono w-full h-auto"
		/>
	</div>
</div>

<!-- modal add anotation -->
{#if modalIsOpen}
	<div
		class="fixed h-screen w-screen bg-black bg-opacity-75 flex items-center justify-center z-50 top-0 left-0"
	>
		<div class="container p-4 bg-white">
			<table>
				<tr>
					<td>
						<label for="surah">Choose Tajweed</label>
						<select name="surah" id="surah" bind:value={selectedClass}>
							{#each rules as tjwClass}
								<option value={tjwClass}>{tjwClass}</option>
							{/each}
						</select>
					</td>
				</tr>
				<tr>
					<td>
						<label for="">Preview</label>
						<p class="font-arab">{selectedAya.slice(startSlice, endSlice)}</p>
					</td>
					<td>
						<div class="w-20 p-4">
							<label for="">Adjust</label>
							<div>
								<div>
									<label for="">Start</label>
									<input type="number" bind:value={startSlice} class="border" />
								</div>
								<div>
									<label for="">End</label>
									<input type="number" bind:value={endSlice} class="border" />
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<button
							on:click={() => {
								modalIsOpen = false;
							}}>CANCEL</button
						>
					</td>
					<td>
						<button on:click={addTajweed}>OK</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
{/if}

<style>
	button {
		@apply bg-gray-700 text-white p-2 rounded-sm;
	}
</style>
