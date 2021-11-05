import type { IAya } from '$contract/surah';
import { GenerateAllRule } from '$tajweed/GenerateRule';
import fs from 'fs';

const files = fs.readdirSync('src/db/kemenag/surah');
Promise.all(
	files.map(async (file) => {
		const surah: IAya[] = (await import('$db/kemenag/surah/' + file)).default;
		await Promise.all(
			surah.map(async (aya, i) => {
				surah[i].tajweed = await GenerateAllRule(aya.aya_text, i == 0);
			})
		);
		fs.writeFileSync('src/db/kemenag/surah/' + file, JSON.stringify(surah, null, 4));
	})
);
