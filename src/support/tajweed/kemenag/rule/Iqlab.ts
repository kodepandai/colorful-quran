import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {Ba} from '$support/tajweed/kemenag/check/Char'
import NoonOrTanwinBasedRule from '$support/tajweed/kemenag/helper/NoonOrTanwinBasedRule';

const Iqlab: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			match = NoonOrTanwinBasedRule('iqlab', ayaSplited, i, [Ba], match)
		});
		resolve(match);
	});
};

export default Iqlab;