<script lang="ts">
	import Ghunnah from '$support/tajweed/kemenag/rule/Ghunnah';
	import surah from '$db/kemenag/surah/2.json';
	import GenerateRule from '$support/tajweed/GenerateRule';
	import IdghamBighunnah from '$support/tajweed/kemenag/rule/IdghamBighunnah';

	const testAya = surah[4].aya_text;
	GenerateRule(testAya, [Ghunnah, IdghamBighunnah]).then((result) => {
		console.log(testAya, result);
	});
</script>
