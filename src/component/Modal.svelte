<script lang="ts">
	export let title: string;
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	const dismissModal = () => {
		dispatch('dismiss');
	};

	onMount(() => {
		document.body.style.overflowY = 'hidden';
		return () => {
			document.body.style.overflowY = 'auto';
		};
	});
</script>

<div class="min-w-screen h-screen fixed flex justify-center inset-0 z-50">
	<div class="absolute bg-black/30 inset-0 z-0" />
	<div
		class="w-full relative max-w-sm m-auto rounded-xl bg-white dark:bg-gray-900 dark:text-gray-300"
	>
		<div class="flex py-2 relative">
			<div class="w-full items-center flex justify-center">
				<span class="font-semibold text-xl">{title}</span>
			</div>
			<div class="absolute right-2">
				<button on:click={dismissModal}>
					<Icon icon="ant-design:close-circle" width="30" height="30" />
				</button>
			</div>
		</div>
		<!--content-->
		<div class="p-4">
			<!--body-->
			<div class="flex flex-col max-h-[80vh]">
				<!-- conten is dinamic -->
				<slot />
				<!-- end conten -->
			</div>
		</div>
	</div>
</div>
