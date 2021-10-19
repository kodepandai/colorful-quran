import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Meem } from '$tajweed/kemenag/check/Char';
import MeemBasedRule from '../helper/MeemBasedRule';

const IdghamMimi: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			match = MeemBasedRule('idgham-mimi', ayaSplited, i, [Meem], match);
		});
		resolve(match);
	});
};

export default IdghamMimi;
