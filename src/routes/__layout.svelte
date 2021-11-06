<script lang="ts">
	import Header from '$component/header.svelte';

	import '$lib/style/app.css';

	import { Setting$ } from '$store/Setting';

	$: if (typeof window !== 'undefined') {
		const method = {
			dark: 'add',
			light: 'remove'
		};
		window.document.getElementsByTagName('html')[0].classList[method[$Setting$.theme]]('dark');
	}
</script>

<div class="md:w-1/2 mx-auto">
	<Header />
	<div class="px-4">
		<slot />
	</div>
</div>
