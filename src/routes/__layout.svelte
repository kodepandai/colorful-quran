<script lang="ts">
	import Header from '$component/header.svelte';

	import '$lib/style/app.css';

	import { onMount } from 'svelte';
	import { Setting$ } from '$store/Setting';

	onMount(() => {
		if ($Setting$.theme == 'dark') {
			window.document.getElementsByTagName('html')[0].classList.toggle('dark');
		}
	});
</script>

<div class="md:w-1/2 mx-auto">
	<Header />
	<div class="px-4">
		<slot />
	</div>
</div>
