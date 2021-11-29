<script lang="ts">
import Header from "$component/header.svelte";

	export let count = 0;
</script>

<Header/>
<div class="flex h-screen -mt-14 pt-14 z-0">
	<div class="h-full w-full justify-center items-center flex">
		<div class="w-full h-full relative" style="max-width: 343px; max-height: 343px;">
			<img src="tasbih.png" alt="" class="h-full w-full" />
			<p class="text-3xl absolute top-0 mt-20 text-center w-full">{count}</p>
			<button
				on:click={() => (count = 0)}
				class="absolute left-1/2 -translate-x-1/2 top-0 mt-44 text-white"
			>
				<p>Reset</p>
			</button>
			<button
				on:click={() => (count += 1)}
				class="w-20 h-20 rounded-full bg-indigo-900 absolute left-1/2 -translate-x-1/2 bottom-0 mb-10"
			>
				<img src="counter.svg" alt="Count" class="h-full w-full p-3 " />
			</button>
		</div>
	</div>
</div>
