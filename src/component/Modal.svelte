<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const dismissModal = () => {
		dispatch('dismiss');
	};
</script>

<div class="min-w-screen h-screen fixed flex justify-center inset-0 z-50">
	<div class="absolute bg-black opacity-30 inset-0 z-0" />
	<div class="w-full max-w-xs relative m-auto rounded-xl bg-white">
		<button class="p-1 float-right" on:click={dismissModal}>
			<Icon icon="ant-design:close-circle" color="#383838" width="30" height="30" />
		</button>
		<!--content-->
		<div class="p-4">
			<!--body-->
			<div class="flex flex-col">
				<!-- conten is dinamic -->
				<slot />
				<!-- end conten -->
			</div>
		</div>
	</div>
</div>
