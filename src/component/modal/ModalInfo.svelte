<script lang="ts">
import Modal from "$component/Modal.svelte";
import {onMount} from 'svelte'
import { Setting$ } from "$store/Setting";
import Icon from "@iconify/svelte";


export let show = false;
let contributor
onMount(async ()=>{

    contributor = await fetch('https://api.github.com/repos/kodepintar/colorful-quran/contributors')
                                    .then(data => data.json())
})

let tabs = 'aboutUs'

const moveTabs = (params) => {
    tabs = params
}
    
</script>

<style>
    .aktive {
        @apply text-primary;
        @apply border-b-2;
        @apply font-medium;
        @apply border-primary;
    }
</style>

{#if show}
<Modal on:dismiss={() => (show = false)} Title="Tentang Kami">
    <tabs class="flex flex-row mb-2">
        <button class="text-gray-500 w-1/2 py-2 px-6 block hover:text-secondary focus:outline-none {tabs == 'aboutUs' ? 'aktive' : ''}" 
        on:click={()=> moveTabs('aboutUs')}>
            Tentang Kami
        </button>
        <button class="text-gray-500 w-1/2 py-2 px-6 block hover:text-secondary focus:outline-none {tabs == 'changelog' ? 'aktive' : ''}" on:click={()=> moveTabs('changelog')}>
            Changelog
        </button>
    </tabs>
    
    {#if tabs == 'aboutUs'}
        <div class="flex flex-col">
            <span>tabs about us</span>

            <h3>Contributor</h3>
            <hr>
            <span>{JSON.stringify(contributor)}</span>
        </div>
    {/if}

    {#if tabs == 'changelog'}
        <div class="flex">
            <span>tabs changelog</span>
        </div>
    {/if}
</Modal>
{/if}