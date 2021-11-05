import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Ba } from '$tajweed/kemenag/check/Char';
import MeemBasedRule from '../helper/MeemBasedRule';

const IkhfaSyafawi: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			match = MeemBasedRule('ikhfa-syafawi', ayaSplited, i, [Ba], match);
		});
		resolve(match);
	});
};

export default IkhfaSyafawi;
