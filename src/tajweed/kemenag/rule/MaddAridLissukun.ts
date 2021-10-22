import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Alif, Dhummah, Fatah, Hamzah, IsChar, Kasrah, Shaddah, Sukun, Wau, Ya } from '../check/Char';
import { GetPrev, GetPrevHuruf } from '../check/Pointer';

const MaddAridLissukun: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			// check is end of aya
			if (i == ayaSplited.length - 1) {
				// get prev huruf
				const [end, lastHuruf] = GetPrevHuruf(ayaSplited, i);
				const [prev, huruf] = GetPrevHuruf(ayaSplited, end);
				let check = false;
				const prev2 = GetPrev(ayaSplited, prev, [Shaddah]);
				if (
					IsChar(huruf, Ya) &&
					IsChar(ayaSplited[prev + 1], Sukun) &&
					IsChar(ayaSplited[prev2], Kasrah)
				)
					check = true;
				if (IsChar(huruf, Alif) && IsChar(ayaSplited[prev2], Fatah) && !IsChar(lastHuruf, Hamzah)) check = true;
				if (
					IsChar(huruf, Wau) &&
					IsChar(ayaSplited[prev + 1], Sukun) &&
					IsChar(ayaSplited[prev2], Dhummah)
				)
					check = true;
				if (check) {
					match = [
						{
							class: 'madd-arid-lissukun',
							start: prev,
							end: end
						}
					];
				}
			}
		});
		resolve(match);
	});
};

export default MaddAridLissukun;
