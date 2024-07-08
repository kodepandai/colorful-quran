<script>
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	export let text;
	export let link = '';
	export let title = '';

	export let hashtags = '';
	export let via = '';
	export let related = '';

	let url_whatsapp, url_telegram, url_facebook, url_twitter;

	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
	$: {
		if (typeof window != 'undefined') link = window.location.href;
		url_whatsapp = encodeURI(`https://api.whatsapp.com/send/?text=${text}`);
		url_telegram = encodeURI(`https://t.me/share/url?url=${link}&text=${text}`);
		url_facebook = encodeURI(`https://web.facebook.com/sharer/sharer.php?u=${link}`);
		url_twitter = encodeURI(
			`https://twitter.com/intent/tweet/?text=${text}&hashtags=${hashtags}&via=${via}&related=${related}&url=${link}`
		);
	}

	const handleShare = async () => {
		try {
			await navigator.share({
				url: link,
				title,
				text
			});
		} catch (_) {
			show = !show;
		}
	};
</script>

<div class="relative" bind:this={menu}>
	<div>
		<button on:click={handleShare}>
			<Icon icon="cil:share-alt" color="#626262" width="24" height="24" />
		</button>

		{#if show}
			<div
				in:scale={{ duration: 100, start: 0.95 }}
				out:scale={{ duration: 75, start: 0.95 }}
				class="absolute right-0 bottom-8 p-2 mt-1 bg-gray-200
			rounded shadow-md flex space-y-3 items-center flex-col"
			>
				<a href={url_whatsapp} class="block">
					<Icon icon="logos:whatsapp-icon" width="24" height="24" />
				</a>
				<a href={url_telegram}>
					<Icon icon="bx:bxl-telegram" color="#40b3e0" width="24" height="24" />
				</a>
				<a href={url_facebook}>
					<Icon icon="bi:facebook" color="#1877f2" width="24" height="24" />
				</a>
				<a href={url_twitter}>
					<Icon icon="logos:twitter" color="#40b3e0" width="24" height="24" />
				</a>
			</div>
		{/if}
	</div>
</div>
