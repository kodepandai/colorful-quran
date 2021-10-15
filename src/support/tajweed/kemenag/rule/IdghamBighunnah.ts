import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {
	Meem,
	Noon,
	Wau,
	Ya
} from '$support/tajweed/kemenag/check/Char';
import NoonOrTanwinBasedRule from '../helper/NoonOrTanwinBasedRule';

const IdghamBighunnah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			match = NoonOrTanwinBasedRule('idgham-bighunnah', ayaSplited, i, [Ya, Noon, Meem, Wau], match)
		});
		resolve(match);
	});
};

export default IdghamBighunnah;
