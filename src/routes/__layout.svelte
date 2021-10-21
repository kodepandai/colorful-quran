<script lang="ts">
	import Header from '$component/header.svelte';

	import '$lib/style/app.css';
</script>

<div class="md:w-1/2 mx-auto">
	<Header />
	<div class="px-4">
		<slot />
	</div>
</div>
