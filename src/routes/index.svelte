<script lang="ts">
	import { goto } from '$app/navigation';

	import list from '$db/kemenag/list.json';
	import { Setting$ } from '$store/Setting';
	import ModalSetting from '$component/modal/ModalSetting.svelte';
	import ModalInfo from '$component/modal/ModalInfo.svelte';

	let querySearch = '';
	let dataFiltered = [];
	let showModalSetting = false;
	let showModalInfo = false;
	$: {
		dataFiltered = list.filter((data) => {
			return data.surat_name.toLocaleLowerCase().includes(querySearch.toLocaleLowerCase());
		});
	}

	const gotoLastRead = () => {
		if ($Setting$.last_read_aya) {
			goto('/kemenag/surah/' + $Setting$.last_read_surah + '#' + $Setting$.last_read_aya);
		}
	};

	const gotoTasbih = () => {
		goto('tasbih');
	};
</script>

<div class="relative">
	<div
		class="h-[250px] pt-6 flex flex-col px-4 fixed top-0 w-full"
		style="background: linear-gradient(129.41deg, #2B52A1 39.97%, rgba(43, 82, 161, 0) 216.3%);
	mix-blend-mode: normal;"
	>
		<div class="flex justify-between mb-6">
			<img src="icon/brand.svg" alt="Brand" class="h-[38px] w-[100px]" />
			<img
				src="icon/info.svg"
				alt="Brand"
				class="h-6 w-6"
				on:click={() => (showModalInfo = true)}
			/>
		</div>
		<div class="flex justify-around w-full mb-6">
			<div class="flex flex-col items-center">
				<div
					class="flex items-center justify-center cursor-pointer bg-white rounded-[10px] w-11 h-11"
					on:click={() => (showModalSetting = true)}
				>
					<img src="icon/setting.svg" alt="setting" class="w-6 h-6" />
				</div>
				<span class="font-poppins text-white text-xs">Setting</span>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="flex items-center justify-center cursor-pointer bg-white rounded-[10px] w-11 h-11"
					on:click={gotoLastRead}
				>
					<img src="icon/bookmark.svg" alt="setting" class="w-6 h-6" />
				</div>
				<span class="font-poppins text-white text-xs">Bookmark</span>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="flex items-center justify-center cursor-pointer bg-white rounded-[10px] w-11 h-11"
					on:click={gotoLastRead}
				>
					<img src="icon/history.svg" alt="setting" class="w-6 h-6" />
				</div>
				<span class="font-poppins text-white text-xs">Last Read</span>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="flex items-center justify-center cursor-pointer bg-white rounded-[10px] w-11 h-11"
					on:click={gotoTasbih}
				>
					<img src="icon/tasbih.svg" alt="setting" class="w-6 h-6" />
				</div>
				<span class="font-poppins text-white text-xs">Tasbih</span>
			</div>
		</div>

		<div class="bg-white rounded-2xl py-3 px-4 flex">
			<img src="/icon/search.svg" alt="" srcset="" />
			<input
				bind:value={querySearch}
				type="text"
				placeholder="Cari Surah Yang diinginkan"
				class="focus:outline-none text-graySecond text-xs font-poppins w-full text-center"
			/>
		</div>
	</div>

	<div
		class="bg-white dark:bg-dark rounded-t-[20px] py-6 px-4 absolute w-full top-[236px] h-screen overflow-y-scroll"
	>
		{#if dataFiltered.length <= 0}
			<div class="flex w-full justify-center">
				<span class="text-gray-500 dark:text-white">Surah tidak ditemukan</span>
			</div>
		{/if}
		{#each dataFiltered as surah}
			<a
				class="flex flex-row pb-4 mb-3 justify-between border-b"
				href={`/kemenag/surah/${surah.id}`}
			>
				<div class="flex">
					<div class="w-7 h-7 bg-white shadow dark:bg-gray-900 rounded-md text-center">
						<span class="text-xs font-poppins dark:text-white">{surah.id}</span>
					</div>
					<div class="flex flex-col line ml-3">
						<span
							class="font-poppins dark:text-white"
							style="direction: ltr; font-size: {$Setting$.ukuranTerjemahan}px;"
							>{` ${surah.surat_name}`}</span
						>
						<div class="flex flex-row">
							<span class="text-[10px] font-poppins text-gray-400 dark:text-white"
								>{` ${surah.surat_terjemahan}`}</span
							>
							<span class="text-[10px] font-poppins ml-2 text-gray-400 dark:text-white"
								>{` ${surah.count_ayat}`} ayat</span
							>
						</div>
					</div>
				</div>
				<span
					class="font-arab inline-block align-baseline font-bold dark:text-white"
					style="font-size: {$Setting$.ukuranAyat}px;">{surah.surat_text}</span
				>
			</a>
		{/each}
	</div>

	<ModalSetting bind:show={showModalSetting} />

	<ModalInfo bind:show={showModalInfo} />
</div>
