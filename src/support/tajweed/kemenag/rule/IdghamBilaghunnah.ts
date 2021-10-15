import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {Lam, Ra} from '$support/tajweed/kemenag/check/Char';
import NoonOrTanwinBasedRule from '../helper/NoonOrTanwinBasedRule';

const IdghamBilaghunnah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			match = NoonOrTanwinBasedRule('idgham-bilaghunnah', ayaSplited, i, [Lam, Ra], match)
		});
		resolve(match);
	});
};

export default IdghamBilaghunnah;
