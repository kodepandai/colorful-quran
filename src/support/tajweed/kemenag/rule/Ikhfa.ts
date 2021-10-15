import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Dal, Dhad, Dhal, Dza, Fa, Jeem, Kaf, Qaf, Shad, Sin, Syin, Ta, Tha, Tsa, Za } from '$support/tajweed/kemenag/check/Char';
import NoonOrTanwinBasedRule from '../helper/NoonOrTanwinBasedRule';

const Ikhfa: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			match = NoonOrTanwinBasedRule('ikhfa', ayaSplited, i, [Ta, Tsa, Jeem, Dal, Dhal, Za, Sin, Syin, Shad, Dhad, Tha, Dza, Fa, Qaf, Kaf], match)
		});
		resolve(match);
	});
};

export default Ikhfa;