import type { IAya } from '$contract/surah';
import GenerateRule from '$tajweed/GenerateRule';
import Ghunnah from '$tajweed/kemenag/rule/Ghunnah';
import IdghamBighunnah from '$tajweed/kemenag/rule/IdghamBighunnah';
import IdghamBilaghunnah from '$tajweed/kemenag/rule/IdghamBilaghunnah';
import IdghamMimi from '$tajweed/kemenag/rule/IdghamMimi';
import Ikhfa from '$tajweed/kemenag/rule/Ikhfa';
import Iqlab from '$tajweed/kemenag/rule/Iqlab';
import MaddAridLissukun from '$tajweed/kemenag/rule/MaddAridLissukun';
import MaddJaiz from '$tajweed/kemenag/rule/MaddJaiz';
import MaddLazimHarfi from '$tajweed/kemenag/rule/MaddLazimHarfi';
import MaddWajib from '$tajweed/kemenag/rule/MaddWajib';
import Qalqalah from '$tajweed/kemenag/rule/Qalqalah';
import fs from 'fs';

const files = fs.readdirSync('src/db/kemenag/surah');
Promise.all(
	files.map(async (file) => {
		const surah: IAya[] = (await import('$db/kemenag/surah/' + file)).default;
		await Promise.all(
			surah.map(async (aya, i) => {
				const tajweed = await GenerateRule(
					aya.aya_text,
					[
						Ghunnah,
						IdghamBighunnah,
						IdghamBilaghunnah,
						IdghamMimi,
						Qalqalah,
						Ikhfa,
						Iqlab,
						MaddJaiz,
						MaddWajib,
						MaddAridLissukun,
						MaddLazimHarfi
					],
					i == 0
				);
				surah[i].tajweed = tajweed;
			})
		);
		fs.writeFileSync('src/db/kemenag/surah/' + file, JSON.stringify(surah, null, 4));
	})
);
