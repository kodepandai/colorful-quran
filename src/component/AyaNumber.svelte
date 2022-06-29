<script lang="ts">
	import {
		One,
		Two,
		Three,
		Four,
		Five,
		Six,
		Seven,
		Eight,
		Nine,
		Zero
	} from '$tajweed/kemenag/check/Char';
	export let number: number | string;
	const ArabicNumber = {
		'0': Zero,
		'1': One,
		'2': Two,
		'3': Three,
		'4': Four,
		'5': Five,
		'6': Six,
		'7': Seven,
		'8': Eight,
		'9': Nine
	};
	const arabicNumber = number
		.toString()
		.split('')
		.map((n) => ArabicNumber[n])
		.join('');
</script>

<span>
	<div
		class="inline-flex p-1 w-8 h-8 justify-center items-center dark:text-gray-300"
		style="background-image: url('/border.png'); background-position: center; background-size: contain;"
	>
		<span>{arabicNumber}</span>
	</div>
</span>
