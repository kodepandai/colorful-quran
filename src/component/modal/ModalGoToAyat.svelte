<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Modal from '$component/Modal.svelte';

	export let show = false,
		max = 3;
	let ayat = 1;
	const GoToAyat = () => {
		goto($page.url.pathname + '#' + ayat);
		show = false;
	};
</script>

{#if show}
	<Modal on:dismiss={() => (show = false)} title="Go to ayat">
		<input
			type="number"
			class="w-full appearance-none focus:outline-none text-center mb-2"
			placeholder="Go to ayat"
			bind:value={ayat}
			{max}
		/>
		<button
			class="flex bg-primary justify-center text-white font-poppins rounded-md py-2"
			on:click={GoToAyat}>Move</button
		>
	</Modal>
{/if}
