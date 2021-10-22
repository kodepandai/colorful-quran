<script lang="ts">
	import Icon from '@iconify/svelte';

	export let count = 0;
</script>

<div class="sm:w-1/2 flex flex-col p-4 mx-auto">
	<div class="text-center mb-2">
		<span class="font-bold text-indigo-900 text-xl">Colorful Quran</span>
	</div>
	<div class="flex justify-center tasbihconter relative">
		<img src="tasbih.png" alt="" class="sm:h-full sm:w-full" />
		<div class="absolute justify-center items-center flex countconter  top-0 right-0 left-0 w-full">
			<p class="text-3xl">{count}</p>
		</div>
		<div
			on:click={() => (count = 0)}
			class="absolute justify-center items-center flex top165 text-white"
		>
			<p>Reset</p>
		</div>
		<div on:click={() => (count += 1)} class="tmblcount bg-indigo-900">
			<img src="counter.svg" alt="Count" class="h-full w-full p-3 " />
		</div>
	</div>
</div>
