import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';

const GenerateRule = async (aya: string, finder: RuleFinder[]): Promise<ITajweed[]> => {
	const arr = aya.split('');
	let rules: ITajweed[] = [];
	await Promise.all(
		finder.map(async (find) => {
			const result = await find(arr);
			rules = [...rules, ...result];
		})
	);
	return rules.sort((a, b) => a.start - b.start);
};

export default GenerateRule;
