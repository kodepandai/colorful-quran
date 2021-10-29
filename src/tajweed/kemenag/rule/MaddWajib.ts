import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {
	Hamzah,
	HamzahWau,
	HamzahYa,
	IsChar,
	Maddah,
	MaddahShort
} from '$tajweed/kemenag/check/Char';
import { GetNext, GetPrevHuruf } from '$tajweed/kemenag/check/Pointer';

const MaddWajib: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			if (IsChar(ayaSplited[i], [Maddah, MaddahShort])) {
				const [prev] = GetPrevHuruf(ayaSplited, i);
				const next = GetNext(ayaSplited, i);
				if (IsChar(ayaSplited[next], [Hamzah, HamzahWau, HamzahYa])) {
					match = [
						...match,
						{
							class: 'madd-wajib',
							start: prev,
							end: next
						}
					];
				}
			}
		});
		resolve(match);
	});
};

export default MaddWajib;
