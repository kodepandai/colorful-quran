<script>
	import Icon from '@iconify/svelte';
	export let text;
	export let link = '';

	export let hashtags = '';
	export let via = '';
	export let related = '';

	let url_whatsapp, url_telegram, url_facebook, url_twitter;
	$: {
		url_whatsapp = encodeURI(`whatsapp://send?text=${text}`);
		url_telegram = encodeURI(`https://t.me/share/url?url=${link}&text=${text}`);
		url_facebook = encodeURI(`https://web.facebook.com/sharer/sharer.php?u=${link}`);
		url_twitter = encodeURI(
			`https://twitter.com/intent/tweet/?text=${text}&hashtags=${hashtags}&via=${via}&related=${related}&url=${link}`
		);
	}
</script>

<div class="flex space-y-2 w-full bg-red-500">
	<a href={url_whatsapp}>
		<Icon icon="logos:whatsapp" width="30" height="30" />
		<span class="text-sm">Whatsapp</span>
	</a>
	<a href={url_telegram}>
		<Icon icon="bx:bxl-telegram" color="#40b3e0" width="30" height="30" />
		<span class="text-sm text-red-500">Telegram</span>
	</a>
	<a href={url_facebook}>
		<Icon icon="bi:facebook" color="#1877f2" width="30" height="30" />
		<span class="text-sm text-red-500">Facebook</span>
	</a>
	<a href={url_twitter}>
		<Icon icon="logos:twitter" color="#40b3e0" width="30" height="30" />
		<span class="text-sm text-red-500">Twitter</span>
	</a>
</div>
