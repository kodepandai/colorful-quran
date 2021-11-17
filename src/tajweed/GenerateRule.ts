import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import Ghunnah from './kemenag/rule/Ghunnah';
import IdghamBighunnah from './kemenag/rule/IdghamBighunnah';
import IdghamBilaghunnah from './kemenag/rule/IdghamBilaghunnah';
import IdghamMimi from './kemenag/rule/IdghamMimi';
import Ikhfa from './kemenag/rule/Ikhfa';
import IkhfaSyafawi from './kemenag/rule/IkhfaSyafawi';
import Iqlab from './kemenag/rule/Iqlab';
import MaddAridLissukun from './kemenag/rule/MaddAridLissukun';
import MaddJaiz from './kemenag/rule/MaddJaiz';
import MaddLazimHarfi from './kemenag/rule/MaddLazimHarfi';
import MaddWajib from './kemenag/rule/MaddWajib';
import Qalqalah from './kemenag/rule/Qalqalah';

const GenerateRule = async (
	aya: string,
	finder: RuleFinder[],
	isFirstAya = false
): Promise<ITajweed[]> => {
	const arr = aya.split('');
	let rules: ITajweed[] = [];
	await Promise.all(
		finder.map(async (find) => {
			const result = await find(arr, isFirstAya);
			rules = [...rules, ...result];
		})
	);
	return rules.sort((a, b) => a.start - b.start).filter((x) => x.end > x.start);
};

export const GenerateAllRule = async (aya: string, isFirstAya = false): Promise<ITajweed[]> =>
	GenerateRule(
		aya,
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
			MaddLazimHarfi,
			IkhfaSyafawi
		],
		isFirstAya
	);

export default GenerateRule;
