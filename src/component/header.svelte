<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ModalInfo from './modal/ModalInfo.svelte';
	import ModalSetting from './modal/ModalSetting.svelte';
	let showModalSetting = false;
	let showModalInfo = false;
</script>

<div class="flex justify-between h-16 sticky top-0 bg-primary dark:bg-gray-900 z-10">
	{#if $page.url.pathname != '/'}
		<div on:click={() => goto('/')} class="h-full cursor-pointer items-center flex ml-4">
			<Icon icon="akar-icons:chevron-left" width="30" height="30" color="#fff" />
		</div>
	{/if}
	<div class="flex-grow items-center flex justify-center">
		<h1 class="font-bold text-xl text-white">Colorful Quran</h1>
	</div>
	<div
		class="h-full cursor-pointer items-center flex mr-4"
		on:click={() => (showModalSetting = true)}
	>
		<Icon icon="clarity:cog-line" width="30" height="30" color="#fff" />
	</div>
</div>

<ModalSetting bind:show={showModalSetting} />

<ModalInfo bind:show={showModalInfo} />
