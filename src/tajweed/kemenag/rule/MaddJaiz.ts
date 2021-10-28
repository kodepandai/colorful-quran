import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Alif, IsChar, Maddah, MaddahShort } from '$tajweed/kemenag/check/Char';
import { GetNext, GetPrevHuruf } from '../check/Pointer';

const MaddJaiz: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			if (IsChar(ayaSplited[i], [Maddah, MaddahShort])) {
				const next = GetNext(ayaSplited, i);
				const [prev] = GetPrevHuruf(ayaSplited, i);
				if (IsChar(ayaSplited[next], Alif)) {
					match = [
						...match,
						{
							class: 'madd-jaiz',
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

export default MaddJaiz;
