<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<div class="flex justify-between h-14 sticky top-0 bg-primary">
	{#if $page.path != '/'}
		<div on:click={() => goto('/')} class="h-full cursor-pointer items-center flex ml-4">
			<Icon icon="akar-icons:arrow-left" width="30" height="30" color="#fff" />
		</div>
	{/if}
	<div class="flex-grow items-center flex justify-center">
		<h1 class="font-bold text-xl text-white">Colorful Quran</h1>
	</div>
	{#if $page.path != '/'}
		<div class="h-full cursor-pointer items-center flex mr-4">
			<Icon icon="clarity:cog-line" width="30" height="30" color="#fff" />
		</div>
	{/if}
</div>
