<script>
	import Icon from '@iconify/svelte';
	export let text;
	export let link = '';

	export let hashtags = '';
	export let via = '';
	export let related = '';

	let url_whatsapp, url_telegram, url_facebook, url_twitter;
	$: {
		url_whatsapp = encodeURI(`https://api.whatsapp.com/send/?text=${text}`);
		url_telegram = encodeURI(`https://t.me/share/url?url=${link}&text=${text}`);
		url_facebook = encodeURI(`https://web.facebook.com/sharer/sharer.php?u=${link}`);
		url_twitter = encodeURI(
			`https://twitter.com/intent/tweet/?text=${text}&hashtags=${hashtags}&via=${via}&related=${related}&url=${link}`
		);
	}
</script>

<div class="flex space-x-3 items-center">
	<span class="dark:text-white text-sm">Share:</span>
	<a href={url_whatsapp}>
		<Icon icon="logos:whatsapp" width="25" height="25" />
	</a>
	<a href={url_telegram}>
		<Icon icon="bx:bxl-telegram" color="#40b3e0" width="25" height="25" />
	</a>
	<a href={url_facebook}>
		<Icon icon="bi:facebook" color="#1877f2" width="25" height="25" />
	</a>
	<a href={url_twitter}>
		<Icon icon="logos:twitter" color="#40b3e0" width="25" height="25" />
	</a>
</div>
